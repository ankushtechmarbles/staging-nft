<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Project;

class CreateProjectScoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Project::class); 
            $table->decimal('medal', 8, 2)->defualt('0.00');
            $table->decimal('heart', 8, 2)->defualt('0.00');
            $table->decimal('fire', 8, 2)->defualt('0.00');
            $table->decimal('money_bag', 8, 2)->defualt('0.00');
            $table->decimal('total_score', 8, 2)->defualt('0.00');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_scores');
    }
}
