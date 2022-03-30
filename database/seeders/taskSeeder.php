<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class taskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //ajout d'une tache sur le planning
        DB::table('hc_task')->insert([
            'task_dateStart' => '2021-08-10 17:00:00',
            'task_dateEnd' => '2021-08-10 19:00:00',
            'task_title' => 'rdv chantier test',
            'created_at' => '2021-07-21 17:00:00',
            'updated_at' => date("Y-m-d H:i:s")
        ]);

        //ajout des datas a la tache
        DB::table('hc_task_data')->insert([
            'taskData_taskId' => '1',
            'taskData_key' => 'Description',
            'taskData_column' => 'rendez vous sur le chantier test avec le client pour visu des nouveaux plan'
        ]);

        DB::table('hc_task_data')->insert([
            'taskData_taskId' => '1',
            'taskData_key' => 'site_id',
            'taskData_column' => '1'
        ]);

        //ajout d'une tache sans data
        DB::table('hc_task')->insert([
            'task_dateStart' => '2021-10-20 09:00:00',
            'task_dateEnd' => '2021-10-12 17:00:00',
            'task_title' => 'rdv fournisseur matériel',
            'created_at' => '2021-07-26 16:14:00',
            'updated_at' => date("Y-m-d H:i:s")
        ]);


        

    }
}