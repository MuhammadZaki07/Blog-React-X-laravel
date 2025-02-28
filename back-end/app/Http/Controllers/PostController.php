<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categoryName = $request->query('category');
        $userId = Auth::id();

        $query = Post::with(['category', 'user'])
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc');

        if ($categoryName) {
            $query->whereHas('category', function ($q) use ($categoryName) {
                $q->where('name', $categoryName);
            });
        }

        $articles = $query->get();

        return response()->json($articles);
    }

    public function allArticles()
    {
        $articles = Post::with('category', 'user')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($articles);
    }

    public function allActiveArticles()
    {
        $articles = Post::with('category', 'user')
            ->where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($articles);
    }
    public function index2(Request $request)
    {
        $categoryName = $request->query('category');

        if ($categoryName) {
            $articles = Post::with(['category', 'user'])
                ->where('status', 'active')
                ->whereHas('category', function ($query) use ($categoryName) {
                    $query->where('name', $categoryName);
                })
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            $articles = Post::with(['category', 'user'])
                ->where('status', 'active')
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return response()->json($articles);
    }

    public function getRandomNews()
    {
        $news = Post::with('category')
            ->where('status', 'active')
            ->inRandomOrder()
            ->limit(10)
            ->get();

        return response()->json($news);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function updateStatus(Request $request, string $id)
    {
        $post = Post::findOrFail($id);
        $post->status = $request->status;
        $post->save();
        return response()->json($post);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|exists:categories,id',
            'slug' => 'required|string|unique:posts,slug',
            'body' => 'required|string',
            'status' => 'required|in:active,non-active',
            'tags'   => 'array',
            'tags.*' => 'exists:tags,id',
        ]);

        $userId = Auth::id();
        if (!$userId) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            $imagePath = null;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('posts', 'public');
            }

            $post = Post::create([
                'title' => $validatedData['title'],
                'image' => $imagePath,
                'category_id' => $validatedData['category_id'],
                'slug' => $validatedData['slug'],
                'body' => $validatedData['body'],
                'status' => $validatedData['status'],
                'user_id' => $userId,
            ]);

            if ($request->has('tags')) {
                $post->tags()->sync($request->tags);
            }

            return response()->json([
                'message' => 'Post successfully created',
                'post' => $post->load('tags')
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create post',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function latestArticles()
    {
        $articles = Post::with('user', 'category')
            ->where('status', 'active')
            ->latest()
            ->take(5)
            ->get();

        return response()->json($articles);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $post = Post::with(['category', 'user'])->findOrFail($id);
        return response()->json($post);
    }
    public function show2(string $slug)
    {
        $post = Post::where('slug', $slug)
            ->with(['category', 'user', 'comments', 'tags'])
            ->firstOrFail();

        return response()->json($post, 200);
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $post = Post::findOrFail($id);
        return response()->json($post, 200);
    }

    public function getUserArticles()
    {
        try {
            $articles = Post::with(['category', 'user'])
                ->oldest()
                ->limit(5)
                ->get();

            return response()->json($articles);
        } catch (\Exception $e) {
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:active,non-active',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $article = Post::findOrFail($id);
        $article->title = $request->title;
        $article->body = $request->body;
        $article->category_id = $request->category_id;
        $article->status = $request->status;

        if ($request->hasFile('image')) {
            if ($article->image) {
                Storage::disk('public')->delete($article->image);
            }

            $imagePath = $request->file('image')->store('posts', 'public');
            $article->image = $imagePath;
        }

        $article->save();

        return response()->json([
            'message' => 'Article updated successfully',
            'article' => $article
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);
        Storage::disk('public')->delete($post->image);
        $post->delete();
        return response()->json([
            "message" => "success",
        ], 200);
    }
}
