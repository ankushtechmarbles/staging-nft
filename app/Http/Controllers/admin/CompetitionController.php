<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompetitionRequest;
use App\Http\Requests\UpdateCompetitionRequest;
use App\Models\Competition;

class CompetitionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // get currently active competition (if any)
        $activeCompetition = Competition::where('is_active', true)->first();

        // get all entries for active competition
        $entries = $activeCompetition->entries()->get();

        // return compeition and entries as json
        return response()->json([
            'competition' => $activeCompetition,
            'entries' => $entries,
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
     * @param  \App\Http\Requests\StoreCompetitionRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreCompetitionRequest $request)
    {
        // check to see if there is any active competitions if there is send back error message
        if (Competition::where('is_active', true)->exists()) {
            return response()->json([
                'message' => 'There is already an active competition',
            ], 403);
        }

        // create competition
        $competition = Competition::create($request->validated());

        // return competition as json
        return response()->json([
            'competition' => $competition,
        ]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Competition  $competition
     * @return \Illuminate\Http\Response
     */
    public function show(Competition $competition)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Competition  $competition
     * @return \Illuminate\Http\Response
     */
    public function edit(Competition $competition)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCompetitionRequest  $request
     * @param  \App\Models\Competition  $competition
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateCompetitionRequest $request, Competition $competition)
    {
        // update competition
        $competition->update($request->validated());

        // return competition as json
        return response()->json([
            'competition' => $competition,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Competition  $competition
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Competition $competition)
    {
        // delete competition if it is not active

        if ($competition->is_active) {
            return response()->json([
                'message' => 'You cannot delete an active competition',
            ], 403);
        }

        $competition->delete();

        return response()->json([
            'message' => 'Competition deleted successfully',
        ]);
    }
}
