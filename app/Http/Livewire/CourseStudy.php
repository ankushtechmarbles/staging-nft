<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Models\Lesson;
use \Illuminate\Session\SessionManager;

class CourseStudy extends Component
{
   public $lesson;
   public $next_lesson;

   protected $listeners = ['singleLesson', 'nextLesson'];

   public function singleLesson(SessionManager $session, Lesson $lesson)
   {
      $this->lesson = $lesson;
      $this->next_lesson = $lesson->nextLesson();

      if ($session->get('lesson_progress') != 100 ) {
         $session->put("lesson", $session->get('lesson') + 1);
         $total_lesson = $this->lesson->countLesson();
         $lesson_progress = ($session->get('lesson') * 100) / $total_lesson;
         $session->put("lesson_progress", $lesson_progress);
         $this->emit('lessonProgressUpdated');
      }
   }

   public function render()
   { 
     return view('livewire.course-study');
   }
}
