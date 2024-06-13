<?php

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

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('profile', function () {
        return view('welcome');
    })->name('profile');

    Route::get('change-password', function () {
        return view('welcome');
    })->name('change-password');

});