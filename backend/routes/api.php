<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VenueController;
use App\Http\Controllers\Admin\AdminUserController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/admin/users', [AdminUserController::class, 'index']);
});

Route::post('/register',
[AuthController::class, 'register']);

Route::post('/login',
[AuthController::class, 'login']);

Route::post('/organizer/venues', [VenueController::class, 'store']);

Route::get('/organizer/venues', [VenueController::class, 'index']);
Route::get('/venues', [VenueController::class, 'index']);


Route::delete('/organizer/venues/{id}', [VenueController::class, 'destroy']);

Route::get('/organizer/venues/{id}', [VenueController::class, 'show']);


Route::middleware('auth:api')->get('/organizer/profile', function (Request $request) {
    return response()->json([
        'id' => $request->user()->id,
        'role' => $request->user()->role,
        'username' => $request->user()->username,
        'email' => $request->user()->email,
    ]);
});



Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/admin/users', [AdminUserController::class, 'index']);
});



Route::apiResource('posts', PostController::class);