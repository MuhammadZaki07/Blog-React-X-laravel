<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function getData(Request $request)
    {
        return response()->json($request->user());
    }

    public function login(Request $request)
    {
        $validation = Validator::make($request->all(), [
            "email" => "required|email|string",
            "password" => "required|string|min:8"
        ]);

        if ($validation->fails()) {
            return response()->json(['errors' => $validation->errors()], 400);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(["error" => "Email atau password salah"], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            "message" => "Login berhasil",
            "user" => $user,
            "token" => $token,
            "role" => $user->role
        ], 200);
    }

    public function register(Request $request){
        $validation = Validator::make($request->all(),[
            "username" => "required|string|max:255",
            "email" => "required|string|email|unique:users,email",
            "password" => "required|string|min:8|confirmed"
        ]);

        if ($validation->fails()) {
            return response()->json(['errors' => $validation->errors()], 400);
        }

        $user = User::create([
            "full_name" => $request->username,
            "email" => $request->email,
            "password" => Hash::make($request->password),
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token,
            "role" => "user"
        ], 201);
    }

    public function logout(Request $request){
        $user = $request->user();
        if ($user) {
            $user->currentAccessToken()->delete();
            return response($user,200);
        }
        return response("invalid_token",500);
    }
}
