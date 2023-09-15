<?php

namespace Database\Factories;

use App\Models\SupportedBlockchains;
use App\Models\User;
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
            'title' => $this->faker->domainWord(),
            'description' => $this->faker->sentence(),
            'problem' => $this->faker->sentence(),
            'solution' => $this->faker->sentence(),
            'supported_blockchains_id' => SupportedBlockchains::create([
                'polygon' => true,
            ])->id,
            'supply' => $this->faker->numberBetween(1, 100),
            'unlockable_content' => $this->faker->boolean(),
            'discord' => $this->faker->url(),
            'twitter' => $this->faker->url(),
            'website' => $this->faker->url(),
            'items' => $this->faker->numberBetween(1, 100),
            'collections' => $this->faker->numberBetween(1, 100),
            'owners' => $this->faker->numberBetween(1, 100),
            'slug' => $this->faker->slug(),
            'members' => json_encode(["members" => [
                        [
                            "name"=> "John Doe",
                            "role" => "CEO",
                            "image_url"=> "https://via.placeholder.com/150"
                        ]
            ]]),
            'image_url' => 'ipfs://QmRfYQEfeJfzFEuzDzAYiTkmRZakyP7bgzbnyWd1ZicutZ/image.png',
            'is_public' => $this->faker->boolean(),
            'is_minted' => $this->faker->boolean(),
            'is_draft' => $this->faker->boolean(),
            'utilities' => $this->faker->paragraph(),
            "project_track_id" => $this->faker->numberBetween(1, 5),
            "project_type_id" => $this->faker->numberBetween(1, 5),
            'user_id' => User::all()->random()->id,
            "nft_id" => 0,
        ];
    }
}
