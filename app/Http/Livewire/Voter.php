<?php

namespace App\Http\Livewire;

use App\Models\ProjectScore;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Livewire\Component;
use Illuminate\Support\Facades\Session;

class Voter extends Component
{

    public $feasibility = 5;
    public $architecture = 5;
    public $innovative = 5;
    public $project;
    public $projectScore;
    public $error;
    public $success;

    public function vote($projectID)
    {
        try {
            // user
            $user = User::where('id', auth()->user()->id)->first();

            Log::info($projectID);

            if (!$user) {
                $this->error = 'You must be logged in to vote!';
                return;
            }

            if ($user->credits <= 0) {
                $this->error = "I'm sorry we couldn't cast your vote at this time. You need more credits";
                return;
            }

            $projectScore = ProjectScore::where('project_id', $projectID)->first();
            $projectScore->medal = $this->architecture;
            $projectScore->heart = $this->feasibility;
            $projectScore->fire = $this->innovative;
            $money_bag = $projectScore->money_bag || 0;

            $total_score = ($projectScore->medal / 10 * 35 / 10) + ($projectScore->heart / 10 * 35 / 10) + ($projectScore->fire / 10 * 35 / 10);

            if ($money_bag > 0 && $money_bag <= 10) {
                $total_score + 1;
            } elseif ($money_bag > 10 && $money_bag <= 20) {
                $total_score + 2;
            } elseif ($money_bag > 20 && $money_bag <= 30) {
                $total_score + 3;
            } elseif ($money_bag > 30 && $money_bag <= 40) {
                $total_score + 4;
            } elseif ($money_bag > 40 && $money_bag <= 50) {
                $total_score + 5;
            } elseif ($money_bag > 50 && $money_bag <= 60) {
                $total_score + 6;
            } elseif ($money_bag > 60 && $money_bag <= 70) {
                $total_score + 7;
            } elseif ($money_bag > 70 && $money_bag <= 80) {
                $total_score + 8;
            } elseif ($money_bag > 80 && $money_bag <= 90) {
                $total_score + 9;
            } elseif ($money_bag > 90 && $money_bag <= 100) {
                $total_score + 10;
            }

            $projectScore->total_score = $total_score;
            $projectScore->save();

            if ($user->credits) {
                $user->credits = $user->credits - 1;
            } else {
                $user->credits = 9;
            }

            $user->save();

            $this->success = 'Vote successful !';
            return;
        } catch (\Throwable $th) {
            Log::info($th);
            $this->error = "I'm sorry we couldn't cast your vote at this time.";
            return;
        }
    }

    public function render()
    {
        return view('livewire.voter');
    }
}
