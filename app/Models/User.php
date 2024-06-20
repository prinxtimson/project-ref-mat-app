<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Mail\TwoFactorAuthMail;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Mail;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'avatar',
        'username',
        'device_token',
        'login_attempt',
        'account_locked_at',
        'is_2fa_enable',
        'password',
        'two_factor_token',
        'two_factor_token_expiry'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'device_token'.
        'two_factor_token',
        'two_factor_token_expiry',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'account_locked_at' => 'datetime',
        'two_factor_token_expiry' => 'datetime',
    ];

    public function profile () 
    {
        return $this->hasOne(Profile::class);
    }

    public function candidate_references()
    {
        return $this->hasMany(CandidateReference::class);
    }

    public function deleteDeviceToken()
    {
        return $this->update([
            'device_token' => null
        ]);
    }

    public function send_token()
    {
        try {
            $code = rand(100000, 999999);

            $this->two_factor_token = $code;
            $this->two_factor_token_expiry = Carbon::now()->addMinutes(2);
            $this->save();
            Mail::to($this)->send(new TwoFactorAuthMail($code, $this));
        } catch (Exception $e) {
            return response(['message' => $e->getMessage()], 400);
        }
    }
}
