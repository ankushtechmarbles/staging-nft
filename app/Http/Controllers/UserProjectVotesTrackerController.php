<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserProjectVotesTrackerRequest;
use App\Http\Requests\UpdateUserProjectVotesTrackerRequest;
use App\Models\UserProjectVotesTracker;

class UserProjectVotesTrackerController extends Controller
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
     * @param  \App\Http\Requests\StoreUserProjectVotesTrackerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserProjectVotesTrackerRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserProjectVotesTracker  $userProjectVotesTracker
     * @return \Illuminate\Http\Response
     */
    public function show(UserProjectVotesTracker $userProjectVotesTracker)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\UserProjectVotesTracker  $userProjectVotesTracker
     * @return \Illuminate\Http\Response
     */
    public function edit(UserProjectVotesTracker $userProjectVotesTracker)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserProjectVotesTrackerRequest  $request
     * @param  \App\Models\UserProjectVotesTracker  $userProjectVotesTracker
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserProjectVotesTrackerRequest $request, UserProjectVotesTracker $userProjectVotesTracker)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserProjectVotesTracker  $userProjectVotesTracker
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserProjectVotesTracker $userProjectVotesTracker)
    {
        //
    }
}
