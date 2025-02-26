<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $posts = Post::with('category')->get();
    return response()->json($posts);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|integer',
            'slug' => 'required|string|unique:posts,slug',
            'body' => 'required|string',
            'status' => 'required|in:active,non-active',
        ]);

        $userId = Auth::id();
        if (!$userId) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
        }

        $postData = [
            'title' => $validatedData['title'],
            'image' => $imagePath,
            'category_id' => $validatedData['category_id'],
            'slug' => $validatedData['slug'],
            'body' => $validatedData['body'],
            'status' => $validatedData['status'],
            'user_id' => $userId,
        ];

        $post = Post::create($postData);

        return response()->json([
            'message' => 'Post successfully created',
            'post' => $post
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
