<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class materialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //ajout ligne table Materiel
        DB::table('hc_material')->insert([
            'material_ref' => Str::random(10),
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ]);

        //ajout ligne table MaterielData
        DB::table('hc_material_data')->insert([
            'materialData_materialId' => 1,
            'data_key' => "category",
            'data_column' => "pelle",
        ]);

        //ajout ligne table MaterielCategory
        DB::table('hc_material_category')->insert(['materialCategory_name' => "pelle",]);
        DB::table('hc_material_category')->insert(['materialCategory_name' => "Hache",]);
        DB::table('hc_material_category')->insert(['materialCategory_name' => "Pioche",]);
        DB::table('hc_material_category')->insert(['materialCategory_name' => "Marteau-Piqueur MG3",]);
    }
}