<?php

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMintedNftsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('minted_nfts', function (Blueprint $table) {
            $table->id();
            $table->string('glb_cid')->nullable();
            $table->string('image_cid');
            $table->string('html_cid');
            $table->string('song_cid')->nullable();
            $table->string('background_cid')->nullable();
            $table->string('animation')->nullable();
            $table->string('blockchain');
            $table->boolean('is_draft')->nullable();
            $table->decimal('price', 5, 2);
            $table->json('options');
            $table->foreignIdFor(Project::class);
            $table->foreignIdFor(User::class);
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
        Schema::dropIfExists('minted_nfts');
    }
}
