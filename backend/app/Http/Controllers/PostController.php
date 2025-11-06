<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Post::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

         return Post::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
         return $post;

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $post->update($request->all());
        return $post;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
         $post->delete();
        return response()->noContent();
    }

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
}
