<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHcProblemData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hc_problem_data', function (Blueprint $table) {
            $table->bigIncrements("problemData_id");
            $table->integer("problemData_problemId");
            $table->string("problemData_key");
            $table->string("problemData_column");  
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hc_problem_data');
    }
}
