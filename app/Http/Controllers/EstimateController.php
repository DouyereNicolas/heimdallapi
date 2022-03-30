<?php

namespace App\Http\Controllers;

use App\Models\EstimateModel;
use DateTime;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

use OpenApi\Annotations as OA;

class EstimateController extends Controller
{
    public function postEstimate(Request $request)
    {
       
        $estimate = ['place' => $request->place, 'budget' => $request->budget, 'firstname' => $request->firstname , 'lastname' => $request->lastname ,
        'email' => $request->email , 'phoneNumber' => $request->place , 'description' => $request->description];
		
        if ($request->email === NULL ) {
            $return = response()->json('Erreur lors de l\'execution de la requete ', 400);
        } else {
            $requete = EstimateModel::postEstimate($estimate);
            if ($requete == 0) {
                $return = response()->json('la requete na pas abouti', 400);
            } else {
                $return =  response()->json($requete, 200);
            }
        }
        return $return;
    }
}