<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;


class ProjectScore extends Model
{
    use HasFactory;

    protected $table ='project_scores'; 

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "project_id",
        "medal",
        "heart",
        "fire",
        "money_bag",
        "total_score"
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public static function findScore()
    {
        $money_bag = request()->money_bag;
        
        $total_score = (request()->medal/10*35/10) + (request()->heart/10*35/10) + (request()->fire/10*35/10);

        if ($money_bag > 0 && $money_bag <= 10) {
            return $total_score + 1;
        }elseif ($money_bag > 10 && $money_bag <= 20) {
            return $total_score + 2;
        }elseif ($money_bag > 20 && $money_bag <= 30) {
            return $total_score + 3;
        }elseif ($money_bag > 30 && $money_bag <= 40) {
            return $total_score + 4;
        }elseif ($money_bag > 40 && $money_bag <= 50) {
            return $total_score + 5;
        }elseif ($money_bag > 50 && $money_bag <= 60) {
            return $total_score + 6;
        }elseif ($money_bag > 60 && $money_bag <= 70) {
            return $total_score + 7;
        }elseif ($money_bag > 70 && $money_bag <= 80) {
            return $total_score + 8;
        }elseif ($money_bag > 80 && $money_bag <= 90) {
            return $total_score + 9;
        }elseif ($money_bag > 90 && $money_bag <= 100) {
            return $total_score + 10;
        }

        return $money_bag;
    }

    
}
