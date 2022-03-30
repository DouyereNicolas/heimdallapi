<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class userSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        //ajout des rôles
        DB::table('hc_role')->insert(['hc_role_name' => 'customer']);
        DB::table('hc_role')->insert(['hc_role_name' => 'employee']);
        DB::table('hc_role')->insert(['hc_role_name' => 'director']);
        DB::table('hc_role')->insert(['hc_role_name' => 'site manager']);
        //ajout d'un utilisateur (admin)
        DB::table('users')->insert([
            'login' => 'Heimdall',
            'password' => Hash::make('HC1234'),
            'role_id'=> 3,
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ]);

        //ajout d'une data a l'utilisateur
        DB::table('hc_user_data')->insert([
            'userData_userId' => 1,
            'userData_key' => 'prénom',
            'userData_column' => 'master',
        ]);

    }
}