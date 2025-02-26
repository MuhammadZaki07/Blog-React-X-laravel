<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::all();
        return response()->json($user, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'gender' => 'required',
            'role' => 'required',
        ]);

        $user = User::create([
            'full_name' => $validatedData['username'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'gender' => $validatedData['gender'],
            'role' => $validatedData['role'],
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }

    /**
     * Store a newly created resource in storage.
     */

    /**
     * Display the specified resource.
     */
    public function block($id)
    {
        $user = User::findOrFail($id);
        $user->update(["status" => "block"]);

        return response()->json([
            "message" => "User blocked successfully",
            "user" => $user
        ], 200);
    }

    public function unblock($id)
    {
        $user = User::findOrFail($id);
        $user->update(["status" => "unblock"]);

        return response()->json([
            "message" => "User unblocked successfully",
            "user" => $user
        ], 200);
    }

    public function toggleRole($id)
    {
        $user = User::findOrFail($id);

        $newRole = $user->role === "user" ? "admin" : "user";

        $user->update(["role" => $newRole]);

        return response()->json([
            "message" => "User role updated successfully",
            "user" => $user
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validation = Validator::make($request->all(), [
            "full_name" => "required|string|max:255",
            "image" => "nullable|mimes:png,jpg|max:2048",
            "gender" => "required|string",
            "no_tlp" => "required|string|min:10|max:13",
            "bio" => "required|string",
        ]);

        if ($validation->fails()) {
            return response()->json(["error" => $validation->errors()]);
        }

        $user = User::findOrFail($id);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->storePublicly('user', 'public');
            if ($user->image) {
                Storage::disk('public')->delete($user->image);
            }
            $user->image = $path;
        }

        $user->update([
            "full_name" => $request->full_name,
            "gender" => $request->gender,
            "no_tlp" => $request->no_tlp,
            "bio" => $request->bio,
        ]);

        return response()->json($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json($user, 200);
    }
}
