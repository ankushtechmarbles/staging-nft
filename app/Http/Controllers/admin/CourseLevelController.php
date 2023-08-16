<?php


namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\CourseLevel;

class CourseLevelController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }


    //*** GET Request
    public function index(Request $request)
    {
        $q = $request->input( 'q' );

      $result = CourseLevel::orderBy('course_level_name');

      if($q != ""){
          $result = $result->where(function ($query) use($q) {
              $query->where('course_level_name', 'like', '%' . $q . '%');
          });
      }

      $result = $result->paginate();

      return view ('admin.course_levels.index' )->withResult( $result )->withQuery( $q );
    }

    public function add(Request $request)
    {
        if ($request->getMethod() == 'POST') {
          
            $request->validate([
                'course_level_name' => 'required|unique:course_levels',
                'course_level_slug' => 'required|unique:course_levels'
            ]);

            try{

                $data = new CourseLevel;
                $input = $request->all();
                $data->fill($input)->save();

                return redirect()->route('admin.course-levels')->with('success', 'New Course Level Created.');

            } catch(\Exception $e){

                return redirect()->back()->with('error', $e->getMessage());

            }
        } else {
            return view('admin.course_levels.add');
        }
    }

    public function edit(CourseLevel $course_level, Request $request)
    {
        if ($request->getMethod() == 'POST') {
          $request->validate([
              'course_level_name' => 'required|unique:course_levels,course_level_name,'.$course_level->id,
              'course_level_slug' => 'required|unique:course_levels,course_level_slug,'.$course_level->id
          ]);

          try{
                $course_level->course_level_name = $request->course_level_name;
                $course_level->course_level_slug = $request->course_level_slug;
                $course_level->course_level_is_active = $request->course_level_is_active;
                $course_level->save();

                return redirect()->route('admin.course-levels')->with('success', 'Course Level Updated.');

          } catch(\Exception $e){

              return redirect()->back()->with('error', $e->getMessage());

          }
      } 
        
        return view('admin.course_levels.edit',compact('course_level'));
    }

    public function delete(CourseLevel $course_level)
    {
        try{

            //--- Check If there any posts available, If Available Then Delete it 
            if($course_level->courses->count() > 0)
            {
                foreach ($course_level->courses as $element) {
                    $element->delete();
                }
            }
            $course_level->delete();
                
            return redirect()->back()->with('success', 'Course Level Deleted.');

        } catch(\Exception $e){

            return redirect()->back()->with('error', $e->getMessage());

        }
    }

}
