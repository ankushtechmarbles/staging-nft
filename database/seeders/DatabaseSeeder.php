<?php

namespace Database\Seeders;

use App\Models\CommunityLeaderboard;
use App\Models\Competition;
use App\Models\Project;
use App\Models\ProjectFeedBack;
use App\Models\ProjectScore;
use App\Models\ProjectTrack;
use App\Models\ProjectType;
use App\Models\User;
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
         ProjectTrack::factory(5)->create();
         ProjectType::factory(5)->create();
         Project::factory(10)->create()->each(function ($project) {
                $project->projectScores()->save(ProjectScore::factory()->make(
                    ["project_id" => $project->id]
                ));

                $project->projectFeedBacks()->save(ProjectFeedBack::factory()->make(
                    ["project_id" => $project->id]
                ));
         });
         Competition::factory(1)->create();
         CommunityLeaderboard::factory(1)->create();
    }
}
