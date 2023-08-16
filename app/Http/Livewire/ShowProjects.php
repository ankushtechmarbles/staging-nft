<?php

namespace App\Http\Livewire;

use App\Models\Project;
use Livewire\Component;

class ShowProjects extends Component
{
    public $page = 1;
    public $perPage = 4;

    public function render()
    {
        $projects = Project::paginate($this->perPage, ['*'], null, $this->page);

        return view('livewire.show-projects', [
            'projects' => $projects,
            'page' => $this->page
        ]);
    }
}
