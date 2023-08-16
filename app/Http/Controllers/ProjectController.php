<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\MintedNfts;
use App\Models\SupportedBlockchains;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\ProjectScore;
use File;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('showcase');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
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
                'twitter'       =>  'required|string'
            ]);

            if ($validator->fails()) {
                return $this->jsonValidation($validator);
            }

            try {
                /*create folder for store all project images*/
                $file_prefix = str_slug($request->title, "-");
                $path = public_path('uploads/projects/' . $file_prefix);

                ini_set('memory_limit', '-1');
                if (!File::exists($path)) {
                    File::makeDirectory($path, 0777, true, true);
                }

                $project = new Project;
                $project->title = $request->title;
                $project->slug = str_slug($request->slug, "-");

                // cover image upload
                $project->project_folder = $file_prefix;
                if ($request->hasFile('cover_image')) {
                    $path = $request->file('cover_image')->store('projects/' . $file_prefix);
                    $project->cover_image = $path;
                }

                $project->description = $request->input('description');
                $project->problem = $request->problem;
                $project->solution = $request->solution;
                $project->utility = $request->utility;
                $project->supply = $request->supply;
                $project->owners = $request->owners;

                if (isset($request->unlockable_content) && !empty($request->unlockable_content)) {
                    $project->unlockable_content = true;
                } else {
                    $project->unlockable_content = false;
                }

                $project->track = $request->track;
                $project->items = $request->items;
                $project->collections = $request->collections;

                $array = array(
                    "ethereum" => true,
                );

                $project->supported_blockchains_id = SupportedBlockchains::create($array)->id;

                $project->discord = $request->discord;
                $project->twitter = $request->twitter;
                $project->website = $request->website;

                $project->save();

                // add project score
                $project_score = new ProjectScore();
                $project_score->project_id = $project->id;
                // default to 1 for all leaderboard scores
                $project_score->medal = 1;
                $project_score->heart = 1;
                $project_score->fire = 1;
                $project_score->money_bag = 1;
                $project_score->total_score = 1;
                $project_score->save();

                return $this->jsonSuccess(['success' => 'New project added']);
            } catch (\Exception $e) {

                return $this->jsonError($e->getMessage());
            }
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }


    public function show(Project $project)
    {
        $projectScore = ProjectScore::where('project_id', $project->id)->first();

        return view('project', ['project' => $project, 'projectScore' => $projectScore]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
