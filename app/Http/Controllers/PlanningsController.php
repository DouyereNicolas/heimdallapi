<?php

namespace App\Http\Controllers;

use App\Models\Plannings;
use Illuminate\Http\Request;



class PlanningsController extends Controller
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


/**
 * @OA\Get(
 *      path="/plannings",
 *     summary="Return planning of this month",
 *  tags={"Plannings"},
 *  security={{ "apiAuth": {} }},
 *      @OA\Response(
 *          response="200",
 *          description="return planning on this month",
 *              @OA\JsonContent(
 *                  @OA\Property(
*                  property="task_id",
*                  default="1",
*                  description="id de la task",
*              ),
*              @OA\Property(
*                  property="task_dateStart",
*                  default="2021-08-10 17:00:00",
*                  description="date de debut de la tache",
*              ),
*              @OA\Property(
*                  property="task_dateEnd",
*                  default="2021-08-10 19:00:00",
*                  description="date de fin de la tache",
*              ),
*              @OA\Property(
*                  property="task_title",
*                  default="rdv chantier test",
*                  description="titre de la tache",
*              ),
*              @OA\Property(
*                  property="created_at",
*                  default="2021-07-21 17:00:00",
*                  description="date de creation de la tache",
*              ),
*              @OA\Property(
*                  property="updated_at",
*                  default="2021-08-23 09:55:59",
*                  description="date de modification de la tache",
*              ),
*              @OA\Property(
*                  property="deleted_at",
*                  default="null",
*                  description="date d'archivage de la tache",
*              )
 *              )
 *          ),
 *          @OA\Response(
 *              response=401,
 *              description="Unauthorized"
 *          )
 *      )
 */
 
    public function index()
    {
        $requete = Plannings::getPlanning();
        if(count($requete) == 0){
            $return = response()->json('la requete ne renvoye rien',204);
        }else{
            $return = response()->json($requete,200);
        }
        return $return;
    }



/**
 * @OA\Get(
 *      path="/plannings/search/{dateStart}/{dateEnd}",
 *     summary="return the selected date planning",
     *  tags={"Plannings"},
     *  security={{ "apiAuth": {} }},
     *  @OA\Parameter(
     *      name="dateStart",
     *      in="path",
     *      description="start date of planning",
     *      required=true,
     *      @OA\Schema(type="string", default="2021-08-01")
     *  ),
     *  @OA\Parameter(
     *      name="dateEnd",
     *      in="path",
     *      description="end date of planning",
     *      required=true,
     *      @OA\Schema(type="string", default="2021-08-31")
     *  ),
 *      @OA\Response(
 *          response="200",
 *          description="return planning on this month",
 *          @OA\JsonContent(
 *              @OA\Property(
     *              property="task_id",
     *              default="1",
     *              description="id de la task",
     *          ),
     *          @OA\Property(
     *              property="task_dateStart",
     *              default="2021-08-10 17:00:00",
     *              description="date de debut de la tache",
     *          ),
     *          @OA\Property(
     *              property="task_dateEnd",
     *              default="2021-08-10 19:00:00",
     *              description="date de fin de la tache",
     *          ),
     *          @OA\Property(
     *              property="task_title",
     *              default="rdv chantier test",
     *              description="titre de la tache",
     *          ),
     *          @OA\Property(
     *              property="created_at",
     *              default="2021-07-21 17:00:00",
     *              description="date de creation de la tache",
     *          ),
     *          @OA\Property(
     *              property="updated_at",
     *              default="2021-08-23 09:55:59",
     *              description="date de modification de la tache",
     *          ),
     *          @OA\Property(
     *              property="deleted_at",
     *              default="null",
     *              description="date d'archivage de la tache",
     *          )
 *          )
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="Unauthorized"
 *      )
 * )
 */

    public function searchPlanning(Request $request)
    {
        $dateStart = $request->dateStart;
        $dateEnd = $request->dateEnd;
        if($dateStart === NULL || $dateEnd === NULL){
            $return = response()->json('Erreur lors de l\'execution de la requete ',400);
        }else{
            $requete = Plannings::searchPlanning($dateStart, $dateEnd);

            if(count($requete) == 0){
                $return = response()->json('la requete ne renvoye rien',204);
            }else{
                $return = response()->json($requete,200);
            }
        }
        return $return;
    }



