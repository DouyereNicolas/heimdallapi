<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use OpenApi\Annotations as OA;


class EstimateModel extends Model
{
    static function postEstimate($estimate)
    {
        $result = DB::table('hc_estimate')
            ->insertGetID($estimate);
        return $result;
    }
}
