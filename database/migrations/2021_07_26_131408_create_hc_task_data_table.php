<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHcTaskDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hc_task_data', function (Blueprint $table) {
            $table->bigIncrements('taskData_id');
            $table->bigInteger('taskData_taskId');
            $table->string('taskData_key');
            $table->text('taskData_column');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hc_task_data');
    }
}
