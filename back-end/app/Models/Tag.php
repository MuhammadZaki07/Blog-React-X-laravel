<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'name'
    ];

    public function articles()
    {
        return $this->belongsToMany(Post::class);
    }

    public function posts() {
        return $this->belongsToMany(Post::class, 'post_tag');
    }
}
