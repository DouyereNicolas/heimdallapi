<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Login extends Model
{
    static function log($user_login,$user_password){
        $error = false;
        $isUser = DB::table('hc_user')->select('*')->where('user_login','=',$user_login)->where('user_deletedAt','=',NULL)->get();
        if($isUser == true){
            $isUserData = json_decode($isUser,true);
            $isUserData = $isUserData[0];
            if(Hash::check($user_password, $isUserData["user_password"])){
                return $isUserData;
            }else{
               return $error;
            }
        }else{
            return $error;
        }
    }

}
