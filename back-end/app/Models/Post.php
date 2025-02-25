<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title',
        'image',
        'body',
        'user_id',
        'id_category',
        'status',
        'slug'
    ];
}
