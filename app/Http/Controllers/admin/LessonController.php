<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Course;
use App\Models\Lesson;
use Image;
use Storage;
use File;
use Session;
use Carbon\Carbon;
use Illuminate\Support\Str;


class LessonController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Course $course, Request $request)
    {    
        $q = $request->input( 'q' );
        $orderby = $request->input( 'orderby' ) ?: 'asc';
        $sortby = $request->input( 'sortby' ) ?: 'lesson_position' ;

        $result = Lesson::where('course_id', '=', $course->id)->whereNull('deleted_at');

        if($q != ""){
            $result = $result->where(function ($query) use($q) {
                $query->where('lessons_title', 'like', '%' . $q . '%')
                        ->orWhere('lesson_description', 'like', '%' . $q . '%');
            });
        }

        $result = $result->orderBy($sortby,$orderby)->paginate();
        $result = $result->appends( array ('q' => $q ) );
        $result = $result->appends( array ('sorty' => $sortby ) );
        $result = $result->appends( array ('orderby' => $orderby ) );
        return view ('admin.lesson.index',['course' => $course, 'result' => $result, 'q' => $q, 'sortby' => $sortby, 'orderby' => $orderby]);
    
    }    

  public function add(Course $course, Request $request)
  {
      if ($request->getMethod() == 'POST') {

        $validator = Validator::make($request->all(), $rules = [
          'lesson_title'          =>  'required|string|max:100|unique:lessons',
          'lesson_slug'           =>  'required|string|max:100|unique:lessons',
          'lesson_cover_image'    =>  'nullable|image|mimes:jpeg,png,jpg,gif|max:9048',
          'lesson_description'    =>  'required|string|min:5'
        ]);

        if ($validator->fails()) {
          return $this->jsonValidation($validator);       
        } 

        try{
          /*create folder for store all lesson images*/
          $file_prefix = str_slug($request->lesson_title, "-");
          $path = public_path('uploads/courses/'.$course->course_folder ?? $file_prefix);

          ini_set('memory_limit', '-1');
          if(!File::exists($path)) {
              File::makeDirectory($path, 0777, true, true);
          }
          
          $lesson = new Lesson;
          $lesson->course_id = $course->id;
          $lesson->lesson_title = $request->lesson_title;
          $lesson->lesson_slug = str_slug($request->lesson_slug, "-");
          $lesson->lesson_description = $request->lesson_description;
          $lesson->lesson_position = $request->lesson_position;
          $lesson->lesson_visibility = $request->lesson_visibility;
          $lesson->published_at = Carbon::createFromFormat('d/m/Y H:i:s', $request->published_at)->format('Y-m-d H:i:s');

          if ($request->hasFile('lesson_cover_image')) {
              $path = $request->file('lesson_cover_image')->store('courses/'.$file_prefix);
              $lesson->lesson_cover_image = $path;
          }

          $lesson->save();

          return $this->jsonSuccess(['success' => 'New Lesson added']);

      } catch(\Exception $e){

        return $this->jsonError($e->getMessage()); 

      }

    }
    
  }

  public function edit(Lesson $lesson, Request $request)
  { 
      if ($request->getMethod() == 'POST') {

        $validator = Validator::make($request->all(), $rules = [
          'lesson_title'          =>  'required|string|max:100|unique:lessons,lesson_title,'.$lesson->id.',id',
          'lesson_slug'           =>  'required|string|max:100|unique:lessons,lesson_slug,'.$lesson->id.',id',
          'lesson_cover_image'    =>  'nullable|image|mimes:jpeg,png,jpg,gif|max:9048',
          'lesson_description'    =>  'required|string|min:5'
        ]);

        if ($validator->fails()) {
          return $this->jsonValidation($validator);       
        } 

        try{

            $file_prefix = $lesson->course()->course_folder;
 
            $lesson->lesson_title = $request->lesson_title;
            $lesson->lesson_slug = str_slug($request->lesson_slug, "-");
            $lesson->lesson_description = $request->lesson_description;
            $lesson->lesson_position = $request->lesson_position;
            $lesson->lesson_visibility = $request->lesson_visibility;
            $lesson->published_at = Carbon::createFromFormat('d/m/Y H:i:s', $request->published_at)->format('Y-m-d H:i:s');

            if ($request->hasFile('lesson_cover_image')) {
              ini_set('memory_limi', -1);
              $old_path = $course->getOriginal('lesson_cover_image');
              $path = $request->file('lesson_cover_image')->store('courses/'.$file_prefix);
              $lesson->lesson_cover_image = $path;
              @Storage::delete($old_path);
            }

          $lesson->save();

          return $this->jsonSuccess(['success' => 'Lesson updated']);

        } catch(\Exception $e){

          return $this->jsonError($e->getMessage()); 

        }
    }  
  } 

  public function delete(Lesson $lesson)
  {
      try{
          
          @Storage::delete($lesson->getOriginal('lesson_cover_image'));
          $lesson->delete();          
          return redirect()->back()->with('success', 'Lesson deleted');

      } catch(\Exception $e){

          return redirect()->back()->with('error', $e->getMessage());

      }
  }  

  public function removeFile(Lesson $lesson, $filename, $position=0)
  {
    try{

      switch ($filename) {
        case 'lesson_cover_image':
          @Storage::delete($lesson->getOriginal('lesson_cover_image'));
          $lesson->lesson_cover_image = null;
          break;
      }

      $lesson->save();

      return redirect()->back()->with('success', ucfirst(str_replace('_', ' ', $filename)) .' deleted.');

    } catch(\Exception $e){

        return redirect()->back()->with('error', $e->getMessage());
    }    
  }

  public function updateLessonDisplayOrder(Request $request)
    {
        if ($request->getMethod() == 'POST') {
            try{
                $input = $request->all(); 
                foreach ($input['lessonArr'] as $key => $value) {
                    Lesson::where('id',$value)->update(['lesson_position'=>$key]);
                }
                return $this->jsonSuccess(['success' => 'Lessons display order updated']);

            } catch(\Exception $e){

                return $this->jsonError($e->getMessage()); 

            }
        }
    }

}