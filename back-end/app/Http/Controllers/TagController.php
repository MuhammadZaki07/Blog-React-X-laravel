<?php

namespace App\Http\Controllers;

use App\Models\PostTag;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tag::all();
        return response()->json($tags, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function show($id)
    {
        $tag = Tag::findOrFail($id);
        return response()->json($tag);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            "name" => ["required", "string", "regex:/^\S+$/", "unique:tags,name"]
        ]);

        if ($validation->fails()) {
            return response()->json(["errors" => $validation->errors()], 422);
        }

        $tagName = $request->name;
        if ($tagName[0] !== "#") {
            $tagName = "#" . $tagName;
        }

        $tag = Tag::create([
            "name" => $tagName
        ]);

        return response()->json($tag, 201);
    }

    /**
     * Display the specified resource.
     */

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $tag = Tag::findOrFail($id);
        return response()->json($tag, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validation = Validator::make($request->all(), [
            "name" => "required|string|unique:tags,name"
        ]);
        if ($validation->fails()) {
            return response()->json(["error" => $validation->errors()], 422);
        }

        $tag = Tag::findOrFail($id);
        $tag->update([
            "name" => $request->name
        ]);
        return response()->json($tag, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tag = Tag::findOrFail($id);
        $tag->delete();
        return response()->json($tag, 200);
    }
}
