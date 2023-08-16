<?php

namespace App\Http\Livewire;

use Livewire\Component;

class LessonProgress extends Component
{
    protected $listeners = ['lessonProgressUpdated' => 'render'];

    public function render()
    {   
        return view('livewire.lesson-progress');
    }
}
