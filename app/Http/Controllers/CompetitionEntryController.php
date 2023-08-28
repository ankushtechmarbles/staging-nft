<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompetitionEntry;
use App\Models\Competition;
use App\Models\CompetitionEntry;
use App\Models\Project;
use Illuminate\Http\Request;

class CompetitionEntryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function topFive()
    {
        // get currently active compeition
        $active_competition = Competition::where('is_active', true)->first();

        if(!$active_competition) {
            return response()->json([
                'message' => 'There is no active competition',
            ], 403);
        }

        // get top 5 entries by highest project score
        $top_five_entries = $active_competition->entries()->orderBy('project_score', 'desc')->take(5)->get();

        // return top 5 entries as json
        return response()->json([
            'top_five_entries' => $top_five_entries,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreCompetitionEntry $request)
    {
        // check to see if there is any active competitions if there is not send back an error
        $active_competition = Competition::where('is_active', true)->first();
        if (!$active_competition) {
            return response()->json([
                'message' => 'There is no active competition',
            ], 403);
        }

        // get project by id
        $project = Project::find($request->validated()['project_id']);

        // check to see if logged in user is the owner of the project
        if ($project->user_id != auth()->user()->id) {
            return response()->json([
                'message' => 'You are not the owner of this project',
            ], 403);
        }

        // check to see if the project exists
        if (!$project) {
            return response()->json([
                'message' => 'Project does not exist',
            ], 403);
        }

        // check to see if the project is currently entered in the active competition
        if ($project->competition_id == $active_competition->id) {
            return response()->json([
                'message' => 'Project is already entered in the active competition',
            ], 403);
        }

        // create new competition entry
        $competition_entry = $active_competition->entries()->create([
            'project_id' => $project->id,
        ]);

        // return competition entry as json
        return response()->json([
            'competition_entry' => $competition_entry,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        // get competition entry and project by id
        $competition_entry = CompetitionEntry::find($id);
        $project = Project::find($competition_entry->project_id);

        // return competition entry and project as json
        return response()->json([
            'competition_entry' => $competition_entry,
            'project' => $project,
        ]);
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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        // get competition entry by id
        $competition_entry = CompetitionEntry::find($id);

        // check to make sure logged in user is owner of entry
        if ($competition_entry->project->user_id != auth()->user()->id) {
            return response()->json([
                'message' => 'You are not the owner of this entry',
            ], 403);
        }

        // delete competition entry
        $competition_entry->delete();

        // return success message
        return response()->json([
            'message' => 'Competition entry deleted successfully',
        ]);
    }
}
