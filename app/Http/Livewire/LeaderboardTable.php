<?php

namespace App\Http\Livewire;

use App\Models\Project;
use Livewire\Component;

class LeaderboardTable extends Component
{

    public $projects;

    public function render()
    {
        // select top 7 projects by total score
        $projectGroup = Project::with('projectScores')->take(7)->get(
            [
                'id',
                'cover_image',
                'title',
                'owners',
                'items',
//                'project_track_name',
//                'project_type_name',
                'discord',
                'twitter',
                'slug',
            ]
        );

        $this->projects = $projectGroup;

        return view('livewire.leaderboard-table');
    }
}
