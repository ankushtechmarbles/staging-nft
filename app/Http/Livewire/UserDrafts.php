<?php

namespace App\Http\Livewire;

use App\Models\Project;
use Livewire\Component;

class UserDrafts extends Component
{
    public $drafts;
    public $live_nfts;
    public $edit_draft_id;
    public $is_editting;

    protected $listeners = ['cancel' => 'cancel'];

    public function render()
    {
        return view('livewire.user-drafts');
    }

    public function editDraft($projectID)
    {
        $this->edit_draft_id = $projectID;
        $this->is_editting = true;

    }

    public function cancel()
    {
        $this->is_editting = false;
    }
}
