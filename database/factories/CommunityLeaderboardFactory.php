<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CommunityLeaderboardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->text(50),
            'description' => $this->faker->text(200),
            'rules' => $this->faker->text(200),
            'prizes' => $this->faker->text(200),
            'sponsors' => $this->faker->text(200),
            'faq' => $this->faker->text(200),
            'cover_image' => $this->faker->imageUrl(640, 480, 'animals', true),
            'slug' => $this->faker->text(50),
            'status' => $this->faker->text(50),
            'type' => $this->faker->text(50),
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date(),
            'is_active' => true,
        ];
    }
}
