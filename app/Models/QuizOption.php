<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model; 
use Illuminate\Database\Eloquent\SoftDeletes;

class QuizOption extends Model
{
    use SoftDeletes;

    //protected $table ='quiz_options'; 

    protected $fillable = ['quiz_id', 'option_text', 'is_correct'];

    //protected $dates = ['deleted_at'];

    //protected $softDelete = true;

}
