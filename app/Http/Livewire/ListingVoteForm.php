<?php

namespace App\Http\Livewire;

use App\Models\Project;
use App\Models\ProjectFeedBack;
use App\Models\ProjectScore;
use App\Models\User;
use App\Models\UserProjectVotesTracker;
use Livewire\Component;

class ListingVoteForm extends Component
{
    public $editting = false;
    public $project;
    public $score;
    public $rank;
    public $feasibility = 5;
    public $architecture = 5;
    public $innovative = 5;
    public $projectScore;
    public $error;
    public $success;
    public $has_voted = false;

    //    feedback vote
    public $investPositive;
    public $investNegative;
    public $wouldUse;
    public $wouldPay;
    public $wouldBuild;
    public $feedbackGiven;

    public function render()
    {
        // get all projects order by total score
        $projects = Project::with('projectScores');

        // get project by rank from $projects
        if($projects) {
            $this->rank = $projects->get()->search(function ($item) {
                return $item->id == $this->project->id;
            }) + 1;
        }

        //        check to see if user has  made a project feedback vote
        $user = $this->auth_check();

        if ($user) {
            $projectFeedback = ProjectFeedback::where('project_id', $this->project->id)->where('user_id', $user->id)->first();
            if ($projectFeedback) {
                $this->investPositive = $projectFeedback->investment_vote;
                $this->investNegative = !$projectFeedback->investment_vote;
                $this->wouldUse = $projectFeedback->usable_vote;
                $this->wouldPay = $projectFeedback->payment_vote;
                $this->wouldBuild = $projectFeedback->help_vote;
                $this->feedbackGiven = true;
            }

            $projectVoteTracker = UserProjectVotesTracker::where('project_id', $this->project->id)->where('user_id', $user->id)->first();

            if($projectVoteTracker) {
                $this->has_voted = true;
            }
        }

        return view('livewire.listing-vote-form');
    }

    public function vote($projectID) {
        try {
            $user = $this->auth_check();

            $projectScore = ProjectScore::where('project_id', $projectID)->first();
            $projectScore->medal += $this->architecture;
            $projectScore->heart += $this->feasibility;
            $projectScore->fire += $this->innovative;
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

            // update score field
            $this->score = $total_score;

//            create new tracker
            $projectVoteTracker = new UserProjectVotesTracker();
            $projectVoteTracker->project_id = $projectID;
            $projectVoteTracker->user_id = $user->id;
            $projectVoteTracker->project_score_id = $projectScore->id;
            $projectVoteTracker->save();

            $this->has_voted = true;

            if ($user->credits) {
                $user->credits = $user->credits - 1;
            } else {
                $user->credits = 9;
            }

            $user->save();

            $this->success = 'Vote successful !';
            return;
        } catch (\Throwable $th) {
            $this->error = "I'm sorry we couldn't cast your vote at this time.";
            return;
        }
    }

    public function submit_feedback($projectID)
    {
        try {
            $user = $this->auth_check();

//            check to see if user has already voted
            $projectFeedback = ProjectFeedback::where('project_id', $projectID)->where('user_id', $user->id)->first();
            if ($projectFeedback) {
                $this->error = 'You have already voted for this project!';
                return;
            }

            // create new project feedback
            $projectFeedback = new ProjectFeedback();
            $projectFeedback->project_id = $projectID;
            $projectFeedback->user_id = $user->id;
            $projectFeedback->investment_vote = $this->investPositive;
            $projectFeedback->usable_vote = $this->wouldUse;
            $projectFeedback->payment_vote = $this->wouldPay;
            $projectFeedback->help_vote = $this->wouldBuild;
            $projectFeedback->investment_amount = 1000;
            $projectFeedback->save();

            $this->success = 'Vote successful !';
            return;
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function updateFeedback($name)
    {
        $this->editting = true;
        // use switch statement to update feedback values
        switch ($name) {
            case 'investPositive':
                $this->investPositive = true;
                $this->investNegative = false;
                break;
            case 'investNegative':
                $this->investPositive = false;
                $this->investNegative = true;
                break;
            case 'wouldUse':
                $this->wouldUse = !$this->wouldUse;
                break;
            case 'wouldPay':
                $this->wouldPay = !$this->wouldPay;
                break;
            case 'wouldBuild':
                $this->wouldBuild = !$this->wouldBuild;
                break;
            default:
                break;
        }
    }

    private function auth_check(): ?User
    {
        if(!auth()->user()) {
            $this->error = 'You must be logged in to vote!';
            return null;
        }

        $user = User::where('id', auth()->user()->id)->first();

        if (!$user) {
            $this->error = 'You must be logged in to vote!';
            return null;
        }

        if ($user->credits <= 0) {
            $this->error = "I'm sorry we couldn't cast your vote at this time. You need more credits";
            return null;
        }

        return $user;
    }
}
