<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\SupportedBlockchains;
use Illuminate\Database\Seeder;

class ProjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Project::factory()->create([
            'title' => "Humanity Rocks",
            'description' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.",
            'problem' => 'Lorem ipsum dolor sit amet.',
            'solution' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.',
            'supply' => 500,
            'unlockable_content' => false,
            'supported_blockchains_id' => SupportedBlockchains::create([
                'ethereum' => true,
                'polygon' => true,
            ])->id,
            'discord' => 'placeholder',
            'twitter' => 'placeholder',
            'website' => 'www.placeholder.com',
            'items' => 287,
            'collections' => 1576,
            'owners' => 2187,
            'track' => 1,
            'types' => 1,
            'slug' => 'humanityRocks',
        ]);;

        Project::factory()->create([
            'title' => "Save the environment",
            'description' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.",
            'problem' => 'Lorem ipsum dolor sit amet.',
            'solution' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.',
            'supported_blockchains_id' => SupportedBlockchains::create([
                'ethereum' => true,
                'polygon' => true,
            ])->id,
            'supply' => 750,
            'unlockable_content' => false,
            'items' => 0,
            'collections' => 0,
            'owners' => 0,
            'track' => 2,
            'types' => 2,
            'slug' => 'saveTheEnvironment',

        ]);

        Project::factory()->create([
            'title' => "Psychedelics",
            'description' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.",
            'problem' => 'Lorem ipsum dolor sit amet.',
            'solution' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.',
            'supported_blockchains_id' => SupportedBlockchains::create([
                'ethereum' => true,
                'polygon' => true,
            ])->id,
            'supply' => 1500,
            'unlockable_content' => true,
            'discord' => 'placeholder',
            'twitter' => 'placeholder',
            'website' => 'www.placeholder.com',
            'items' => 2500,
            'collections' => 3274,
            'owners' => 4125,
            'track' => 3,
            'types' => 3,
            'slug' => 'psychedelics',
        ]);

        Project::factory()->create([
            'title' => "Armageddon vs AmongUs",
            'description' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.",
            'problem' => 'Lorem ipsum dolor sit amet.',
            'solution' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.',
            'supported_blockchains_id' => SupportedBlockchains::create([
                'polygon' => true,
            ])->id,
            'supply' => 2500,
            'unlockable_content' => false,
            'discord' => 'placeholder',
            'twitter' => 'placeholder',
            'website' => 'www.placeholder.com',
            'items' => 1000,
            'collections' => 1154,
            'owners' => 2412,            
            'track' => 4,
            'types' => 3,
            'slug' => 'armageddon',
        ]);

        Project::factory()->create([
            'title' => "Lorem vs Ipsum",
            'description' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.",
            'problem' => 'Lorem ipsum dolor sit amet.',
            'solution' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.',
            'supported_blockchains_id' => SupportedBlockchains::create([
                'ethereum' => true,
            ])->id,
            'supply' => 2500,
            'unlockable_content' => false,
            'discord' => 'placeholder',
            'twitter' => 'placeholder',
            'website' => 'www.placeholder.com',
            'items' => 2500,
            'collections' => 3154,
            'owners' => 4000,            
            'track' => 5,
            'types' => 2,
            'slug' => 'ipsum',
        ]);

        Project::factory()->create([
            'title' => "ArmageddonUs",
            'description' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.",
            'problem' => 'Lorem ipsum dolor sit amet.',
            'solution' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.',
            'supported_blockchains_id' => SupportedBlockchains::create([
                'polygon' => true,
            ])->id,
            'supply' => 2500,
            'unlockable_content' => false,
            'discord' => 'placeholder',
            'twitter' => 'placeholder',
            'website' => 'www.placeholder.com',
            'items' => 1000,
            'collections' => 1154,
            'owners' => 2412,            
            'track' => 6,
            'types' => 1,
            'slug' => 'armageddonUs',
        ]);

        Project::factory()->create([
            'title' => "Cela Release",
            'description' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.",
            'problem' => 'Lorem ipsum dolor sit amet.',
            'solution' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.',
            'supported_blockchains_id' => SupportedBlockchains::create([
                'polygon' => true,
                'ethereum' => true
            ])->id,
            'supply' => 2500,
            'unlockable_content' => false,
            'discord' => 'placeholder',
            'twitter' => 'placeholder',
            'website' => 'www.placeholder.com',
            'items' => 5000,
            'collections' => 2422,
            'owners' => 1345,            
            'track' => 1,
            'types' => 1,
            'slug' => 'celaRelease',
        ]);

        Project::factory()->create([
            'title' => "Dolar Sit",
            'description' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.",
            'problem' => 'Lorem ipsum dolor sit amet.',
            'solution' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.',
            'supported_blockchains_id' => SupportedBlockchains::create([
                'polygon' => true,
            ])->id,
            'supply' => 2500,
            'unlockable_content' => false,
            'discord' => 'placeholder',
            'twitter' => 'placeholder',
            'website' => 'www.placeholder.com',
            'items' => 750,
            'collections' => 1054,
            'owners' => 2612,           
            'track' => 2,
            'types' => 2,
            'slug' => 'dolarSit',
        ]);
    }
}
