<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class problemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
          //ajout d'un probleme
          DB::table('hc_problem')->insert([
            'problem_ref' => '1234567890',
            'created_at' => '2021-07-27 00:00:00',
            'updated_at' => date("Y-m-d H:i:s")
        ]);

        //ajout des data du probleme
        DB::table('hc_problem_data')->insert([
            'problemData_problemId' => '1',
            'problemData_key' => 'Type',
            'problemData_column' => 'problème sur site 14'
        ]);

    }
}

      