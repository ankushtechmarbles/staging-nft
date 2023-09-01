<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectFeedBackRequest;
use App\Http\Requests\UpdateProjectFeedBackRequest;
use App\Models\ProjectFeedBack;

class ProjectFeedBackController extends Controller
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
     * @param  \App\Http\Requests\StoreProjectFeedBackRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProjectFeedBackRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProjectFeedBack  $projectFeedBack
     * @return \Illuminate\Http\Response
     */
    public function show(ProjectFeedBack $projectFeedBack)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProjectFeedBack  $projectFeedBack
     * @return \Illuminate\Http\Response
     */
    public function edit(ProjectFeedBack $projectFeedBack)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProjectFeedBackRequest  $request
     * @param  \App\Models\ProjectFeedBack  $projectFeedBack
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProjectFeedBackRequest $request, ProjectFeedBack $projectFeedBack)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProjectFeedBack  $projectFeedBack
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProjectFeedBack $projectFeedBack)
    {
        //
    }
}
