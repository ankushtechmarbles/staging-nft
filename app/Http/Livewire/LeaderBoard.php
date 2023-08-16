<?php

namespace App\Http\Livewire;

use Illuminate\Support\Collection;
use Livewire\Component;

use App\Models\Project;
use App\Models\ProjectType;
use App\Models\ProjectTrack;
use Livewire\WithPagination;

class LeaderBoard extends Component
{
    use WithPagination;

    public $categories = [];
    public $sortColumn = 'id';
    public $sortDirection = 'desc';
    public $searchColumns = [
        'title' => '',
        'project_track_name' => '',
        'project_type_name' => '',
    ];

    public function mount()
    {
        $this->categories = [];
    }

    public function sortByColumn($column)
    {
        if ($this->sortColumn == $column) {
            $this->sortDirection = $this->sortDirection == 'asc' ? 'desc' : 'asc';
        } else {
            $this->reset('sortDirection');
            $this->sortColumn = $column;
        }
    }

    public function updating($value, $name)
    {
        $this->resetPage();
    }

    public function render()
    {
        $projects = Project::select([
            'projects.id',
            'cover_image',
            'title',
            'owners',
            'items',
            'project_track_name',
            'project_type_name',
            'discord',
            'twitter',
            'slug', 
            'supported_blockchains.ethereum',
            'supported_blockchains.polygon',
            'supported_blockchains.avalanche',
            'supported_blockchains.fantom',
            'supported_blockchains.arbitrum',
            'supported_blockchains.optimism',
        ])->Join('supported_blockchains','supported_blockchains.id', '=', 'projects.supported_blockchains_id')
        ->leftJoin('project_tracks','project_tracks.id', '=', 'projects.track')
        ->leftJoin('project_types','project_types.id', '=', 'projects.types'); 

        foreach ($this->searchColumns as $column => $value) {
            if (!empty($value)) {
                if ($column == 'title') {
                    $projects->where('projects.' . $column, 'LIKE', '%' . $value . '%');
                }elseif ($column == 'project_track_name') {
                    $projects->where('project_tracks.' . $column, 'LIKE', '%' . $value . '%');
                }elseif ($column == 'project_type_name') {
                    $projects->where('project_types.' . $column, 'LIKE', '%' . $value . '%');
                }

            }
        }

        $projects->orderBy($this->sortColumn, $this->sortDirection);


        $project_types = ProjectType::orderBy('project_type_name')->get();
        $project_tracks = ProjectTrack::orderBy('project_track_name')->get();

        return view('livewire.leader-board', [
            'projects' => $projects->paginate(10),
            'project_types' => $project_types,
            'project_tracks' => $project_tracks,
        ]);
    }
}
