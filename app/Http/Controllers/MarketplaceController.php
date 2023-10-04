<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectType;
use App\Models\SupportedBlockchains;
use App\Models\User;
use Illuminate\Http\Request;

class MarketplaceController extends Controller
{

    public function index()
    {


        return view('marketplace.index');
    }

    /**
     * Show an nft by id.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function show($id)
    {
        $project = Project::where('id', $id)->with('blockchains')->firstOrFail();
        $owner = User::where('id', $project->user_id)->firstOrFail();
        $project_scores = $project->projectScores->first();
        $project_feedback = $project->projectFeedBacks;
        $project_type = ProjectType::where('id', $project->project_type_id)->firstOrFail();

        // total each individual feedback vote
        $total_investment_vote = 0;
        $total_usable_vote = 0;
        $total_help_vote = 0;
        $total_payment_vote = 0;
        $total_investment_amount = 0;

        foreach ($project_feedback as $feedback) {
            $total_investment_vote += $feedback->investment_vote;
            $total_usable_vote += $feedback->usable_vote;
            $total_help_vote += $feedback->help_vote;
            $total_payment_vote += $feedback->payment_vote;
            $total_investment_amount += $feedback->investment_amount;
        }

        $project_feedback_votes = [];
        foreach ($project_feedback as $feedback) {
            $rounded_number = $this->intWithStyle($total_investment_amount);
            $project_feedback_votes = [
                 [
                    "title" => $total_investment_vote . " people",
                    "description" => "would invest in this idea ($$rounded_number)",
                    "amount" => $total_investment_vote,
                    "investment_amount" => $total_investment_amount,
                    "icon" => "users",
                ],
                 [
                    "title" => $total_usable_vote . " people",
                    "description" => "would use this",
                    "amount" => $feedback->usable_vote,
                    "icon" => "cursor",
                ],
                 [
                    "title" => $total_help_vote . " people",
                    "description" => "would pay for this",
                    "amount" => $feedback->help_vote,
                    "icon" => "money",
                ],
                 [
                    "title" => $total_payment_vote . " people",
                    "description" => "would help build this",
                    "amount" => $feedback->payment_vote,
                    "icon" => "wrench",
                ],
            ];
        }

        $members = json_decode($project->members, true)['members'];

        return view('marketplace.show', [
            "project" => $project,
            "owner" => $owner,
            "members" => $members,
            "project_votes" => $project_feedback_votes,
            "blockchains" => $project->blockchains,
            "project_type" => $project_type,
            "project_score" => $project_scores
        ]);
    }

    private function intWithStyle($n)
    {
        if ($n < 1000) return $n;
        $suffix = ['','k','M','G','T','P','E','Z','Y'];
        $power = floor(log($n, 1000));
        return round($n/(1000**$power),1,PHP_ROUND_HALF_EVEN).$suffix[$power];
    }
}
