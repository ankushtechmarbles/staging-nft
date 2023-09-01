<?php

use App\Models\ClaimAgreements;
use App\Models\SupportedBlockchains;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description');
            $table->string('problem');
            $table->string('solution');
            $table->foreignIdFor(SupportedBlockchains::class);
            $table->integer('supply')->nullable();
            $table->boolean('unlockable_content');
            $table->string('discord')->nullable();
            $table->string('twitter')->nullable();
            $table->string('website')->nullable();
            $table->integer('items')->nullable();
            $table->integer('collections')->nullable();
            $table->integer('owners')->nullable();
            $table->string('slug')->unique();
            $table->string('utilities');
            $table->json('members')->nullable();
            $table->string('animation_url')->nullable();
            $table->string('image_url');
            $table->string('nft_id')->nullable()->default(null);
            $table->boolean('is_public')->default(false);
            $table->boolean('is_minted')->default(false);
            $table->boolean('is_draft')->default(true);
            $table->foreignIdFor(ClaimAgreements::class)->nullable();
            $table->foreignIdFor(User::class);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
