<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFeedBackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
                "investment_vote" => $this->faker->boolean(),
                "usable_vote" => $this->faker->boolean(),
                "help_vote" => $this->faker->boolean(),
                "payment_vote" => $this->faker->boolean(),
                "investment_amount" => $this->faker->numberBetween(1, 100000),
        ];
    }
}
