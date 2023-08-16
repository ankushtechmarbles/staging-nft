<?php

namespace Database\Factories;

use App\Models\SupportedBlockchains;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => "Humanity Rocks",
            'description' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.",
            'problem' => 'Lorem ipsum dolor sit amet.', // password
            'solution' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.',
            'supported_blockchains_id' => SupportedBlockchains::create([
                'ethereum' => true,
                'polygon' => true,
            ])->id,
            'supply' => 500,
            'unlockable_content' => false,
            'discord' => 'placeholder',
            'twitter' => 'placeholder',
            'website' => 'www.placeholder.com',
            'items' => 287,
            'collections' => 1576,
            'owners' => 2187,
            'slug' => 'humanityRocks1',
        ];
    }
}
