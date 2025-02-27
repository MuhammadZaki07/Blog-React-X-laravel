<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category = Category::all();
        return response()->json( $category,200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function popularCategories()
    {
        $categories = Category::withCount('articles')
            ->orderByDesc('articles_count')
            ->limit(5)
            ->get();

        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(),[
            "name" => 'required|string|min:2'
        ]);

        if($validation->fails()){
            return response()->json(["error" => $validation->errors()],422);
        }

        $category = Category::create([
            "name" => $request->name
        ]);

        return response()->json($category);
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
        $category = Category::findOrFail($id);
        return response()->json( $category,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validation = Validator::make($request->all(),[
            "name" => 'required|string|min:2'
        ]);

        if($validation->fails()){
            return response()->json(["error" => $validation->errors()],422);
        }

        $category = Category::findOrFail($id);
        $category->update([
            "name" => $request->name
        ]);
        return response()->json( $category,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json( $category,200);
    }
}
