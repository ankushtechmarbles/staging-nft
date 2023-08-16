<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CourseCategory;
use App\Models\CourseLevel;
use App\Models\Course;

class CourseController extends Controller
{
        
    public function index(Request $request)
    {
        
        /*$course_categories = CourseCategory::orderBy('course_category_name')->where('course_category_is_active', 1)->pluck('course_category_name', 'id')->prepend('All Categories', '');

        $course_levels = CourseLevel::orderBy('course_level_name', 'asc')->where('course_level_is_active', 1)->pluck('course_level_name', 'id')->prepend('All Level', '');

        $courses = Course::whereNull('deleted_at')->orderBy('course_title')->get();


        return view('course.index',[ 
            'course_categories' => $course_categories,
            'course_levels' => $course_levels,
            'courses' => $courses,
        ]);*/
        return view('course.index');
    }

    public function show($course_slug)
    {
        $course = Course::with(['lessons'])->whereNull('deleted_at')->where('course_slug', $course_slug)->firstOrFail();
        
        return view('course.show',[
            'course' => $course,
        ]);
    }
    public function newdashboard(){

        return view('dashboard.dashboard-new');
    }
}
