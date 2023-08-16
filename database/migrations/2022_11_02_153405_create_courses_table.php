<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\CourseCategory;
use App\Models\CourseLevel;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignIdFor(CourseCategory::class);   
            $table->foreignIdFor(CourseLevel::class);   
            $table->string('course_title');
            $table->string('course_slug')->unique();
            $table->longText('course_description')->nullable();
            $table->string('course_cover_image')->nullable();
            $table->double('course_discount_price', 10, 2)->default(0)->nullable();
            $table->double('course_actual_price', 10, 2)->default(0)->nullable();
            $table->integer('course_view_count')->default(0)->nullable();
            $table->integer('course_subscriber_count')->default(0)->nullable();
            $table->string('course_folder')->nullable();
            $table->boolean('course_is_active')->default(false);            
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
        Schema::dropIfExists('courses');
    }
}
