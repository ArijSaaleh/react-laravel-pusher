<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
        // Register a new user
        public function register(Request $request)
        {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'rfid_tag' => 'required|string|unique:users', // Ensure RFID tag is unique
                'role' => 'required|string', // Either 'admin', 'employee', etc.
            ]);
    
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'rfid_tag' => $request->rfid_tag,
                'role' => $request->role,
            ]);
    
            return response()->json(['message' => 'User registered successfully'], 201);
        }
    
        // Login a user
        public function login(Request $request)
        {
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);
    
            if (!Auth::attempt($request->only('email', 'password'))) {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }
    
            $user = $request->user();
            $token = $user->createToken('auth_token')->plainTextToken;
    
            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'user' => $user
            ]);
        }
    
        // Logout a user
        public function logout(Request $request)
        {
            $request->user()->tokens()->delete();
    
            return response()->json(['message' => 'Logout successful']);
        }
    
        // Get authenticated user's info
        public function user(Request $request)
        {
            return response()->json($request->user());
        }
    
}
