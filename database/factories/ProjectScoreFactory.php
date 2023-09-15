<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\UserProjectVotesTracker;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectScoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'medal' => 1,
            'heart' => 1,
            'fire' => 1,
            'money_bag' => 1,
            'total_score' => 1,
        ];
    }
}
