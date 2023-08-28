<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommunityLeaderboardEntryRequest;
use App\Http\Requests\UpdateCommunityLeaderboardEntryRequest;
use App\Models\CommunityLeaderboard;
use App\Models\CommunityLeaderboardEntry;
use App\Models\User;
use Illuminate\Http\Request;

class CommunityLeaderboardEntryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // get currently active community leaderboard
        $communityLeaderboard = CommunityLeaderboard::where('active', true)->first();

        // get all entries from active leaderboard
        $activeEntries = $communityLeaderboard->entries;

        // return all entries as json
        return response()->json([
            'community_leaderboard_entries' => $activeEntries
        ], 200);
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
     * @param  \App\Http\Requests\StoreCommunityLeaderboardEntryRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreCommunityLeaderboardEntryRequest $request)
    {
        // get logged in user
        $user = User::where("id", auth()->user()->id);

        // get project
        $project = $request->project();

        // check that user owns project
        if (!$user->ownsProject($project)) {
            return response()->json([
                'message' => 'You do not own this project.'
            ], 403);
        }

        // get currently active community leaderboard
        $communityLeaderboard = $project->communityLeaderboards()->where('active', true)->first();

        // check that project isn't already entered in leaderboard
        if ($communityLeaderboard->entries()->where('project_id', $project->id)->exists()) {
            return response()->json([
                'message' => 'This project is already entered in the leaderboard.'
            ], 403);
        }

        // create new communityboard entry
        $communityLeaderboardEntry = new CommunityLeaderboardEntry();
        $communityLeaderboardEntry->project_id = $project->id;
        $communityLeaderboardEntry->community_leaderboard_id = $communityLeaderboard->id;

        // save entry
        $communityLeaderboardEntry->save();

        // return entry
        return response()->json([
            'message' => 'Successfully entered project in community leaderboard.',
            'community_leaderboard_entry' => $communityLeaderboardEntry
        ], 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CommunityLeaderboardEntry  $communityLeaderboardEntry
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(CommunityLeaderboardEntry $communityLeaderboardEntry)
    {
        // return entry
        return response()->json([
            'community_leaderboard_entry' => $communityLeaderboardEntry
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CommunityLeaderboardEntry  $communityLeaderboardEntry
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(CommunityLeaderboardEntry $communityLeaderboardEntry, Request $request)
    {
        // get logged in user
        $user = User::where("id", auth()->user()->id);

        if (!$user) {
            return response()->json([
                'message' => 'You must be logged in to delete a community leaderboard entry.'
            ], 403);
        }

        // check that logged in user owns project
        if ($communityLeaderboardEntry->project->user_id !== $user->id) {
            return response()->json([
                'message' => 'You do not own this project.'
            ], 403);
        }

        // delete entry
        $communityLeaderboardEntry->delete();

        // return success message
        return response()->json([
            'message' => 'Successfully deleted community leaderboard entry.'
        ], 200);
    }
}
