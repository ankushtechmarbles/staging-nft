<?php

namespace Database\Seeders;

use App\Models\CommunityLeaderboard;
use App\Models\Competition;
use App\Models\Project;
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
         Project::factory(10)->create();
         Competition::factory(1)->create();
         CommunityLeaderboard::factory(1)->create();
    }
}
