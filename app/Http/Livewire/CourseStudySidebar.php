<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Models\Lesson;

class CourseStudySidebar extends Component
{

    public $lessons;

   // protected $listeners = ['showLesson'];

    public function showLesson(Lesson $lesson)
    {
        $this->emit('singleLesson',$lesson);
    } 

    public function mount($lessons)
    {
        $this->lessons = $lessons;
    }

    public function render()
    {   
        return view('livewire.course-study-sidebar');
    }
}
