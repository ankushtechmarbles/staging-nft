<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model; 
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use SoftDeletes;

    protected $table ='courses'; 

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'course_title', 
        'course_slug', 
        'course_cover_image', 
        'course_is_active',
        'course_folder',
    ];

    protected $dates = ['deleted_at'];

    protected $softDelete = true;

    /**
     * Get the path to the poster image
     *
     * @return string
     */
    public function coverImagePath()
    {
        return (!empty($this->course_cover_image) && file_exists('uploads/' . $this->course_cover_image) ) ? url('uploads/' . $this->course_cover_image) : url('assets/img/courses/no-course-image.svg');
    }

    public function courseCategories()
    {
        return $this->belongsTo(CourseCategory::class, 'course_category_id', 'id');
    }

    public function courseLevels()
    {
        return $this->belongsTo(CourseLevel::class, 'course_level_id', 'id');
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class, 'course_id')->orderBy('lesson_position')->orderBy('id');
    }
}
