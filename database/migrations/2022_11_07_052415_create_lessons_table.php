<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Course;

class CreateLessonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Course::class); 
            $table->string('lesson_title')->nullable();
            $table->string('lesson_slug')->nullable();
            $table->longText('lesson_description')->nullable();
            $table->string('lesson_cover_image')->nullable();
            $table->integer('lesson_position')->nullable()->unsigned();
            $table->boolean('lesson_is_active')->default(false); 
            $table->string('lesson_visibility')->default('Public');
            $table->timestamp('published_at', $precision = 0);
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
        Schema::dropIfExists('lessons');
    }
}
