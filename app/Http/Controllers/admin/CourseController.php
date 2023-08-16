<?php


namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Models\CourseCategory;
use App\Models\CourseLevel;
use App\Models\Course;
use Image;
use Storage;
use File;
use DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

class CourseController extends Controller
{
  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
      $this->middleware('auth');
  }


  public function index(Request $request)
  {
      $q = $request->input( 'q' );
      $orderby = $request->input( 'orderby' ) ?: 'desc';
      $sortby = $request->input( 'sortby' ) ?: 'id' ;

      $result = Course::whereNull('deleted_at');

      if($q != ""){
          $result = $result->where(function ($query) use($q) {
              $query->where('course_title', 'like', '%' . $q . '%')
                 ->orWhere('course_slug', 'like', '%' . $q . '%');
          });
      }

      $result = $result->orderBy($sortby,$orderby)->paginate();
      $result = $result->appends( array ('q' => $q ) );
      $result = $result->appends( array ('sorty' => $sortby ) );
      $result = $result->appends( array ('orderby' => $orderby ) );
      return view ('admin.course.index',['result' => $result, 'q' => $q, 'sortby' => $sortby, 'orderby' => $orderby]);
      
  }    

  public function add(Request $request)
  {
      if ($request->getMethod() == 'POST') {

        $validator = Validator::make($request->all(), $rules = [
          'course_title'          =>  'required|string|max:100|unique:courses',
          'course_slug'           =>  'required|string|max:100|unique:courses',
          'course_cover_image'    =>  'nullable|image|mimes:jpeg,png,jpg,gif|max:9048',
          'course_category_id'    =>  'required',
          'course_level_id'       =>  'required',
        ]);

        if ($validator->fails()) {
          return $this->jsonValidation($validator);       
        } 

        try{
          /*create folder for store all course images*/
          $file_prefix = str_slug($request->course_title, "-");
          $path = public_path('uploads/courses/'.$file_prefix);

          ini_set('memory_limit', '-1');
          if(!File::exists($path)) {
              File::makeDirectory($path, 0777, true, true);
          }
          
          $course = new Course;
          //$course->randon_id = (string) Str::orderedUuid();
          $course->course_title = $request->course_title;
          $course->course_slug = str_slug($request->course_slug, "-");
          $course->course_category_id = $request->course_category_id;
          $course->course_level_id = $request->course_level_id;
          $course->course_folder = $file_prefix;

          if ($request->hasFile('course_cover_image')) {
              $path = $request->file('course_cover_image')->store('courses/'.$file_prefix);
              $course->course_cover_image = $path;
          }

          $course->save();

          return $this->jsonSuccess(['success' => 'New Course added']);

      } catch(\Exception $e){

        return $this->jsonError($e->getMessage()); 

      }

    }

    $course_categories = CourseCategory::orderBy('course_category_name')->where('course_category_is_active', 1)->pluck('course_category_name', 'id')->prepend('Select Course Category', '');

    $course_levels = CourseLevel::orderBy('course_level_name', 'asc')->where('course_level_is_active', 1)->pluck('course_level_name', 'id')->prepend('Select Course Level', '');

    return view('admin.course.add',['course_categories' => $course_categories, 'course_levels' => $course_levels]);
    
  }

  public function edit(Course $course, Request $request)
  { 
      if ($request->getMethod() == 'POST') {

          $validator = Validator::make($request->all(), $rules = [
            'course_title'          =>  'required|string|max:100|unique:courses,course_title,'.$course->id.',id',
            'course_slug'           =>  'required|string|max:100|unique:courses,course_slug,'.$course->id.',id',
            'course_cover_image'    =>  'nullable|image|mimes:jpeg,png,jpg,gif|max:9048',
            'course_category_id'    =>  'required',
            'course_level_id'       =>  'required',
          ]);

          if ($validator->fails()) {
              return $this->jsonValidation($validator);       
          } 

          try{

              $file_prefix = $course->course_folder;

              $course->course_title = $request->course_title;
              $course->course_slug = str_slug($request->course_slug, "-");
              $course->course_category_id = $request->course_category_id;
              $course->course_level_id = $request->course_level_id; 

              if ($request->hasFile('course_cover_image')) {
                  ini_set('memory_limi', -1);
                  $old_path = $course->getOriginal('course_cover_image');
                  $path = $request->file('course_cover_image')->store('courses/'.$file_prefix);
                  $course->course_cover_image = $path;
                  @Storage::delete($old_path);
              }

              $course->save();

              return $this->jsonSuccess(['success' => 'Course Updated']);

          } catch(\Exception $e){

              return $this->jsonError($e->getMessage()); 

          }
      } else {
        $course_categories = CourseCategory::orderBy('course_category_name')->where('course_category_is_active', 1)->pluck('course_category_name', 'id')->prepend('Select Course Category', '');

        $course_levels = CourseLevel::orderBy('course_level_name', 'asc')->where('course_level_is_active', 1)->pluck('course_level_name', 'id')->prepend('Select Course Level', '');

        return view('admin.course.edit',['course' => $course, 'course_categories' => $course_categories, 'course_levels' => $course_levels]); 
      }
  } 

  public function delete(Course $course)
  {
      try{
          
          if (!empty($course->course_folder)) {
              $path = public_path('uploads/courses/'.$course->course_folder);
              if(File::exists($path)) {
                  File::deleteDirectory($path);
              }
          }

          $course->delete();
          
          return redirect()->back()->with('success', 'Course Deleted.');

      } catch(\Exception $e){

          return redirect()->back()->with('error', $e->getMessage());

      }
  }  

  public function removeFile(Course $course, $filename, $position=0)
  {
    try{

      switch ($filename) {
        case 'course_cover_image':
          @Storage::delete($course->getOriginal('course_cover_image'));
          $course->course_cover_image = null;
          break;
      }

      $course->save();

      return redirect()->back()->with('success', ucfirst(str_replace('_', ' ', $filename)) .' deleted.');

    } catch(\Exception $e){

        return redirect()->back()->with('error', $e->getMessage());
    }    
  }

}