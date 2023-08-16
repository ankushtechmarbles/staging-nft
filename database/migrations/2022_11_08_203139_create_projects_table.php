<?php

use App\Models\SupportedBlockchains;
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
            $table->integer('supply');
            $table->boolean('unlockable_content');
            $table->string('discord')->nullable();
            $table->string('twitter')->nullable();
            $table->string('website')->nullable();
            $table->integer('items');
            $table->integer('collections');
            $table->integer('owners');
            $table->string('slug')->unique();
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
        Schema::dropIfExists('projects');
    }
}
