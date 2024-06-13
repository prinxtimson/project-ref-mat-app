<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    
    public function get()
    {
        $user = auth()->user();

        $notifications = [
            'data' => $user->notifications,
            'count' => $user->unreadNotifications->count()
        ];
        return response()->json($notifications);
    }

    public function mark()
    {
        $user = auth()->user();
        $user->unreadNotifications->markAsRead();

        $notifications = [
            'data' => $user->notifications,
            'count' => 0
        ];
        return response()->json($notifications);
    }
}
