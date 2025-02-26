<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\UserMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', [AuthController::class, 'getData'])->middleware('auth:sanctum');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::group([
    'middleware' => [AdminMiddleware::class, 'auth:sanctum']
], function () {
    Route::resource('category', CategoryController::class);
    Route::resource('tags', TagController::class);
    Route::resource('users', UserController::class);
    Route::resource('article', PostController::class);
    Route::put('users/block/{id}', [UserController::class, 'block']);
    Route::put('users/unblock/{id}', [UserController::class, 'unblock']);
    Route::put('users/role/{id}', [UserController::class, 'toggleRole']);
});

Route::group([UserMiddleware::class], function () {});
