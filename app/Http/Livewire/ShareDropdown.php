<?php

namespace App\Http\Livewire;

use Livewire\Component;

class ShareDropdown extends Component
{
    public function render()
    {
        return view('livewire.share-dropdown');
    }

    public function share($type)
    {
        return $type;
    }
}
