<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CandidateDataController;
use App\Http\Controllers\CandidateReferenceController;
use App\Http\Controllers\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPass']);
Route::post('/reset-password', [AuthController::class, 'resetPass']);

Route::get('two-factor-auth/resend', [AuthController::class, 'resend'])->middleware(['auth:sanctum']);
Route::post('two-factor-auth/confirm', [AuthController::class, 'confirm2fa'])->middleware(['auth:sanctum']);
Route::get('two-factor-auth/setup', [AuthController::class, 'enable2fa'])->middleware(['auth:sanctum']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum']);

Route::group(['middleware' => ['auth:sanctum', '2faApi']], function () {
    Route::put('/option', [AuthController::class, 'updateSettings']);
    Route::get('me', [AuthController::class, 'me']);
    Route::put('/change-password', [AuthController::class, 'changePass']);
    Route::post('/update', [AuthController::class, 'update']);
    Route::delete('/delete', [AuthController::class, 'destroy']);

    Route::get('notifications', [NotificationController::class, 'get']);
    Route::get('notifications/mark', [NotificationController::class, 'mark']);

});

Route::group(['middleware' => ['auth:sanctum', '2faApi'], 'prefix' => 'reference'], function () {
    Route::get('/', [CandidateReferenceController::class, 'index'])->name('ref.index');
    Route::get('/my', [CandidateReferenceController::class, 'getUserReferences'])->name('ref.my');
    Route::post('/', [CandidateReferenceController::class, 'store'])->name('ref.create');
    Route::put('/cancel', [CandidateReferenceController::class, 'cancelReferenceRequest'])->name('ref.cancel');
    Route::post('/upload', [CandidateReferenceController::class, 'uploadFile'])->name('ref.upload');
});

Route::group(['middleware' => ['auth:sanctum', '2faApi'], 'prefix' => 'data-access'], function () {
    Route::post('/', [CandidateDataController::class, 'send_data_access'])->name('ref.access');
});