/**
 * @OA\get(
 *      path="/plannings/tasks/search/{task_id}",
 * *    summary="return the selected tasks",
     *  tags={"Plannings Task"},
     *  security={{ "apiAuth": {} }},
     *  @OA\Parameter(
     *          name="task_id",
     *          description="task_id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
 *      @OA\Response(
 *          response=200,
 *          description="return task selected",
 *          @OA\JsonContent(
 *              @OA\Property(
     *              property="task_id",
     *              default="1",
     *              description="id de la task",
     *          ),
     *          @OA\Property(
     *              property="task_dateStart",
     *              default="2021-08-10 17:00:00",
     *              description="date de debut de la tache",
     *          ),
     *          @OA\Property(
     *              property="task_dateEnd",
     *              default="2021-08-10 19:00:00",
     *              description="date de fin de la tache",
     *          ),
     *          @OA\Property(
     *              property="task_title",
     *              default="rdv chantier test",
     *              description="titre de la tache",
     *          ),
     *          @OA\Property(
     *              property="created_at",
     *              default="2021-07-21 17:00:00",
     *              description="date de creation de la tache",
     *          ),
     *          @OA\Property(
     *              property="updated_at",
     *              default="2021-08-23 09:55:59",
     *              description="date de modification de la tache",
     *          ),
     *          @OA\Property(
     *              property="deleted_at",
     *              default="null",
     *              description="date d'archivage de la tache",
     *          )
 *          )
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="Unauthorized"
 *      )
 * )
 */
    public function getTask(Request $request)
    {
        $id_task = $request->task_id;
        
        
        if($id_task === NULL){
            $return = response()->json('Erreur lors de l\'execution de la requete ',400);
        }else{
            $requete = Plannings::getTask($id_task);
            if(count($requete) == 0){
                $return = response()->json('la requete ne renvoye rien',204);
            }else{
                $return = response()->json($requete,200);
            }
        }
        return $return;
    }

    /**
 * @OA\get(
 *      path="/plannings/tasks/",
 * *    summary="return the all tasks",
     *  tags={"Plannings Task"},
     *  security={{ "apiAuth": {} }},
 *      @OA\Response(
 *          response=200,
 *          description="return all task",
 *          @OA\JsonContent(
 *              @OA\Property(
     *              property="task_id",
     *              default="1",
     *              description="id de la task",
     *          ),
     *          @OA\Property(
     *              property="task_dateStart",
     *              default="2021-08-10 17:00:00",
     *              description="date de debut de la tache",
     *          ),
     *          @OA\Property(
     *              property="task_dateEnd",
     *              default="2021-08-10 19:00:00",
     *              description="date de fin de la tache",
     *          ),
     *          @OA\Property(
     *              property="task_title",
     *              default="rdv chantier test",
     *              description="titre de la tache",
     *          ),
     *          @OA\Property(
     *              property="created_at",
     *              default="2021-07-21 17:00:00",
     *              description="date de creation de la tache",
     *          ),
     *          @OA\Property(
     *              property="updated_at",
     *              default="2021-08-23 09:55:59",
     *              description="date de modification de la tache",
     *          ),
     *          @OA\Property(
     *              property="deleted_at",
     *              default="null",
     *              description="date d'archivage de la tache",
     *          )
 *          )
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="Unauthorized"
 *      )
 * )
 */
public function getAllTask()
{

        $requete = Plannings::getAllTask();
        if(count($requete) == 0){
            $return = response()->json('la requete ne renvoye rien',204);
        }else{
            $return = response()->json($requete,200);
        }
    return $return;
}

