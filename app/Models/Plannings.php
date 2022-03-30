<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Plannings extends Model
{
    static function getPlanning()
    {
        $month = date("Y-m");
        $dateStart = $month . "-01 00:00:00";
        $dateEnd = $month . "-31 23:59:59";

        $results = DB::table('hc_task')
            ->select('*')
            ->where('task_dateStart', '>', $dateStart)
            ->where('task_dateEnd', '<', $dateEnd)
            ->where('deleted_at', NULL)
            ->get();
        return $results;
    }

    static function searchPlanning($dateStart, $dateEnd)
    {
        $results = DB::table('hc_task')
            ->select('*')
            ->where('task_dateStart', '>=', $dateStart)
            ->where('task_dateEnd', '<=', $dateEnd)
            ->where('deleted_at', NULL)
            ->get();
        return $results;
    }

    static function getAllTask(){
        $results = DB::table('hc_task')
        ->select('*')
        ->where('deleted_at', '=', NULL)
        ->get();
        return $results;
    }

    static function getTask($id_task)
    {
        
        $results = DB::table('hc_task')
        ->select('*')
        ->where('task_id', '=', $id_task)
        ->where('deleted_at', '=', NULL)
        ->get();
        return $results;
    }

    static function setTask($arrayTask)
    {
        $result = DB::table("hc_task")->insertGetId($arrayTask);
        return $result;
    }

    static function deleteTask($idTask)
    {
        $result = DB::table('hc_task')->where('task_id', '=', $idTask)->update(array(
            'deleted_at' => date("Y-m-d H:i:s"),
        ));
        return $result;
    }

    static function updateTask($arrayTask) 
    {
        $result = DB::table('hc_task')->where('task_id', '=', $arrayTask['task_id'])->update($arrayTask);
        return $result;
    }



    static function getData($data_id){
        $results = DB::table('hc_task_data')
            ->select('*')
            ->where('taskData_id', '=', $data_id)
            ->get();
          return $results;
    }

    static function getAllData($data_id){
        $results = DB::table('hc_task_data')
            ->select('*')
            ->where('taskData_taskId', '=', $data_id)
            ->get();
          return $results;
    }

    static function setData($data){
        $result = DB::table("hc_task_data")->insert($data);
        return $result;
    }

    static function updateData($arrayTask){
        $result = DB::table('hc_task_data')->where('taskData_taskId', '=', $arrayTask['taskData_taskId'])->where('taskData_id', '=', $arrayTask['taskData_id'])->update($arrayTask);
        return $result;
    }

    static function deleteData($task_id){
        $result = DB::table('hc_task_data')->where('taskData_Id','=',$task_id)->delete();
        return $result;
    }

    static function getTaskIdByUser($user){
        $results = DB::table('hc_task_data')
            ->select('*')
            ->where('taskData_key', '=', "user")
            ->where('taskData_column' , '=', $user)
            ->get();
          return $results;
    }

    static function getTaskByUser($user_id){
        $results = DB::table('hc_task')
        ->select('*')
        ->where('user_id', '=', $user_id)
        ->where('deleted_at', '=', NULL)
        ->get();
        return $results;
    }

    static function deleteDataByTask($id){
        $result = DB::table('hc_task_data')->where('taskData_TaskId','=',$id)->delete();
    }
}//ceci est un test