<?php

namespace App\Http\Livewire;

use Livewire\Component;

class RegisterForm extends Component
{
    public $currentStep = 1;

    // form fields
    public $name = '';
    public $email = '';
    public $masculine = false;
    public $feminine = false;
    public $notSpecified = false;

    public function render()
    {
        return view('livewire.register-form');
    }


}
