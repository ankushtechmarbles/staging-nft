<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseCategory extends Model
{
    use HasFactory;

    protected $table='course_categories'; 

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'course_category_name',
        'course_category_slug',
        'course_category_is_active',
    ]; 
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function courses() {
        return $this->hasMany(Course::class);
    } 
}