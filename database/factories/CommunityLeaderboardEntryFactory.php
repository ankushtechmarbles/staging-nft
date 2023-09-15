<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CommunityLeaderboardEntryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'community_leaderboard_id' => 1,
            'project_id' => 1,
        ];
    }
}
