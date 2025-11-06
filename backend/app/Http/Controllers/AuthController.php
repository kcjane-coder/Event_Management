<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

public function register(Request $request)
{
    $validated = $request->validate([
        'role' => 'required|string',
        'username' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:6',
    ]);

    $user = User::create([
        'role' => $validated['role'],
        'name' => $validated['username'],
        'email' => $validated['email'],
        'password' => bcrypt($validated['password']),
    ]);

    return response()->json([
        'message' => 'User registered successfully',
        'user' => $user
    ], 201);
}
