<?php

namespace App\Http\Livewire;
use App\Http\Livewire\Field;
use Illuminate\Http\Request;
use App\Models\Quiz;
use App\Models\QuizOption;

use Livewire\Component;

class Quizzes extends Component
{
    public $quiz, $is_correct, $option_text, $quiz_id, $course, $question;

    public $updateMode = false;

    public $inputs = [];
    public $answer = [];

    protected $quizOptions;

    public $i = 1;


    public function add($i)

    {

        $i = $i + 1;

        $this->i = $i;

        array_push($this->inputs ,$i);

    }


    public function remove($i)

    {

        unset($this->inputs[$i]);

    }

    public function mount($course, $quiz = null){
        $this->course = $course;
        $this->quiz = $quiz;
        $this->question = $quiz->question ?? '';
        /*$this->quizOptions = $quiz->QuizOptions() ?? [];

        foreach ($this->quizOptions as $key => $value) {
            dd($key);
            array_push($this->inputs ,$key);
            //
        }*/
    }


    public function render(){
        //$this->quiz = Quiz::where('id', $this->course->id )->get();
        return view('livewire.quizzes',['course' => $this->course, 'quiz' => $this->quiz]);
    }


    private function resetInputFields(){
        $this->question = '';
        $this->is_correct = '';
        $this->option_text = '';
    }


    public function store()
    {
        $rules = [
                'question'      =>  'required|string',
                'answer'        =>  'array|min:2|required',
                //'answer.*.is_correct'   => 'min:1|required',
                'answer.*.option_text'  => 'array|min:2|required',
                'answer.*.option_text'  => 'required|string',
        ];

        $messages = [
            'answer.required' => 'The answer field is required',
            'answer.min' => [
                'array' => 'Min Two answer required',
            ],
            'answer.*.is_correct.min' => 'At least one checkbox is checked',
            'answer.*.is_correct.required' => 'At least one checkbox is checked',
            'answer.*.option_text.required' => 'The answer text required', 
            'answer.*.option_text.array' => 'The answer text required', 
        ];

        $validatedDate = $this->validate($rules,$messages); 

        $quiz = Quiz::create([
                'course_id'=> $this->course->id, 
                'question' => $this->question ?? '',
            ]);    

        foreach ($this->answer as $key => $value) {

            QuizOption::create([
                'quiz_id'=> $quiz->id, 
                'is_correct' => $value['is_correct'] ?? 0, 
                'option_text' => $value['option_text'] ?? '',
            ]);

        }


        $this->inputs = [];
        $this->answer = [];


        $this->resetInputFields();


        session()->flash('message', 'Quiz Created Successfully.');

    } 
}
