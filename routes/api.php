<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BasecampController;
use App\Http\Controllers\CandidateDataController;
use App\Http\Controllers\CandidateReferenceController;
use App\Http\Controllers\ChatMessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostController;
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
    Route::get('two-factor-auth/disable', [AuthController::class, 'disable2fa']);

});

Route::group(['middleware' => ['auth:sanctum', '2faApi'], 'prefix' => 'reference'], function () {
    Route::get('/', [CandidateReferenceController::class, 'index'])->name('ref.index');
    Route::get('/my', [CandidateReferenceController::class, 'getUserReferences'])->name('ref.my');
    Route::get('/send/{id}', [CandidateReferenceController::class, 'sendReferenceLetter'])->name('ref.send');
    Route::post('/', [CandidateReferenceController::class, 'store'])->name('ref.create');
    Route::put('/cancel', [CandidateReferenceController::class, 'cancelReferenceRequest'])->name('ref.cancel');
    Route::post('/upload', [CandidateReferenceController::class, 'uploadFile'])->name('ref.upload');
});

Route::group(['middleware' => ['auth:sanctum', '2faApi'], 'prefix' => 'data-access'], function () {
    Route::post('/', [CandidateDataController::class, 'send_data_access'])->name('ref.access');
});

Route::group(['prefix' => 'messages', 'middleware' => ['auth:sanctum', '2faApi']], function () {
    Route::get('', [ChatMessageController::class, 'index'])->name('messages.index');
    Route::get('show/{message}', [ChatMessageController::class, 'show'])->name('messages.show');
    Route::post('', [ChatMessageController::class, 'store'])->name('messages.store');
    Route::get('read', [ChatMessageController::class, 'markRead'])->name('messages.markRead');
    Route::put('archive/{message}', [ChatMessageController::class, 'archiveChatMsg'])->name('messages.archive');
    Route::put('restore/{message}', [ChatMessageController::class, 'restoreChatMsg'])->name('messages.restore');
    Route::delete('delete/{message}', [ChatMessageController::class, 'deleteMessage'])->name('messages.delete');
});

Route::group(['prefix' => 'posts', 'middleware' => ['auth:sanctum', '2faApi']], function () {
    Route::get('', [PostController::class, 'index'])->name('posts.index');
    Route::get('{id}/favorite', [PostController::class, 'like_dislike'])->name('posts.fovorite');
    Route::post('', [PostController::class, 'store'])->name('posts.store');
    Route::put('{id}/update', [PostController::class, 'update'])->name('posts.update');
    Route::put('{id}/archive', [PostController::class, 'delete'])->name('posts.archive');
    Route::put('{id}/restore', [PostController::class, 'restore'])->name('posts.restore');
    Route::delete('{id}/delete', [PostController::class, 'destroy'])->name('posts.delete');
});

Route::get('basecamp/projects/get', [BasecampController::class, 'getProjects'])->name('basecamp.index')->middleware(['auth:sanctum', '2faApi']);

Route::get('basecamp/projects/set', [BasecampController::class, 'setProjects'])->name('basecamp.projects.set');