<?php


namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\CourseCategory;

class CourseCategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }


    //*** GET Request
    public function index(Request $request)
    {
        $q = $request->input( 'q' );

      $result = CourseCategory::orderBy('course_category_name');

      if($q != ""){
          $result = $result->where(function ($query) use($q) {
              $query->where('course_category_name', 'like', '%' . $q . '%');
          });
      }

      $result = $result->paginate();

      return view ('admin.course_categories.index' )->withResult( $result )->withQuery( $q );
    }

    public function add(Request $request)
    {
        if ($request->getMethod() == 'POST') {
          
            $request->validate([
                'course_category_name' => 'required|unique:course_categories',
                'course_category_slug' => 'required|unique:course_categories'
            ]);

            try{

                $data = new CourseCategory;
                $input = $request->all();
                $data->fill($input)->save();

                return redirect()->route('admin.course-categories')->with('success', 'New Course Category Created.');

            } catch(\Exception $e){

                return redirect()->back()->with('error', $e->getMessage());

            }
        } else {
            return view('admin.course_categories.add');
        }
    }

    public function edit(CourseCategory $course_category, Request $request)
    {
        if ($request->getMethod() == 'POST') {
          $request->validate([
              'course_category_name' => 'required|unique:course_categories,course_category_name,'.$course_category->id,
              'course_category_slug' => 'required|unique:course_categories,course_category_slug,'.$course_category->id
          ]);

          try{
                $course_category->course_category_name = $request->course_category_name;
                $course_category->course_category_slug = $request->course_category_slug;
                $course_category->course_category_is_active = $request->course_category_is_active;
                $course_category->save();

                return redirect()->route('admin.course-categories')->with('success', 'Course Category updated.');

          } catch(\Exception $e){

              return redirect()->back()->with('error', $e->getMessage());

          }
      } 
        
        return view('admin.course_categories.edit',compact('course_category'));
    }

    public function delete(CourseCategory $course_category)
    {
        try{

            //--- Check If there any posts available, If Available Then Delete it 
            if($course_category->courses->count() > 0)
            {
                foreach ($course_category->courses as $element) {
                    $element->delete();
                }
            }
            $course_category->delete();
                
            return redirect()->back()->with('success', 'Course Category Deleted.');

        } catch(\Exception $e){

            return redirect()->back()->with('error', $e->getMessage());

        }
    }

}
