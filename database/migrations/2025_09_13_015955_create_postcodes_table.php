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
        Schema::create('postcodes', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('public_body_code', 5);
            $table->string('old_postcode', 5);
            $table->string('postcode', 7)->index('idx_postcode');
            $table->string('prefecture_kana', 100)->index('idx_prefecture_kana');
            $table->string('city_kana', 100)->index('idx_city_kana');
            $table->string('local_kana', 100)->nullable()->index('idx_local_kana');
            $table->string('prefecture', 100)->index('idx_prefecture');
            $table->string('city', 100)->index('idx_city');
            $table->string('local', 100)->nullable()->index('idx_local');
            $table->boolean('indicator_1');
            $table->boolean('indicator_2');
            $table->boolean('indicator_3');
            $table->boolean('indicator_4');
            $table->boolean('indicator_5');
            $table->boolean('indicator_6');

            $table->index(['prefecture', 'city', 'local'], 'idx_prefecture_city_local');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('postcodes');
    }
};
