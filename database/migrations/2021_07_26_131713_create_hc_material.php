<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHcMaterial extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hc_material', function (Blueprint $table) {
            $table->bigIncrements("material_id");
            $table->string("material_ref");
            $table->dateTime("created_at")->nullable();
            $table->dateTime("updated_at")->nullable();
            $table->dateTime("deleted_at")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hc_material');
    }
}
