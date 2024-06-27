<?php

use App\Models\CandidateReference;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/2fa', function () {
    return view('welcome');
})->middleware(['auth:sanctum'])->name('2fa');

Route::get('/2fa/setup', function () {
    return view('welcome');
})->middleware(['auth:sanctum'])->name('2fa.setup');

Route::middleware(['guest'])->group(function () {

    Route::get('/login', function () {
        return view('welcome');
    })->name('login');

    Route::get('/password/reset/{token}', function () {
        return view('welcome');
    })->name('password.reset');

    Route::get('/password/forgot', function () {
        return view('welcome');
    })->name('password.forgot');

});

Route::get('ref-letter', function () {
    return view('welcome');
})->name('ref');

Route::get('/', function () {
    return view('welcome');
});

Route::get('/search', function () {
    return view('welcome');
});

Route::get('/reference-template/{id}', function ($id) {
    $candidate_ref = CandidateReference::find($id);
    
    $candidate_ref->date_joined = Carbon::parse($candidate_ref->date_joined)->format('d M, Y'); 
    $candidate_ref->created_at = Carbon::parse($candidate_ref->created_at)->format('d M, Y');
    return view('reference_letter_template', ['user' => $candidate_ref]);
});


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('profile', function () {
        return view('welcome');
    })->name('profile');

    Route::get('interection', function () {
        return view('welcome');
    })->name('interection');

    Route::get('change-password', function () {
        return view('welcome');
    })->name('change-password');

    Route::get('request-reference', function () {
        return view('welcome');
    })->name('request-reference');

    Route::get('cancel-reference', function () {
        return view('welcome');
    })->name('cancel-reference');

    Route::get('reference-tracking', function () {
        return view('welcome');
    })->name('reference-tracking');

    Route::get('data-deletion', function () {
        return view('welcome');
    })->name('data-deletion');

    Route::get('data-access', function () {
        return view('welcome');
    })->name('data-access');

    Route::group(['prefix' => 'interaction'], function () {
        Route::get('', function () {
            return view('welcome');
        })->name('interaction');

        Route::get('messaging', function () {
            return view('welcome');
        })->name('interaction.messaging');

        Route::get('comments', function () {
            return view('welcome');
        })->name('interaction.comments');
    });
});