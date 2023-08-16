<?php

namespace Database\Seeders;

use App\Models\ProjectTrack;
use Illuminate\Database\Seeder;

class ProjectTracksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProjectTrack::Create(['project_track_name'=>'Defi']);
        ProjectTrack::Create(['project_track_name'=>'DAO']);
        ProjectTrack::Create(['project_track_name'=>'Gaming']);
        ProjectTrack::Create(['project_track_name'=>'Impact']);
        ProjectTrack::Create(['project_track_name'=>'NFT']);
        ProjectTrack::Create(['project_track_name'=>'Tooling']);
    }
}
