<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommunityScore extends Model
{
    use HasFactory;

    protected $table ='community_scores';

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    protected $fillable = [
        'usable',
        'payment',
        'build',
        'invest',
        'total_score',
        'project_id'
    ];

    public static function findScore()
    {
        $invest = request()->invest;

        $total_score = (request()->payment/10*35/10) + (request()->build/10*35/10) + (request()->usable/10*35/10);

        if ($invest > 0 && $invest <= 10) {
            return $total_score + 1;
        }elseif ($invest > 10 && $invest <= 20) {
            return $total_score + 2;
        }elseif ($invest > 20 && $invest <= 30) {
            return $total_score + 3;
        }elseif ($invest > 30 && $invest <= 40) {
            return $total_score + 4;
        }elseif ($invest > 40 && $invest <= 50) {
            return $total_score + 5;
        }elseif ($invest > 50 && $invest <= 60) {
            return $total_score + 6;
        }elseif ($invest > 60 && $invest <= 70) {
            return $total_score + 7;
        }elseif ($invest > 70 && $invest <= 80) {
            return $total_score + 8;
        }elseif ($invest > 80 && $invest <= 90) {
            return $total_score + 9;
        }elseif ($invest > 90 && $invest <= 100) {
            return $total_score + 10;
        }

        return $invest;
    }
}
