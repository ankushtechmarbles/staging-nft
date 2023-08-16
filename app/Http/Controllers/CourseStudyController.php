<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CourseStudyController extends Controller
{
    
    public function Lesson($slug)
    {
        return view('course-study',[ 'slug' => $slug] );
    }
}
