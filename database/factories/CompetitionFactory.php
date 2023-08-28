<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CompetitionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->word(),
            'description' => $this->faker->paragraph(2),
            'rules' => $this->faker->paragraph(),
            'prizes' => $this->faker->paragraph(),
            'sponsors' => $this->faker->sentence(),
            'faq' => $this->faker->paragraph(),
            'cover_image' => $this->faker->imageUrl(640, 480, 'animals', true),
            'slug' => $this->faker->slug(),
            'status' => $this->faker->word(),
            'type' => $this->faker->word(),
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date(),
            'is_active' => true,
        ];
    }
}
