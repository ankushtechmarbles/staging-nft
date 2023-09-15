<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CommunityScoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'usable' => $this->faker->randomFloat(2, 0, 100),
            'payment' => $this->faker->randomFloat(2, 0, 100),
            'build' => $this->faker->randomFloat(2, 0, 100),
            'invest' => $this->faker->randomFloat(2, 0, 100),
            'total_score' => $this->faker->randomFloat(2, 0, 100)
        ];
    }
}
