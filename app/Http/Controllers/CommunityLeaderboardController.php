<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommunityLeaderboardRequest;
use App\Http\Requests\UpdateCommunityLeaderboardRequest;
use App\Models\CommunityLeaderboard;

class CommunityLeaderboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // get currently active compeition and its entries
        $activeCompetition = CommunityLeaderboard::where('is_active', true)->first();

        if(!$activeCompetition) {
            return response()->json([
                'message' => 'There is no active competition',
            ], 403);
        }

        // get all entries for active competition
        $entries = $activeCompetition->entries()->get();

        // return competition and entries as json

        return response()->json([
            'competition' => $activeCompetition,
            'entries' => $entries,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CommunityLeaderboard  $communityLeaderboard
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        // get competition by id
        $competition = CommunityLeaderboard::find($id);

        if(!$competition) {
            return response()->json([
                'message' => 'Competition not found',
            ], 404);
        }

        // get all entries for competition
        $entries = $competition->entries()->get();

        // return competition and entries as json
        return response()->json([
            'competition' => $competition,
            'entries' => $entries,
        ]);
    }
}
