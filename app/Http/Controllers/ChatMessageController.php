<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Models\ChatMessage;
use App\Models\User;
use App\WebPush\WebNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ChatMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $chats = ChatMessage::where('user_id', auth()->id())->with(['user', 'sender'])->get();
        return response()->json($chats);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->has('id')) {
            return $this->update($request);
        }

        $user = User::find(auth()->id());
        $payload = [
            'sender_id' => $user->id
        ];
        if($request->has('body')){
            $payload['body'] = $request->get('body');
        }

        if($request->hasFile('media')){
            $payload['media_format'] = $request->file('media')->extension();
            $path = $request->file('media')->store('media');
            $payload['media'] = Storage::url($path);
        }
        $chat_msg = $user->chat_messages()->create($payload);
        //NewMessage::dispatch($chat_msg->load('user'));
        WebNotification::sendWebNotification(['title' => 'New Message', 'body' => $chat_msg->text]);

        return response()->json($chat_msg->load(['user', 'sender']));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    private function update(Request $request)
    {
        $message = ChatMessage::findOrFail($request->get('id'));
        $message->body = $request->get('body');
        $message->edited_at = Carbon::now();
        $message->save();
        
        // NewMessage::dispatch($message->load('user'));
        WebNotification::sendWebNotification(['title' => 'New Message', 'body' => $message->text]);
        return response()->json($message->load(['user', 'sender']));
    }

    public function markRead()
    {
        $user = User::find(auth()->user()->id);

        $messages = ChatMessage::where('user_id', '!=', $user->id)->whereNull('read_at')->get();
        foreach ($messages as $message) {
            $message->read_at = Carbon::now();
            $message->save();
        }

        return response()->json($messages->load(['user', 'sender']));
    }

    public function deleteMessage(ChatMessage $message)
    { 
        if($message->user_id != auth()->id())
            return response(['message' => 'Not permitted to delete message'], 400);

        $message->forceDelete();

        return response()->json($message);
    }

    public function archiveChatMsg(ChatMessage $message)
    {
        if($message->user_id != auth()->id())
            return response(['message' => 'Not permitted to archive message'], 400);

        $message->delete();

        return response()->json($message);
    }

    public function restoreChatMsg(ChatMessage $message)
    {
        if($message->user_id != auth()->id())
            return response(['message' => 'Not permitted to restore message'], 400);

        $message->restore();

        return response()->json($message->load(['user', 'sender']));
    }
}
