<?php

namespace Database\Seeders;

use App\Models\ProjectType;
use Illuminate\Database\Seeder;

class ProjectTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProjectType::Create(['project_type_name'=>'3D experience']);
        ProjectType::Create(['project_type_name'=>'AI Paint']);
        ProjectType::Create(['project_type_name'=>'Paint']);
    }
}
