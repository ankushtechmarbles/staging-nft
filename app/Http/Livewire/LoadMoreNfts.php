<?php

namespace App\Http\Livewire;

use App\Models\Project;
use Livewire\Component;

class LoadMoreNfts extends Component
{

    public $page;
    public $perPage;
    public $loadMore;
    public Project $project;

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
            $nfts = $this->project->mintedNfts()->paginate($this->perPage, ['*'], null, $this->page);

            return view('livewire.show-nfts', [
                'nfts' => $nfts
            ]);
        } else {
            return view('livewire.load-more-nfts');
        }
    }
}
