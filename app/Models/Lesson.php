<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model; 
use Illuminate\Database\Eloquent\SoftDeletes;

class Lesson extends Model
{
    use SoftDeletes;

    protected $table ='lessons'; 

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'course_id',
        'lesson_title',
        'lesson_slug',
        'lesson_description',
        'lesson_cover_image',
        'lesson_position',
        'lesson_visibility',
        'lesson_is_active',
    ];

    protected $dates = ['deleted_at', 'published_at'];

    protected $date = ['published_at', 'created_at', 'updated_at'];


    protected $softDelete = true;

    /**
     * Get the path to the poster image
     *
     * @return string
     */
    public function coverImagePath()
    {
        return (!empty($this->lesson_cover_image) && file_exists('uploads/' . $this->lesson_cover_image) ) ? url('uploads/' . $this->lesson_cover_image) : url('assets/img/courses/no-course-image.svg');
    }

    public function Courses()
    {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'id')->first();
    }

    public function nextLesson(){
        // get next Lesson
        return  Lesson::where('course_id', '=', $this->course_id)
                            ->where(function ($query) {
                              if (empty($this->lesson_position) && $this->lesson_position == null ) {
                                 return $query->where('id', '>', $this->id);
                              }else{
                                 return $query->where('lesson_position', '=' , $this->lesson_position+1);
                              }
                          })->orderBy('lesson_position','asc')->orderBy('id','asc')->first();

    }

    public function countLesson(){
        return  Lesson::where('course_id', '=', $this->course_id)->count() ?? 1;
    }

}
