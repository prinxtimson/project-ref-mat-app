<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstname',
        'lastname',
        'phone_number',
        'bio',
        'dob'
    ];

        /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'dob' => 'datetime',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
