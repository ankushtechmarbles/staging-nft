<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRpmToUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('rpm_user_id')->nullable();
            $table->text('rpm_user_token')->nullable();
            $table->string('rpm_avatar_id')->nullable();
            $table->string('rpm_image_url')->nullable();
            $table->json('rpm_assets')->nullable();
            $table->string('rpm_body_type')->nullable();
            $table->string('rpm_glb_file')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('rpm_user_id');
            $table->dropColumn('rpm_user_token');
            $table->dropColumn('rpm_avatar_id');
            $table->dropColumn('rpm_image_url');
            $table->dropColumn('rpm_assets');
            $table->dropColumn('rpm_body_type');
            $table->dropColumn('rpm_glb_file');
        });
    }
}
