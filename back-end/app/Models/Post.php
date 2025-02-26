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
        'category_id',
        'status',
        'slug'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
