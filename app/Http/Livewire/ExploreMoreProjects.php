<?php

namespace App\Http\Livewire;

use App\Models\Project;
use Livewire\Component;

class ExploreMoreProjects extends Component
{
    public $page;
    public $perPage = 8;
    public $loadMore;

    public function mount($page = 1, $perPage = 1)
    {
        $this->page = $page + 1; //increment the page
        $this->perPage = $perPage;
        $this->loadMore = false; //show the button
    }

    public function loadMore()
    {
        $this->loadMore = true;
    }

    public function render()
    {
        if ($this->loadMore) {
            $projects = Project::where('is_public', true)->paginate($this->perPage, ['*'], null, $this->page);

            return view('livewire.explore-more', [
                'projects' => $projects
            ]);
        } else {
//            check how many projects are there
            $projects = Project::where('is_public', true)->paginate($this->perPage, ['*'], null, $this->page);
//            if there are more than 8 projects, show the button
            if ($projects->count() > 8) {
                $this->loadMore = true;
            }
            return view('livewire.explore-more-projects');
        }
    }
}
