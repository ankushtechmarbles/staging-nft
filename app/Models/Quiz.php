<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model; 
use Illuminate\Database\Eloquent\SoftDeletes;

class Quiz extends Model
{
    //use SoftDeletes;

    protected $table ='quizzes'; 

    protected $fillable = ['course_id', 'question', 'score'];

    //protected $dates = ['deleted_at'];

    //protected $softDelete = true;

    public function QuizOptions()
    {
        return $this->hasMany(QuizOption::class, 'quiz_id', 'id');
    }

}
