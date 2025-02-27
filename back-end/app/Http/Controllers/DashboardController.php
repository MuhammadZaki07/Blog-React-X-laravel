<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getDashboardStats()
    {
        return response()->json([
            'totalArticles' => Post::count(),
            'totalComments' => Comment::count(),
            'totalUsers' => User::count(),
            'totalLikes' => Like::count(),
        ]);
    }
}
