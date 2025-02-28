<?php

use App\Http\Controllers\PostTagController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TagController;
use App\Http\Middleware\UserMiddleware;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Models\Post;

Route::get('/user', [AuthController::class, 'getData'])->middleware('auth:sanctum');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::group([AdminMiddleware::class], function () {
    Route::resource('category', CategoryController::class);
    Route::resource('tags', TagController::class);
    Route::resource('users', UserController::class);
    Route::resource('article', PostController::class)->middleware('auth:sanctum');
    Route::put('article/{id}', [PostController::class, 'show']);
    Route::put('article/update-status/{id}', [PostController::class, 'updateStatus']);
    Route::put('users/block/{id}', [UserController::class, 'block']);
    Route::put('users/unblock/{id}', [UserController::class, 'unblock']);
    Route::put('users/role/{id}', [UserController::class, 'toggleRole']);
    Route::get('/dashboard', [DashboardController::class, 'getDashboardStats']);
    Route::get('/articles/component', [PostController::class, 'latestArticles']);
});

Route::get('/user/articles', [PostController::class, 'getUserArticles'])->middleware('auth:sanctum');
Route::get('/articles/latest', [PostController::class, 'latestArticles']);
Route::get('/news',  [PostController::class, 'getRandomNews']);
Route::get('/categories/popular', [CategoryController::class, 'popularCategories']);
Route::get('/articles', [PostController::class, 'latestArticles']);
Route::get('/articles/all', [PostController::class, 'index']);
Route::get('/post', [PostController::class, 'allArticles']);
Route::get('/post/all', [PostController::class, 'allActiveArticles']);
Route::get('/articles', [PostController::class, 'index2']);
Route::get('/posts/{slug}', [PostController::class, 'show2']);


