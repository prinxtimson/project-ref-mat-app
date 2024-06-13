<?php

use App\Http\Controllers\AuthController;
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

Route::group(['middleware' => ['auth:sanctum', '2faApi']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('two-factor-auth/resend', [AuthController::class, 'resend']);
    Route::post('two-factor-auth/confirm', [AuthController::class, 'confirm2fa']);
    Route::get('two-factor-auth/setup', [AuthController::class, 'enable2fa']);
    Route::put('/option', [AuthController::class, 'updateSettings']);
    Route::get('me', [AuthController::class, 'me']);
    Route::put('/change-password', [AuthController::class, 'changePass']);
    Route::post('/update', [AuthController::class, 'update']);
    Route::delete('/delete', [AuthController::class, 'delete']);

    Route::get('notifications', [NotificationController::class, 'get']);
    Route::get('notifications/mark', [NotificationController::class, 'mark']);

});
