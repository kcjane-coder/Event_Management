<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {
        $role = $request->query('role'); // Admin | Organizer | User

        $users = User::select('id', 'username', 'email', 'role', 'created_at')
            ->when($role, function ($query) use ($role) {
                $query->where('role', $role);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($users);
    }
}
