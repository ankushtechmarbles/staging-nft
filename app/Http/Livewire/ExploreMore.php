<?php

namespace App\Http\Livewire;

use App\Models\Project;
use Livewire\Component;

class ExploreMore extends Component
{
    public $page = 1;
    public $perPage = 8;

    public function render()
    {
        $projects = Project::where('is_public', true)->paginate($this->perPage, ['*'], null, $this->page);

        return view('livewire.explore-more', [
            'projects' => $projects,
            'page' => $this->page
        ]);
    }
}
