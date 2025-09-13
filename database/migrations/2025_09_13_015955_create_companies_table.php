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
        Schema::create('companies', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name', 100);
            $table->string('email');
            $table->integer('prefecture_id')->index('fx_companies_prefectures1_idx');
            $table->string('phone', 15)->nullable();
            $table->string('postcode', 7);
            $table->string('city');
            $table->string('local');
            $table->string('street_address')->nullable();
            $table->string('business_hour', 45)->nullable();
            $table->string('regular_holiday', 45)->nullable();
            $table->string('image')->nullable();
            $table->string('fax', 15)->nullable();
            $table->string('url')->nullable();
            $table->string('license_number')->nullable();
            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('companies');
    }
};
