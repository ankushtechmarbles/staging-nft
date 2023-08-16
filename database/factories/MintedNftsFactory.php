<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


class MintedNftsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'glb_cid' => "Qmc9DFf3W5hDLM76P8yUbiRj85421nvy196m7EpRYok4W3",
            'image_cid' => 'QmYPNXqk6Jv7YoFDDaVW3T5oDtWDTzpbaTHHLzT7AxnUii',
            'html_cid' => "Qmd1uhx7CMYPLXmCFZZNbyWSRU2rfzYkK8NfRRAqndPghX",
            'background_cid' => 'QmYPNXqk6Jv7YoFDDaVW3T5oDtWDTzpbaTHHLzT7AxnUii?filename',
            'song_cid' => 'QmNW5jT9zuMMbqtjY8pKCz37Hy2oKHxgNyUJrQw1NMhgNi',
            'blockchain' => "ethereum",
            'price' => 0.001,
            'animation' => null,
            'options' => json_encode([
                "MannequinColor" => "Yellow",
                "ShirtColoe" => "Orange"
            ]),
            'project_id' => 1,
            'user_id' => 1
        ];
    }
}