public function getAllTaskWithData()
{
        $returnArr = [];
        $requete = Plannings::getAllTask();
        if(count($requete) == 0){
            $return = response()->json('la requete ne renvoye rien',204);
        }else{
            foreach($requete as $resp){
                $arrData = Plannings::getAllData($resp->task_id);
                $arrTask = ["task_id"=>$resp->task_id,"task_dateStart"=>$resp->task_dateStart,
                "task_dateEnd"=>$resp->task_dateEnd,"task_title"=>$resp->task_title,
                "task_id"=>$resp->task_id,"user_id"=>$resp->user_id,
                "created_at"=>$resp->created_at,"updated_at"=>$resp->updated_at,"data"=>$arrData];
                array_push($returnArr,$arrTask);
            } 
            $return = response()->json($returnArr,200);
        }
    return $return;
}



    /**
     * @OA\Post(
     *   path="/plannings/tasks",
     *   summary="Post Task",
     *   tags={"Plannings Task"},
     * security={{ "apiAuth": {} }},
     *     @OA\RequestBody(
     *          request="tasks",
 *              description="Recuperation",
 *              required=true,
 *              @OA\JsonContent(
                * @OA\Property(
*                     property="task_dateStart",
            *          default="2021-07-30 10:00:00",
            *          description="date start of task",
            *        ),
                * @OA\Property(
*                     property="task_dateEnd",
            *          default="2021-07-30 13:00:00",
            *          description="date End of task",
            *        ),
              * @OA\Property(
*                     property="task_title",
            *          default="ceci est un titre test pour lAPI",
            *          description="date End of task",
            *        ),
           * @OA\Property(
*                     property="created_at",
            *          default="2021-07-27 14:30:00",
            *          description="date creation of task",
            *        ),
            *@OA\Property(
*                     property="updated_at",
            *          default="2021-07-27 14:30:00",
            *          description="date modification of task",
            *        ),
 *              ),
     *      ),
     *    @OA\Response(
     *        response=401,
     *        description="Credentials not valid",
     *    ),
     *    @OA\Response(
     *        response=404,
     *        description="Resource Not Found"
     *    ),
     *    @OA\Response(
     *      response=200,
     *      description="succes",
     *      content={@OA\MediaType(mediaType="string",example="true")},
     *    )
     * )
     */


    public function setTask(Request $request)
    {
        $ret = $request->getContent();
        $arrayTask = ['task_dateStart' => $request->task_dateStart,'task_dateEnd' => $request->task_dateEnd,'task_title' => $request->task_title,'user_id'=>$request->user_id,'created_at' => $request->created_at,'updated_at' => $request->updated_at];
        if($request->task_dateEnd === NULL && $request->task_title === NULL && $request->created_at === NULL && $request->updated_at === NULL && $request->user_id === NULL){
            $return = response()->json($ret,400);
        }else{
            $requete = Plannings::setTask($arrayTask);
            if($requete == 0){
                $return = response()->json('la requete na pas abouti',400);
            }else{
                $return = response()->json($requete,200);
            }
        }
        return $return;
    }

    public function setTaskForNative(Request $request)
    {
        $ret = $request->getContent();
        $ret = json_decode($ret,true);
        $arrayTask = $request->getContent();
        
            $requete = Plannings::setTask($ret);
            if($requete == 0){
                $return = response()->json('la requete na pas abouti',400);
            }else{
                $return = response()->json($requete,200);
            }
        return $return;
    }

    /**
     * @OA\Delete(
     *   path="/plannings/tasks/delete/{task_id}",
     *   summary="Delete Task",
     *   tags={"Plannings Task"},
     * security={{ "apiAuth": {} }},
     *     @OA\Parameter(
     *      name="task_id",
     *      in="query",
     *      description="Id task",
     *      required=true,
     *      @OA\Schema(type="string", default="1")
     *  ),
     *    @OA\Response(
     *        response=401,
     *        description="Credentials not valid",
     *    ),
     *    @OA\Response(
     *        response=404,
     *        description="Resource Not Found"
     *    ),
     *    @OA\Response(
     *      response=200,
     *      description="succes",
     *      content={@OA\MediaType(mediaType="string",example="1")},
     *    )
     * )
     */

    public function deleteTask(Request $request)
    {
        $dataTask = $request->task_id;
        if($dataTask === NULL){
            $return = response()->json('Erreur lors de l\'execution de la requete ',400);
        }else{

            $requete = Plannings::deleteTask($dataTask);
            if($requete == 0){
                $return = response()->json('la requete ne delete rien',204);
            }else{
                $return = response()->json($requete,200);
            }
        }
        return $return;
    }



 /**
     * @OA\Put(
     *   path="/plannings/tasks",
     *   summary="Update Task",
     *   tags={"Plannings Task"},
     * security={{ "apiAuth": {} }},
     *     @OA\RequestBody(
     *          request="tasks",
 *              description="Update Task",
 *              required=true,
 *              @OA\JsonContent(
                * @OA\Property(
*                     property="task_id",
            *          default="1",
            *          description="id de la task",
            *        ),
                * @OA\Property(
*                     property="task_dateStart",
            *          default="2021-07-30 10:00:00",
            *          description="date Start of task",
            *        ),
              * @OA\Property(
*                     property="task_dateEnd",
            *          default="2021-07-30 13:00:00",
            *          description="date End of task",
            *        ),
           * @OA\Property(
*                     property="task_title",
            *          default="ceci est un titre test updated10",
            *          description="Title of task",
            *        ),
            *@OA\Property(
*                     property="updated_at",
            *          default="2021-07-29 14:18:00",
            *          description="date modification of task",
            *        ),
 *              ),
     *      ),
     *    @OA\Response(
     *        response=401,
     *        description="Credentials not valid",
     *    ),
     *    @OA\Response(
     *        response=404,
     *        description="Resource Not Found"
     *    ),
     *    @OA\Response(
     *      response=200,
     *      description="succes",
     *      content={@OA\MediaType(mediaType="string",example="1")},
     *    )
     * )
     */




    public function updateTask(Request $request)
    {
        $arrayTask = $request->getContent();
        $arrayTask = json_decode($arrayTask, true);
        if($arrayTask["task_id"] == null){
            $return = response()->json('Erreur lors de l\'execution de la requete ',400);
        }else{
            $requete = Plannings::updateTask($arrayTask);
            if($requete == 0){
                $return = response()->json('Erreur de traitement',400);
            }else{
                $return = response()->json($requete,200);
            }
        }
        return $return;
    }


