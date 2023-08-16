<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Quiz;
use App\Models\QuizOption;
use Carbon\Carbon;
use Illuminate\Support\Str;


class QuizController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Course $course, Request $request)
    {    
        $q = $request->input( 'q' );
        $orderby = $request->input( 'orderby' ) ?: 'asc';
        $sortby = $request->input( 'sortby' ) ?: 'created_at' ;

        $result = Quiz::with('quizOptions')->where('course_id', '=', $course->id)->whereNull('deleted_at');

        if($q != ""){
            $result = $result->where(function ($query) use($q) {
                $query->where('question', 'like', '%' . $q . '%');
            });
        }

        $result = $result->orderBy($sortby,$orderby)->paginate();
        $result = $result->appends( array ('q' => $q ) );
        $result = $result->appends( array ('sorty' => $sortby ) );
        $result = $result->appends( array ('orderby' => $orderby ) );
        return view ('admin.quiz.index',['course' => $course, 'result' => $result, 'q' => $q, 'sortby' => $sortby, 'orderby' => $orderby]);
    
    }    

	public function add(Course $course, Request $request)
	{
		if ($request->getMethod() == 'POST') {
			
			$validator = Validator::make($request->all(), $rules = [
				'question'	=>	'required|string|min:1', 
				'option_text'	=>	'required', 
			]);

			if ($validator->fails()) {
				return $this->jsonValidation($validator);
			}

			try{
				$quiz = new Quiz;
				$quiz->course_id = $course->id;
				$quiz->question = $request->question;
				$quiz->save();
				return $this->jsonSuccess(['success' => 'New Quiz added']);
			} catch(\Exception $e){
				return $this->jsonError($e->getMessage());
			}
		} 
	}

	public function edit(Quiz $quiz, Request $request)
  	{ 
    	if ($request->getMethod() == 'POST') {
	      	$validator = Validator::make($request->all(), $rules = [
	          'question'	=>	'required|string|min:1',
	          'option_text'	=>	'required', 
	        ]);

	        if ($validator->fails()) {
	        	return $this->jsonValidation($validator);       
	        }

	        try{
	        	$quiz->course_id = $course->id;
				$quiz->question = $request->question;
				$quiz->save();
          		return $this->jsonSuccess(['success' => 'Quiz updated']);
          	} catch(\Exception $e){
          		return $this->jsonError($e->getMessage()); 
          	}
        } 
    } 

  	public function delete(Quiz $quiz)
  	{
  		try{
			$quiz->delete();
			return redirect()->back()->with('success', 'Quiz deleted');
		} catch(\Exception $e){
			return redirect()->back()->with('error', $e->getMessage());
		} 
  	}

}