<?php

namespace App\Http\Livewire;

use App\Models\Project;
use Livewire\Component;

class SimilarProjects extends Component
{
    public $project;

    public function render()
    {

        $project_type_id = $this->project->project_type_id;
        $project_track_id = $this->project->project_track_id;

        // find first 5 projects with same project_type_id and project_track_id
        $similar_projects = Project::where('project_type_id', $project_type_id)
            ->where('project_track_id', $project_track_id)
            ->where('id', '!=', $this->project->id)
            ->take(5)
            ->get();

        if (count($similar_projects) < 5) {
            $similar_projects = Project::where('id', '!=', $this->project->id)
                ->inRandomOrder()
                ->take(4)
                ->get();
        }

        return view('livewire.similar-projects', ["similar_projects" => $similar_projects]);
    }
}
