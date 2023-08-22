<?php

use App\Models\ClaimAgreements;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('drafts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->string('problem');
            $table->string('solution');
            $table->string('utilities');
            $table->json('members');
            $table->string('animation_url')->nullable();
            $table->string('image_url');
            $table->string('blockchain');
            $table->string('nft_id')->nullable()->default(null);
            $table->boolean('is_public')->default(false);
            $table->boolean('is_minted')->default(false);
            $table->foreignIdFor(ClaimAgreements::class)->nullable();
            $table->foreignIdFor(Project::class)->nullable();
            $table->foreignIdFor(User::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drafts');
    }
};
