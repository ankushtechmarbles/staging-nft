<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CommunityLeaderboardEntry extends Model
{
    use HasFactory;
    use SoftDeletes;

    public function entries()
    {
        return $this->belongsTo(CommunityLeaderboard::class);
    }
}
