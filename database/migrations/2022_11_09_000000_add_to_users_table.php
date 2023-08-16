<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('paper_token', 240)->nullable();
            $table->string('paper_wallet_address', 240)->nullable();
            $table->boolean('white_listed')->nullable();
        });
    }
}