/**
 * @OA\get(
 *      path="/plannings/tasks/data/{taskData_taskId}",
 * *    summary="return all data for task selected",
     *  tags={"Planning Task Data"},
     *  security={{ "apiAuth": {} }},
     *  @OA\Parameter(
     *      name="taskData_taskId",
     *      in="query",
     *      description="id of task",
     *      required=true,
     *      @OA\Schema(type="string", default="1")
     *  ),
     *
 *      @OA\Response(
 *          response=200,
 *          description="return all data for task selected",
 *          @OA\JsonContent(
 *              @OA\Property(
     *              property="taskData_Id",
     *              default="1",
     *              description="id de la data de la task",
     *          ),
     *          @OA\Property(
     *              property="taskData_taskId",
     *              default="1",
     *              description="id de la task",
     *          ),
     *          @OA\Property(
     *              property="taskData_key",
     *              default="Description",
     *              description="nom de la data",
     *          ),
     *          @OA\Property(
     *              property="taskData_column",
     *              default="rdv chantier avec client pour devis",
     *              description="contenu de la data",
     *          ),
 *          )
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="Unauthorized"
 *      )
 * )
 */



    public function getAllData(Request $request){
        $data_id = $request->taskData_taskId;
        if($data_id === NULL){
            $return = response()->json('Erreur lors de l\'execution de la requete ',400);
        }else{
            $requete = Plannings::getAllData($data_id);
            if(count($requete) == 0){
                $return = response()->json('la requete ne renvoye rien',204);
            }else{
                $return = response()->json($requete,200);
            }
        }
        return $return;
    }

    
 /**
 * @OA\get(
 *      path="/plannings/tasks/data/search/{taskData_Id}",
 * *    summary="return data for task selected",
     *  tags={"Planning Task Data"},
     *  security={{ "apiAuth": {} }},
     *  @OA\Parameter(
     *      name="taskData_Id",
     *      in="query",
     *      description="id of task",
     *      required=true,
     *      @OA\Schema(type="string", default="1")
     *  ),
     *
 *      @OA\Response(
 *          response=200,
 *          description="return data selected",
 *          @OA\JsonContent(
 *              @OA\Property(
     *              property="taskData_Id",
     *              default="1",
     *              description="id de la data de la task",
     *          ),
     *          @OA\Property(
     *              property="taskData_taskId",
     *              default="1",
     *              description="id de la task",
     *          ),
     *          @OA\Property(
     *              property="taskData_key",
     *              default="Description",
     *              description="nom de la data",
     *          ),
     *          @OA\Property(
     *              property="taskData_column",
     *              default="rdv chantier avec client pour devis",
     *              description="contenu de la data",
     *          ),
 *          )
 *      ),
 *      @OA\Response(
 *          response=401,
 *          description="Unauthorized"
 *      )
 * )
 */

    public function getData(Request $request){
        $data_id = $request->taskData_Id;
        
        if($data_id === NULL){
            $return = response()->json('Erreur lors de l\'execution de la requete ',400);
        }else{
            $requete = Plannings::getData($data_id);
            if(count($requete) == 0){
                $return = response()->json('la requete ne renvoye rien',204);
            }else{
                $return = response()->json($requete,200);
            }
        }
        return $return;
    }


    /**
     * @OA\Post(
     *   path="/plannings/tasks/data",
     *   summary="Post data ",
     *   tags={"Planning Task Data"},
     * security={{ "apiAuth": {} }},
     *     @OA\RequestBody(
     *          request="data",
 *              description="Recuperation",
 *              required=true,
 *              @OA\JsonContent(
                * @OA\Property(
*                     property="taskData_taskId",
            *          default="1",
            *          description="Id of task linked",
            *        ),
                * @OA\Property(
*                     property="taskData_key",
            *          default="Description",
            *          description="Name of data",
            *        ),
              * @OA\Property(
*                     property="taskData_column",
            *          default="nouvelle description pour la data",
            *          description="value of data",
            *        ),
 *              ),
     *      ),
     *    @OA\Response(
     *        response=401,
     *        description="Credentials not valid",
     *    ),
     *    @OA\Response(
     *        response=404,
     *        description="Resource Not Found"
     *    ),
     *    @OA\Response(
     *      response=200,
     *      description="succes",
     *      content={@OA\MediaType(mediaType="string",example="true")},
     *    )
     * )
     */

    public function setData(Request $request){
        $arrayTask = ['taskData_taskId' =>$request->taskData_taskId,'taskData_key' => $request->taskData_key,'taskData_column' => $request->taskData_column];
        if($request->taskData_taskId === NULL && $request->taskData_key === NULL && $request->taskData_column === NULL){
            $return = response()->json('Erreur lors de l\'execution de la requete ',400);
        }else{
            $requete = Plannings::setData($arrayTask);
            if($requete == 0){
                $return = response()->json('Erreur lors de l\'execution de la requete ',400);
            }else{
                $return = response()->json($requete,200);
            }
        }
        return $return;
    }

    public function setTaskDataForNative(Request $request){
        $arrayTask = $request->getContent();
        $arrayTask = json_decode($arrayTask,true);
            $requete = Plannings::setData($arrayTask);
            if($requete == 0){
                $return = response()->json('Erreur lors de l\'execution de la requete ',400);
            }else{
                $return = response()->json($requete,200);
            }
        
        return $return;
    }

    /**
     * @OA\Put(
     *   path="/plannings/tasks/data",
     *   summary="Update data",
     *   tags={"Planning Task Data"},
     * security={{ "apiAuth": {} }},
     *     @OA\RequestBody(
     *          request="data",
 *              description="Update data",
 *              required=true,
 *              @OA\JsonContent(
                * @OA\Property(
*                     property="taskData_Id",
            *          default="1",
            *          description="id de la data",
            *        ),
                * @OA\Property(
*                     property="taskData_taskId",
            *          default="1",
            *          description="id de la task linked",
            *        ),
              * @OA\Property(
*                     property="taskData_key",
            *          default="Description",
            *          description="nom de la data",
            *        ),
           * @OA\Property(
*                     property="taskData_column",
            *          default="nouvelle description pour la data",
            *          description="value of data",
            *        ),
 *              ),
     *      ),
     *    @OA\Response(
     *        response=401,
     *        description="Credentials not valid",
     *    ),
     *    @OA\Response(
     *        response=404,
     *        description="Resource Not Found"
     *    ),
     *    @OA\Response(
     *      response=200,
     *      description="succes",
     *      content={@OA\MediaType(mediaType="string",example="1")},
     *    )
     * )
     */

    public function updateData(Request $request){
        $arrayTask = $request->getContent();
        $arrayTask = json_decode($arrayTask, true);        
        if($arrayTask["taskData_id"] === NULL || $arrayTask["taskData_taskId"] === NULL){
            $return = response()->json('Erreur lors de l\'execution de la requete ',400);
        }else{
            $requete = Plannings::updateData($arrayTask);
            if($requete == 0){
                $return = response()->json('la requete ne renvoye rien',204);
            }else{
                $return = response()->json($requete,200);
            }
        }
        return $return;
    }

    /**
     * @OA\Delete(
     *   path="/plannings/tasks/data/{taskData_Id}",
     *   summary="Delete data",
     *   tags={"Planning Task Data"},
     * security={{ "apiAuth": {} }},
     *     @OA\Parameter(
     *      name="taskData_Id",
     *      in="query",
     *      description="Id task Data",
     *      required=true,
     *      @OA\Schema(type="string", default="1")
     *  ),
     *    @OA\Response(
     *        response=401,
     *        description="Credentials not valid",
     *    ),
     *    @OA\Response(
     *        response=404,
     *        description="Resource Not Found"
     *    ),
     *    @OA\Response(
     *      response=200,
     *      description="succes",
     *      content={@OA\MediaType(mediaType="string",example="1")},
     *    )
     * )
     */

    public function deleteData(Request $request){
        $task_id = $request->taskData_Id;
        if($task_id === NULL){
            $return = response()->json('Erreur lors de l\'execution de la requete ',400);
        }else{
            $requete = Plannings::deleteData($task_id);
            if($requete == 0){
                $return = response()->json('Erreur lors de l\'execution de la requete ',400);
            }else{
                $return = response()->json($requete,200);
            }
        }
        return $return;
    }

    public function deleteDataByTask(Request $request){
        $task_id = $request->taskData_TaskId;
        if($task_id === NULL){
            $return = response()->json('Erreur lors de l\'execution de la requete de task data',400);
        }else{
            $requete = Plannings::deleteDataByTask($task_id);
            if($requete == 0){
                $return = response()->json('Erreur lors de l\'execution de la requete ',400);
            }else{
                $return = response()->json($requete,200);
            }
        }
        return $return;
    }



public function getDataUser(Request $request){
        $user = $request->user;
        
        if($user === NULL){
            $return = response()->json('Erreur lors de l\'execution de la requete ',400);
        }else{
            $requete = Plannings::getTaskIdByUser($user);
            if(count($requete) == 0){
                $return = response()->json('la requete ne renvoye rien',204);
            }else{
                $return = response()->json($requete,200);
            }
        }
        return $return;
    }

    public function getTaskByUser(Request $request){
        $user_id = $request->user_id;
        if($user_id === NULL){
            $return = response()->json('Erreur lors de l\'execution de la requete ',400);
        }else{
            $requete = Plannings::getTaskByUser($user_id);
            if(count($requete) == 0){
                $return = response()->json('la requete ne renvoye rien',204);
            }else{
                $return = response()->json($requete,200);
            }
        }
        return $return;
    }
}