<?php

use App\Models\CommunityLeaderboard;
use App\Models\Project;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommunityLeaderboardEntriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('community_leaderboard_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Project::class);
            $table->foreignIdFor(CommunityLeaderboard::class);
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
        Schema::dropIfExists('community_leaderboard_entries');
    }
}
