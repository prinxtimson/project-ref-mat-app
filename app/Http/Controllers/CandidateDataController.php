<?php

namespace App\Http\Controllers;

use App\Mail\CandidateDataMail;
use App\Mail\ConsentWithdrawalMail;
use App\Mail\RectificationMail;
use App\Mail\RestrictionMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CandidateDataController extends Controller
{
    public function send_data_access(Request $request)
    {
        $user = User::find(auth()->id());
        $fields = $request->validate([
            "name" => "required|string",
            "email" => "required|string|email",
            "type" => "required|integer"
        ]);

        if($fields['type'] == '1'){
            Mail::to($user)->send(new CandidateDataMail($user->load('profile')));
        }
        if($fields['type'] == '2'){
            Mail::to($user)->send(new RectificationMail($user->load('profile')));
        }
        if($fields['type'] == '3'){
            Mail::to($user)->send(new RestrictionMail($user->load('profile')));
        }
        if($fields['type'] == '5'){
            Mail::to($user)->send(new ConsentWithdrawalMail($user->load('profile')));
        }  

        return response()->json([
            'message' => 'User Data access successful'
        ]);
    }
}
