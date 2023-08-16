<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseLevel extends Model
{
    use HasFactory;

    protected $table='course_levels'; 

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'course_level_name',
        'course_level_slug',
        'course_level_is_active',
    ]; 
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function courses() {
        return $this->hasMany(Course::class);
    } 
}
