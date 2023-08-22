<?php

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
        Schema::create('claim_agreements', function (Blueprint $table) {
            $table->id();
            $table->string('owner_id');
            $table->string('claimer_id');
            $table->string('draft_id');
            $table->string('project_id');
            $table->string('nft_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('claim_agreements');
    }
};
