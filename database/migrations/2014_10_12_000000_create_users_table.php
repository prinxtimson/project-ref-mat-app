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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('username');
            $table->string('avatar');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('device_token')->nullable();
            $table->tinyInteger('is_2fa_enable')->default(0);
            $table->tinyInteger('login_attempt')->default(0);
            $table->timestamp('account_locked_at')->nullable();
            $table->string('two_factor_token')->nullable();
            $table->datetime('two_factor_token_expiry')->nullable();
            $table->string('password');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
