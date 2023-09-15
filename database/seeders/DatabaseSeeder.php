<?php

namespace Database\Seeders;

use App\Models\CommunityLeaderboard;
use App\Models\CommunityLeaderboardEntry;
use App\Models\CommunityScore;
use App\Models\Competition;
use App\Models\Project;
use App\Models\ProjectFeedBack;
use App\Models\ProjectScore;
use App\Models\ProjectTrack;
use App\Models\ProjectType;
use App\Models\User;
use App\Models\UserProjectVotesTracker;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         User::factory(10)->create();
         Competition::factory(1)->create();
         CommunityLeaderboard::factory(1)->create();
         ProjectTrack::factory(5)->create();
         ProjectType::factory(5)->create();
         Project::factory(10)->create()->each(function ($project) {
                $scores = $project->projectScores()->save(ProjectScore::factory()->make(
                    [
                        "project_id" => $project->id,
                    ]
                ));

                $project = Project::where('id', $scores->project_id)->firstOrFail();
                $user = User::where('id', $project->user_id)->firstOrFail();

                UserProjectVotesTracker::factory()->make(
                    [
                        "user_id" => $user->id,
                        "project_id" => $scores->project_id,
                        "project_score_id" => $scores->id,
                    ]
                )->save();

                $project->projectFeedBacks()->save(ProjectFeedBack::factory()->make(
                    ["project_id" => $project->id,
                    "user_id" => User::all()->random()->id
                    ]
                ));

                $project->communityScores()->save(CommunityScore::factory()->make(
                    ["project_id" => $project->id]
                ));
                CommunityLeaderboardEntry::factory()->make(
                    ["project_id" => $project->id]
                )->save();
         });
    }
}
