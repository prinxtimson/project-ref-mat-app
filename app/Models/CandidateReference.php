<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CandidateReference extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'date_joined',
        'project_name',
        'is_project_completed',
        'project_role',
        'recruiter_name',
        'recruiter_email',
        'position',
        'status',
        'success_story',
        'generated_reference',
        'check_ins_url',
        'cv'
    ];

    protected $casts = [
        'date_joined' => 'datetime',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
