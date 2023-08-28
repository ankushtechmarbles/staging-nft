<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CommunityLeaderboard extends Model
{
    use HasFactory;
    use SoftDeletes;

    public function entries()
    {
        return $this->hasMany(CommunityLeaderboardEntry::class);
    }

    protected $fillable = [
        'title',
        'description',
        'rules',
        'prizes',
        'sponsors',
        'faq',
        'cover_image',
        'slug',
        'status',
        'type',
        'start_date',
        'end_date',
        'is_active',
    ];

    protected $dates = ['deleted_at', 'published_at'];

    protected $date = ['published_at', 'created_at', 'updated_at'];
}
