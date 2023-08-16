<?php

namespace App\Http\Livewire;

use App\Models\Project;
use Livewire\Component;

class ShowNfts extends Component
{
    public $page = 1;
    public $perPage = 10;
    public Project $project;

    public function render()
    {
        $nfts = $this->project->mintedNfts()->paginate($this->perPage, ["*"], null, $this->page);

        return view('livewire.show-nfts', [
            'nfts' => $nfts,
            'page' => $this->page
        ]);
    }
}
