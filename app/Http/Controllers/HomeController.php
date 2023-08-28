<?php

namespace App\Http\Controllers;

use App\Traits\LeaderboardTrait;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    use LeaderboardTrait;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
//    public function __construct()
//    {
//        $this->middleware('auth');
//    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $leaderboard = $this->getActiveLeaderboard();

        return view('home-new', ['leaderboard' => $leaderboard]);
    }
}
