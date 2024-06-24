<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostLike;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::whereNull('parent_id')->with(['user', 'replies', 'likes'])->get();
        return response()->json($posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'body' => 'required|string',
            'parent_id' => 'nullable|exists:posts,id'
        ]);
        $fields['user_id'] = auth()->id();

        $post = Post::create($fields);

        return response()->json($post->load(['user', 'replies', 'likes']));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function like_dislike($id)
    {
        $user_id = auth()->id();

        if (!$post = Post::find($id))
            return response(['message' => 'Post Not Found'], 404);

        if($post_like = PostLike::where('user_id', $user_id)->where('post_id', $post->id)->first()){
            $post_like->delete();
        }else{
            $post_like = $post->likes()->create(['user_id' => $user_id]);
        }

        return response()->json($post->load(['user', 'replies', 'likes']));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if (!$post = Post::find($id))
            return response(['message' => 'Post Not Found'], 404);

        $post->update($request->only('body'));
        return response()->json($post->load(['user', 'replies', 'likes']));
    }

    public function delete($id)
    {
        if (!$post = Post::find($id))
            return response(['message' => 'Post Not Found'], 404);

        $post->delete();
        return response()->json($post); 
    }

    public function restore($id)
    {
        if (!$post = Post::withTrashed()->find($id))
            return response(['message' => 'Post Not Found'], 404);

        $post->restore();
        return response()->json($post->load(['user', 'replies', 'likes'])); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!$post = Post::find($id))
            return response(['message' => 'Post Not Found'], 404);

        $post->forceDelete();
        return response()->json($post); 
    }
}
