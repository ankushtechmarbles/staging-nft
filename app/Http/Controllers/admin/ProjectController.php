<?php


namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Models\SupportedBlockchains;
use App\Models\Project;
use App\Models\ProjectScore;
use App\Models\ProjectType;
use App\Models\ProjectTrack;
use Image;
use Storage;
use File;
use DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

class ProjectController extends Controller
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

      $result = Project::query();

      if($q != ""){
          $result = $result->where(function ($query) use($q) {
              $query->where('title', 'like', '%' . $q . '%')
                 ->orWhere('slug', 'like', '%' . $q . '%');
          });
      }

      $result = $result->orderBy($sortby,$orderby)->paginate();
      $result = $result->appends( array ('q' => $q ) );
      $result = $result->appends( array ('sorty' => $sortby ) );
      $result = $result->appends( array ('orderby' => $orderby ) );

      return view ('admin.projects.index',['result' => $result, 'q' => $q, 'sortby' => $sortby, 'orderby' => $orderby]);
      
  }    

  public function add(Request $request)
  {
      if ($request->getMethod() == 'POST') { 

        $validator = Validator::make($request->all(), $rules = [
          'title'         =>  'required|string|max:100|unique:projects',
          'slug'          =>  'required|string|max:100|unique:projects',
          'cover_image'   =>  'nullable|image|mimes:jpeg,png,jpg,gif|max:9048', 
          'description'   =>  'required',
          'problem'       =>  'required',
          'solution'      =>  'required',
          'supported_blockchains' =>  'required',
          'items'         =>  'required',
          'collections'   =>  'required',
          'owners'        =>  'required',
          'types'       =>  'required',

          'medal'         =>  'required|numeric|min:1|max:10',
          'heart'         =>  'required|numeric|min:1|max:10',
          'fire'          =>  'required|numeric|min:1|max:10',
          'money_bag'     =>  'required|numeric|min:1|max:100',

        ]);

        if ($validator->fails()) {
          return $this->jsonValidation($validator);       
        } 

        try{
          /*create folder for store all project images*/
          $file_prefix = str_slug($request->title, "-");
          $path = public_path('uploads/projects/'.$file_prefix);

          ini_set('memory_limit', '-1');
          if(!File::exists($path)) {
              File::makeDirectory($path, 0777, true, true);
          }

          $project = new Project;
          $project->title = $request->title;
          $project->slug = str_slug($request->slug, "-");

          // cover image upload
          $project->project_folder = $file_prefix;
          if ($request->hasFile('cover_image')) {
              $path = $request->file('cover_image')->store('projects/'.$file_prefix);
              $project->cover_image = $path;
          }

          $project->description = $request->input('description');
          $project->problem = $request->problem;
          $project->solution = $request->solution;
          $project->utility = $request->utility;
          $project->supply = $request->supply;
          $project->owners = $request->owners;
          $project->types = $request->types;

          if(isset($request->unlockable_content) && !empty($request->unlockable_content)) {
              $project->unlockable_content = true;
          }else{
              $project->unlockable_content = false;
          }

          $project->track = $request->track;
          $project->items = $request->items;
          $project->collections = $request->collections;

          $project->supported_blockchains_id = SupportedBlockchains::create($request->supported_blockchains)->id;

          $project->discord = $request->discord;
          $project->twitter = $request->twitter;
          $project->website = $request->website;

          $project->save();

          // add project score
          $project_score = new ProjectScore();
          $project_score->project_id = $project->id;
          $project_score->medal = $request->medal;
          $project_score->heart = $request->heart;
          $project_score->fire = $request->fire;
          $project_score->money_bag = $request->money_bag;
          $project_score->total_score = ProjectScore::findScore();
          $project_score->save();

          return $this->jsonSuccess(['success' => 'New project added']);

      } catch(\Exception $e){

        return $this->jsonError($e->getMessage()); 

      }

    }

    $chains_list = ['ethereum' => 'Ethereum ', 'polygon' => 'Polygon', 'avalanche' => 'Avalanche', 'fantom' => 'Fantom', 'arbitrum' => 'Arbitrum', 'optimism' => 'Optimism']; 

    $project_types = ProjectType::orderBy('project_type_name')->get();

    $project_tracks = ProjectTrack::orderBy('project_track_name')->get();

    return view('admin.projects.add',['chains_list' => $chains_list, 'project_types' => $project_types, 'project_tracks' => $project_tracks]);
    
  }

  public function edit(Project $project, Request $request)
  { 
      

      if ($request->getMethod() == 'POST') {

          $validator = Validator::make($request->all(), $rules = [
            'title'         =>  'required|string|max:100|unique:projects,title,'.$project->id.',id',
            'slug'          =>  'required|string|max:100|unique:projects,slug,'.$project->id.',id',
            'cover_image'   =>  'nullable|image|mimes:jpeg,png,jpg,gif|max:9048', 
            'description'  =>  'required',
            'problem'       =>  'required',
            'solution'      =>  'required',
            'supported_blockchains' =>  'required',
            'items'         =>  'required',
            'collections'   =>  'required',
            'owners'        =>  'required',
            'types'         =>  'required',

            'medal'         =>  'required|numeric|min:1|max:10',
            'heart'         =>  'required|numeric|min:1|max:10',
            'fire'          =>  'required|numeric|min:1|max:10',
            'money_bag'     =>  'required|numeric|min:1|max:100'
          ]);

          if ($validator->fails()) {
            return $this->jsonValidation($validator);       
          } 

          try{
            
            $project->title = $request->title;
            $project->slug = str_slug($request->slug, "-");

            if ($request->hasFile('cover_image')) {
                $file_prefix = $project->file_prefix;
                $path = $request->file('cover_image')->store('projects/'.$file_prefix);
                $project->cover_image = $path;
            }

            $project->description = $request->input('description');
            $project->problem = $request->problem;
            $project->solution = $request->solution;
            $project->utility = $request->utility;
            $project->supply = $request->supply;
            $project->owners = $request->owners;
            $project->types = $request->types;

            if(isset($request->unlockable_content) && !empty($request->unlockable_content)) {
                $project->unlockable_content = true;
            }else{
                $project->unlockable_content = false;
            }

            $project->track = $request->track;
            $project->items = $request->items;
            $project->collections = $request->collections;
            $project->discord = $request->discord;
            $project->twitter = $request->twitter;
            $project->website = $request->website;
            $project->save();

            //update SupportedBlockchains
            $SupportedBlockchains = SupportedBlockchains::firstOrNew(['id' => $project->supported_blockchains_id]);
            $SupportedBlockchains->ethereum = $request->supported_blockchains['ethereum'] ?? 0;
            $SupportedBlockchains->polygon = $request->supported_blockchains['polygon'] ?? 0;
            $SupportedBlockchains->avalanche = $request->supported_blockchains['avalanche'] ?? 0;
            $SupportedBlockchains->fantom = $request->supported_blockchains['fantom'] ?? 0;
            $SupportedBlockchains->arbitrum = $request->supported_blockchains['arbitrum'] ?? 0;
            $SupportedBlockchains->optimism = $request->supported_blockchains['optimism'] ?? 0;
            $SupportedBlockchains->save(); 

            // add project score
            ProjectScore::updateOrCreate( ['project_id' => $project->id],
                                          [ 
                                            'medal' => $request->medal,
                                            'heart' => $request->heart,
                                            'fire' => $request->fire,
                                            'money_bag' => $request->money_bag,
                                            'total_score' => ProjectScore::findScore(),
                                            'project_id' => $project->id,
                                          ]);

            return $this->jsonSuccess(['success' => 'Project Updated']);

          } catch(\Exception $e){

              return $this->jsonError($e->getMessage()); 

          }
      } 

      $SupportedBlockchains = SupportedBlockchains::where('id',$project->supported_blockchains_id)->first();

      $ProjectScore = ProjectScore::where('project_id',$project->id)->first();

      $chains_list = ['ethereum' => 'Ethereum ', 'polygon' => 'Polygon', 'avalanche' => 'Avalanche', 'fantom' => 'Fantom', 'arbitrum' => 'Arbitrum', 'optimism' => 'Optimism'];

      $project_types = ProjectType::orderBy('project_type_name')->get();

      $project_tracks = ProjectTrack::orderBy('project_track_name')->get();

      return view('admin.projects.edit',['project' => $project, 'SupportedBlockchains' => $SupportedBlockchains, 'ProjectScore' => $ProjectScore, 'chains_list' => $chains_list, 'project_types' => $project_types, 'project_tracks' => $project_tracks]); 
       
  } 

  public function delete(Project $project)
  {
      try{
          
          if (!empty($project->project_folder)) {
              $path = public_path('uploads/projects/'.$project->project_folder);
              if(File::exists($path)) {
                  File::deleteDirectory($path);
              }
          }

          ProjectScore::where('project_id',$project->id)->delete();

          SupportedBlockchains::where('id',$project->supported_blockchains_id)->delete();

          $project->delete();
          
          return redirect()->back()->with('success', 'Project Deleted.');

      } catch(\Exception $e){

          return redirect()->back()->with('error', $e->getMessage());

      }
  }  

  public function removeFile(Project $project, $filename, $position=0)
  {
    try{

      switch ($filename) {
        case 'cover_image':
          @Storage::delete($project->getOriginal('cover_image'));
          $project->cover_image = null;
          break;
      }

      $project->save();

      return redirect()->back()->with('success', ucfirst(str_replace('_', ' ', $filename)) .' deleted.');

    } catch(\Exception $e){

        return redirect()->back()->with('error', $e->getMessage());
    }    
  }

}