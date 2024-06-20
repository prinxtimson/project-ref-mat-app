<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('candidate_references', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()->onDelete('cascade');
            $table->string("name");
            $table->string("email");
            $table->string("phone_number")->nullable();
            $table->timestamp("date_joined");
            $table->string("project_name");
            $table->tinyInteger("is_project_completed")->default(0);
            $table->string("project_role");
            $table->string('recruiter_name');
            $table->string('recruiter_email');
            $table->string('position');
            $table->tinyInteger('status')->default(0);
            $table->string('success_story')->nullable();
            $table->string('cv')->nullable();
            $table->string('generated_reference')->nullable();
            $table->softDeletes();
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
        Schema::dropIfExists('candidate_references');
    }
};
