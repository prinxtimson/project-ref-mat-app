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
        Schema::create('reference_emails', function (Blueprint $table) {
            $table->id();
            $table->string('recipient_name');
            $table->string('recipient_email');
            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending');
            $table->text('meta_data');
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
        Schema::dropIfExists('reference_emails');
    }
};
