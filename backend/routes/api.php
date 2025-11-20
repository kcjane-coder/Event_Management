<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VenueController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register',
[AuthController::class, 'register']);

Route::post('/login',
[AuthController::class, 'login']);

Route::post('/organizer/venues', [VenueController::class, 'store']);

Route::get('/organizer/venues', [VenueController::class, 'index']);

Route::delete('/organizer/venues/{id}', [VenueController::class, 'destroy']);

Route::apiResource('posts', PostController::class);