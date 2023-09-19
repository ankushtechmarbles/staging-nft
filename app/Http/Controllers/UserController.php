<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class UserController extends Controller
{
//    /**
//     * Create a new controller instance.
//     *
//     * @return void
//     */
//    public function __construct()
//    {
//        $this->middleware('auth');
//    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Support\Renderable|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function dashboard()
    {


        // get logged in user
        $user = auth()->user();

        if (!$user) {
            return redirect('/login');
        }

        //  get all projects for logged in user
        $projects = Project::where('user_id', $user->id)->get();

        // find out how many projects are minted
        $minted = Project::where('user_id', $user->id)->where('is_minted', true)->get()->count();

        // get user drafts
        $drafts = Project::where('user_id', $user->id)->where('is_draft', true)->get();

//         get amount of owned projects
         $owned_projects_count = Project::where('user_id', $user->id)->get()->count();

         // get amount of on sale projects
            $on_sale_projects_count = Project::where('user_id', $user->id)->where('is_minted', true)->where('is_public', true)->get()->count();

            // get number of drafts
            $draft_count = Project::where('user_id', $user->id)->where('is_draft', true)->get()->count();

//            total number of projects
            $total_projects_count = Project::where('user_id', $user->id)->get()->count();

        return view('dashboard.dashboard-new', [
            "projects" => $projects,
            "user" => $user,
            "live_nfts" => $minted,
            "drafts" => $drafts,
            "draft_count" => $draft_count,
            "owned_projects_count" => $owned_projects_count,
            "on_sale_projects_count" => $on_sale_projects_count,
            "total_projects_count" => $total_projects_count
        ]);
    }
}
