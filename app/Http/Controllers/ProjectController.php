<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChatgptAssistantRequest;
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
        // get all public drafts
        $projects = Project::where('is_public', true)->where('is_draft', true)->get();

        if($projects->isEmpty()) {
            return response([
                'message' => 'Drafts not found'
            ], 404);
        }

        return view('showcase', ['project' => $projects]);
    }

    public function getOwnedUserDrafts(Request $request)
    {
        // check for logged in user
        if (!$request->user()) {
            return response([
                'message' => 'Unauthorized'
            ], 401);
        }

        // get all user drafts
        $project = Project::where('user_id', $request->auth->user()->id)->where('is_draft', true)->get();

        if($project->isEmpty()) {
            return response([
                'message' => 'Drafts not found'
            ], 404);
        }

        return response($project, 200);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        // check for logged in user
        if (!$request->user()) {
            return response([
                'message' => 'Unauthorized'
            ], 401);
        }

        if ($request->getMethod() == 'POST') {

            $validator = Validator::make($request->all(), $rules = [
                'title'         =>  'required|string|max:100|unique:projects',
                'slug'          =>  'required|string|max:100|unique:projects',
                'description'   =>  'required',
                'problem'       =>  'required',
                'solution'      =>  'required',
                'track'         => 'string',
                'supported_blockchains' =>  'required',
                'utility'       =>  'string',
                'utilities'    =>  'required',
                'members'      => 'json',
                'animation_url' => 'string',
                'image_url' => 'required|string',
                'is_minted' => 'boolean',
                'is_public' => 'boolean',
                'is_draft'  => 'boolean',
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
                $project->utilities = $request->utilities;

                if (isset($request->unlockable_content) && !empty($request->unlockable_content)) {
                    $project->unlockable_content = true;
                } else {
                    $project->unlockable_content = false;
                }

                $project->track = $request->track;
                $project->items = $request->items;

                $array = array(
                    "ethereum" => true,
                );

                $project->supported_blockchains_id = SupportedBlockchains::create($array)->id;

                if($request->is_public) {
                    $project->is_public = true;
                }

                if($request->is_draft) {
                    $project->is_draft = false;
                }

                $project->user_id = $request->user()->id;

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


    /**
     * Store a newly created resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function nftDetails($id)
    {
        // get all public drafts
        $project = Project::where('id', $id)->first();

        if($project->is_draft && !$project->is_minted) {
            return response([
                'message' => 'Draft not minted'
            ], 404);
        }


        // make post request to localhost:3000 to get nft details
        $client = new \GuzzleHttp\Client();
        $res = $client->request('POST', 'http://localhost:3000/api/v1/nft/details', [
            'json' => [
                'nft_id' => $project->nft_id,
            ]
        ]);

        $nftDetails = json_decode($res->getBody(), true);

        return view('nft', ['project' => $project, 'nftDetails' => $nftDetails]);
    }


    public function show(Project $project)
    {
        $projectScore = ProjectScore::where('project_id', $project->id)->first();

        if($project->is_draft && !$project->is_public) {
            if(!auth()->user() || auth()->user()->id != $project->user_id) {
                return response([
                    'message' => 'Unauthorized'
                ], 401);
            }
        }

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
     * @return \Illuminate\Http\Response
     */
    public function makeDraftPublic(Request $request)
    {
        // validate request
        $validator = Validator::make($request->all(), $rules = [
            'id' => 'required|string',
        ]);

        // get logged in user
        $user = auth()->user();

        if (!$user) {
            return response([
                'message' => 'Unauthorized'
            ], 401);
        }

        // get project from db
        $project = Project::find($request->id);

        // check if logged in user is owner of the draft
        if($project->user_id != $user->id) {
            return response([
                'message' => 'Unauthorized'
            ], 401);
        }

        // check if project is already public, if it is hide it
        if($project->is_public) {
            $project->is_public = false;
            $project->save();
            return response([
                'message' => 'Project is now hidden'
            ], 200);
        }

        // set to draft to public
        $project->is_public = true;
        $project->save();

        return response([
            'message' => 'Project is now public'
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), $rules = [
            'id' => 'required|string',
            'name' => 'required|string',
            'description' => 'required|string',
            'problem' => 'required|string',
            'solution' => 'required|string',
            'utilities' => 'required|string',
            'members' => 'required|string',
            'animation_url' => 'required|string',
            'image_url' => 'required|string',
            'blockchain' => 'required|string',
            'is_minted' => 'boolean',
            'is_public' => 'boolean',
            'user_id' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->jsonValidation($validator);
        }

        // find drafts by id
        $draft = Project::find($validator['id']);

        if(!$draft) {
            return response([
                'message' => 'Draft not found'
            ], 404);
        }

        // check if user is owner of draft
        if(!auth()->user() || auth()->user()->id != $draft->user_id) {
            return response([
                'message' => 'Unauthorized'
            ], 401);
        }

        // update the draft
        $draft->update([
            'name' => $validator['name'],
            'description' => $validator['description'],
            'problem' => $validator['problem'],
            'solution' => $validator['solution'],
            'utilities' => $validator['utilities'],
            'members' => $validator['members'],
            'animation_url' => $validator['animation_url'],
            'image_url' => $validator['image_url'],
            'blockchain' => $validator['blockchain'],
            'is_public' => $validator['is_public'],
            'user_id' => $validator['user_id'],
        ]);

        return response($draft, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function generateMintSignature(ChatgptAssistantRequest $request)
    {
        // get logged in user
        $user = $request->user();

        if (!$user) {
            return response([
                'message' => 'Unauthorized'
            ], 401);
        }

        // get project from db
        $project = Project::find($request->project_id);

        if (!$project) {
            return response([
                'message' => 'Project not found'
            ], 404);
        }

        // create post request to localhost:3000 to generate mint signature
        $client = new \GuzzleHttp\Client();
        $res = $client->request('POST', 'http://localhost:3000/api/v1/nft/mint', [
            'json' => [
                'project_id' => $project->id,
                'user_id' => $user->id,
            ]
        ]);

        $mintResponse = json_decode($res->getBody(), true);

        if($mintResponse['success'] == false) {
            return response([
                'message' => 'Minting failed'
            ], 500);
        }

       // return mint response
        return response($mintResponse, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {

        $validator = Validator::make($request->all(), $rules = [
            'id' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->jsonValidation($validator);
        }

        // check for logged in user
        if (!$request->user()) {
            return response([
                'message' => 'Unauthorized'
            ], 401);
        }

        // find drafts by id
        $project = Project::find($validator['id']);

        // check if logged in user owns project
        if(!auth()->user() || auth()->user()->id != $project->user_id) {
            return response([
                'message' => 'Unauthorized'
            ], 401);
        }

        if(!$project) {
            return response([
                'message' => 'Draft not found'
            ], 404);
        }

        // delete the draft
        $project->delete();

        return response([
            'message' => 'Draft deleted'
        ], 200);    }
}
