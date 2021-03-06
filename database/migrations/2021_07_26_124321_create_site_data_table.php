<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSiteDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hc_siteData', function (Blueprint $table) {
            $table->bigIncrements('siteData_id');
            $table->integer('siteData_siteId');
            $table->longText('siteData_key');
            $table->longText('siteData_column');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hc_siteData');
    }
}
