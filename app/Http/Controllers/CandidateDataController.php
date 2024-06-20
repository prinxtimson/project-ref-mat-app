<?php

namespace App\Http\Controllers;

use App\Mail\CandidateDataMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CandidateDataController extends Controller
{
    public function send_data_access()
    {
        $user = User::find(auth()->id());

        Mail::to($user)->send(new CandidateDataMail($user->load('profile')));

        return response()->json([
            'message' => 'User Data sent to registered email.'
        ]);
    }
}
