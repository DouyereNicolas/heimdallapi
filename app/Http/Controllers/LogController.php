<?php

namespace App\Http\Controllers;


use App\Models\Login;
use Tymon\JWTAuth\Contracts\JWTSubject;

use Illuminate\Support\Facades\Auth;


class LogController extends Controller implements JWTSubject
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function login()
    {
        $user_login = $_GET["user_login"];
        $user_password = $_GET["user_password"];
        $response = Login::log($user_login,$user_password);
        if($response != false){
            print_r($response);
            echo 'tout vas bien';
        }
        $token = Auth::attempt($response);
        return $this->respondWithToken($token);
    }

}
//
