<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHcMaterialData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hc_material_data', function (Blueprint $table) {
            $table->bigIncrements("materialData_id");
            $table->integer("materialData_materialId");
            $table->string("data_key");
            $table->string("data_column");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hc_material_data');
    }
}
