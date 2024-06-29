<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReferenceEmail extends Model
{
    use HasFactory;

    protected $fillable = [
        'recipient_name',
        'recipient_email',
        'status',
        'meta_data',
    ];

    protected $casts = [
        'meta_data' => 'array',
    ];
}
