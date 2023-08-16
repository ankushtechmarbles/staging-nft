<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSupportedBlockchainsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('supported_blockchains', function (Blueprint $table) {
            $table->id();
            $table->boolean('ethereum')->nullable();
            $table->boolean('polygon')->nullable();
            $table->boolean('avalanche')->nullable();
            $table->boolean('fantom')->nullable();
            $table->boolean('arbitrum')->nullable();
            $table->boolean('optimism')->nullable();
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
        Schema::dropIfExists('supported_blockchains');
    }
}
