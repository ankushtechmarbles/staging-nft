<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommunityLeaderboardRequest;
use App\Http\Requests\UpdateCommunityLeaderboardRequest;
use App\Models\CommunityLeaderboard;

class CommunityLeaderboardController extends Controller
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
     * @param  \App\Http\Requests\StoreCommunityLeaderboardRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCommunityLeaderboardRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CommunityLeaderboard  $communityLeaderboard
     * @return \Illuminate\Http\Response
     */
    public function show(CommunityLeaderboard $communityLeaderboard)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CommunityLeaderboard  $communityLeaderboard
     * @return \Illuminate\Http\Response
     */
    public function edit(CommunityLeaderboard $communityLeaderboard)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCommunityLeaderboardRequest  $request
     * @param  \App\Models\CommunityLeaderboard  $communityLeaderboard
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCommunityLeaderboardRequest $request, CommunityLeaderboard $communityLeaderboard)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CommunityLeaderboard  $communityLeaderboard
     * @return \Illuminate\Http\Response
     */
    public function destroy(CommunityLeaderboard $communityLeaderboard)
    {
        //
    }
}
