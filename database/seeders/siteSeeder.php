<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class siteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        

        //ajout d'un chantier
	    DB::table('hc_site')->insert([
	    	'site_numberSite' => 1,
		    'site_dateStart' => date("Y-m-d H:i:s"),
		    'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
	    ]);

        //ajout des data du chantier 
	    DB::table('hc_siteData')->insert([
	    	'siteData_siteId' =>  1,
		    'siteData_key' => 'file',
		    'siteData_column' => 'path'
	    ]);

		
    }
}