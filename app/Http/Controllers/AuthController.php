<?php

namespace App\Http\Controllers;

use App\Mail\DataDeletionMail;
use App\Mail\PasswordResetEmail;
use App\Models\Option;
use App\Models\User;
use App\WebPush\WebNotification;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $credentials = $request->only('email', 'password');

        $user = User::where('email', $credentials['email'])->first();

        if(is_null($user)){
            return response([
                'message' => 'invalid username or password'
            ], 401);
        }

        $account_locked_at = Carbon::parse($user->account_locked_at);
        if(isset($user) && $user->login_attempt === 3 &&  $account_locked_at->gt(Carbon::now()->subMinutes(30)) ){
            return response([
                'message' => 'Your account has been locked due to 3 failed login attempt, please contact support.'
            ], 401);
        }

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = User::find(auth()->user()->id);
            $user->update([
                'login_attempt' => 0,
                'account_locked_at' => null
            ]);

            $token = $user->createToken('access_token')->plainTextToken;

            if($user->is_2fa_enable == '1'){
                $user->send_token();
            }

            $response = [
                'data' => $user,
                'token' => $token,
                'message' => "login successful"
            ];

            return response()->json($response);
        }

        $user->update([
            'login_attempt' => $user->login_attempt + 1
        ]);
        $remaining_attempt = 3 - $user->login_attempt;

        return response([
            'message' => 'invalid username or password ' . $remaining_attempt . ' attempt left.'
        ], 401);
    }

    public function update(Request $request)
    {
        try{
            $user = User::find(auth()->user()->id);
            $fields = $request->validate([
                'firstname' => 'string|required',
                'lastname' => 'required|string',
                'username' => 'nullable|string|unique:users,username,'.$user->id,
                'dob' => 'nullable|string',
                'bio' => 'nullable|string',
                'phone_number' => 'string|nullable'

            ]);

            $profile_fields = $request->except(['avatar', '_method', 'username', 'email' ]);

            $user->name = $fields['firstname'] . ' ' . $fields['lastname'];

            if(isset($fields['username'])){
                $user->username = $fields['username'];
            }

            if ($request->hasFile('avatar')) {
                $path = $request->file('avatar')->storeAs(
                    'avatars', $request->user()->id
                );
                $user->avatar = Storage::url($path);
            }

            $user->save();

            if(isset($profile_fields['dob'])){
                $profile_fields['dob'] = new Carbon($profile_fields['dob']);
            }
            $user->profile()->update($profile_fields);

            $response = [
                'data' => $user->load(['profile']),
                'message' => 'Profile update successful'
            ];

            return response()->json($response);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage()], 400);
        }
    }

    public function me() {
        $user = User::find(auth()->user()->id);
       
        return response()->json([
            'data' => $user->load(['profile'])
        ]);
    }

    public function saveToken(Request $request) {
        try {
            $user = User::find(auth()->user()->id);

            $user->update([
                'device_token' => $request->input('token')
            ]);
    
            return response()->json(['message' => 'Token successfully stored.']);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage()], 400);
        }

    }

    public function changePass(Request $request)
    {
        $user = User::find(auth()->user()->id);

        $fields = $request->validate([
            'current_password' => 'required|string ',
            'password' => [
                'required',
                'min:8',
                'regex:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/',
                'confirmed'
            ]
        ]);

        if(!Hash::check($fields['current_password'], $user->password)) {
            return response([
                'message' => 'wrong password'
            ], 401);
        }

        $user->update([
            'password' => bcrypt($fields['password']),
        ]);

        return response()->json([
            'message' => 'password update successful'
        ]);
    }

    public function forgotPass(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status == Password::RESET_LINK_SENT
                    ? response()->json([
                        "status" => $status,
                        "message" => 'Please check your email and follow the directions to reset your password'
                    ])
                    : response([
                        "status" => $status,
                        "message" => "Password reset request failed!"
                    ], 401);
    }

    public function resetPass(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed|regex:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/',
        ]);
    
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
    
                $user->save();
            }
        );
    
        return $status == Password::PASSWORD_RESET
                    ? response()->json([
                        "status" => $status,
                        "message" => 'Password reset successful'
                    ])
                    : response([
                        "status" => $status,
                        "message" => "Password reset failed!"
                    ], 401);
    }

    public function enable2fa(Request $request)
    {
        try{

            $user = User::find(auth()->id());
            $user->update([
                'is_2fa_enable' => 1
            ]);

            $user->send_token();

            return response()->json([
                'message' => '2FA enabled and OTP code had been send to your email'
            ]);
        } catch (Exception $e) {
            return response(['message' => $e->getMessage()], 400);
        }
    }

    public function confirm2fa(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required',
        ]);
  
        $user = User::find(auth()->id());
  
        if ($user->two_factor_token == $validated['code']) {
            $request->session()->put('user_2fa', $user->id);
            
            return response()->json(['message' => 'Two factor token confirmed.']);
        }
  
        return response(['message' => 'You entered wrong OTP code., please request a new OTP'], 401);
    }

    /**
     * resend otp code
     *
     * @return response()
     */
    public function resend()
    {
        $user = User::find(auth()->user()->id);
        $user->send_token();
  
        return response()->json([
            'message' => 'We have resent OTP to your email.'
        ]);
    }

    public function updateSettings(Request $request)
    {
        try {
            $user = User::find(auth()->user()->id);
            $fields = $request->validate([
                'data' => 'required|array',
                'data.*.key' => 'string|required',
                'data.*.value' => 'required'
            ]);
    
            foreach ($fields['data'] as $item) {
                // Option::updateOrCreate(
                //     ['key' => $item['key'], 'user_id' => $user->id ],
                //     ['value' => $item['value']]
                // );
            }
            $user->refresh();
    
            return response()->json([
                'data' => $user->load(['profile', 'options', 'roles', 'channels', 'chats']),
                'message' => 'successful'
            ]);
        } catch (\Exception $e) {
            return response(['message' => $e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        $user = User::find(auth()->user()->id);
        $user->tokens()->delete();
        $user->deleteDeviceToken();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            "message" => "Logout successful"
        ]);
    }

    public function destroy()
    {
        $user = User::find(auth()->user()->id);

        $deleted = $user->forceDelete();

        Mail::to($user)->send(new DataDeletionMail($user->profile));

        return response()->json([
            "status" => $deleted,
            "message" => "Account deleted successful"
        ]);
    }
}
