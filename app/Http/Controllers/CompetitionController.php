<?php

namespace App\Http\Controllers;

use App\Models\Competition;
use App\Traits\LeaderboardTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CompetitionController extends Controller
{
    use LeaderboardTrait;

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        return $this->getActiveLeaderboard();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function show($id)
    {
        return $this->getLeaderboardById($id);
    }
}
