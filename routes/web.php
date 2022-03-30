<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


/*
|--------------------------------------------------------------------------
| Groupe des routes public avec le prefix /api/v1
|--------------------------------------------------------------------------
*/

$router->group(['prefix' => '/api/v1'], function () use ($router) {
    $router->post('register', 'AuthController@register');
    $router->post('login', 'AuthController@login');
    $router->get('/reactProblems', 'ProblemsController@showAllProblems');
    $router->get('/reactMaterials', 'MaterialsController@showAllMaterials');
    $router->get('/reactSites', 'SitesController@showAllSite');
    $router->get('/reactUsers', 'UsersController@getAllUsers');
    $router->get('/reactPlannings', 'PlanningsController@index');
    $router->get('/reactTasks', 'PlanningsController@getAllTask');
    $router->group(['prefix' => 'estimate'], function () use ($router) {
        $router->post('/post', 'EstimateController@postEstimate');
    });
});


// a changer par la page d'accueil de l'API
$router->get('/', function () use ($router) {
    echo "<h1>Bienvenue sur l'API Heimdall voici le lien de la doc de l'api</h1>";
});


/*
|-----------------------------------------------------------------------------
| Groupe des routes privée avec le prefix /api/v1 passant par le middleware
|----------------------------------------------------------------------- ------
*/

$router->group(['prefix' => '/api/v1/', 'middleware' => 'auth'], function () use ($router) {

    $router->group(['prefix' => '/tickets'], function () use ($router) {
        $router->get('/{ticketId}', 'TicketsController@getAction');
        $router->get('', 'TicketsController@getsAction');
        $router->post('', 'TicketsController@postAction');
        $router->put('/update', 'TicketsController@putAction');
        $router->delete('/delete/{ticketId}', 'TicketsController@deleteAction');

        $router->group(['prefix' => '/data'], function () use ($router) {
            $router->get('/all', 'TicketsDataController@getsAction');
            $router->get('/{dataId}', 'TicketsDataController@getAction');
            $router->get('/ticket/{ticketId}', 'TicketsDataController@getsByTicketAction');
            $router->post('', 'TicketsDataController@postAction');
            $router->put('/update', 'TicketsDataController@putAction');
            $router->delete('/delete/{dataId}', 'TicketsDataController@deleteAction');
        });
    });

    $router->group(['prefix' => 'problem'], function () use ($router) {

        $router->get('/getAll', 'ProblemsController@showAllProblems');

        $router->get('/get/{problem_id}', 'ProblemsController@showOneProblem');

        $router->post('/post', 'ProblemsController@postOneProblem');

        $router->put('/put', 'ProblemsController@updateOneProblem');

        $router->delete('/delete/{problem_id}', 'ProblemsController@deleteOneProblem');

        $router->group(['prefix' => 'data'], function () use ($router) {

            $router->get('/getAll/{problemData_problemId}', 'ProblemsController@showAllProblemsData');

            $router->get('/get/{problemData_id}', 'ProblemsController@showAllDataForOneProblem');

            $router->get('/getBySite/{problemData_id}', 'ProblemsController@showAllDataForOneProblemBySite');

            $router->post('/post', 'ProblemsController@postOneProblemData');

            $router->put('/put', 'ProblemsController@updateOneProblemData');

            $router->delete('/delete/{problemData_id}', 'ProblemsController@deleteOneProblemData');
        });
    });
    $router->group(['prefix' => 'plannings'], function () use ($router) {

        /*
    |-----------------------------------------------------------------------------
    | Groupe des routes privée avec le prefix planning
    |-----------------------------------------------------------------------------
    */

        $router->get('/', 'PlanningsController@getAllTask');

        $router->get('/search/{dateStart}/{dateEnd}', 'PlanningsController@searchPlanning');

        $router->get('/searchAllTask', 'PlanningsController@getAllTaskWithData');

        $router->post('/nativeTask', 'PlanningsController@setTaskForNative');

        $router->post('/nativeData', 'PlanningsController@setTaskDataForNative');

        /*
        |-----------------------------------------------------------------------------
        | Groupe des routes privée avec le prefix planning
        |-----------------------------------------------------------------------------
        */

        $router->group(['prefix' => 'tasks'], function () use ($router) {

            $router->get('/search/{task_id}', 'PlanningsController@getTask');

            $router->get('/', 'PlanningsController@getAllTask');

            $router->get('/taskByUser/{user_id}', 'PlanningsController@getTaskByUser');


            $router->post('/', 'PlanningsController@setTask');


            $router->put('/', 'PlanningsController@updateTask');

            $router->delete('/delete/{task_id}', 'PlanningsController@deleteTask');


            /*
                |-----------------------------------------------------------------------------
                | Groupe des routes privée avec le prefix data
                |-----------------------------------------------------------------------------
                */

            $router->group(['prefix' => 'data'], function () use ($router) {

                $router->get('/search/{taskData_Id}', 'PlanningsController@getData');

                $router->get('/user/{user}', 'PlanningsController@getDataUser');

                $router->get('/{taskData_taskId}', 'PlanningsController@getAllData');

                $router->post('/', 'PlanningsController@setData');

                $router->put('/', 'PlanningsController@updateData');

                $router->delete('/delByTaskId/{taskData_TaskId}', 'PlanningsController@deleteDataByTask');

                $router->delete('/del/{taskData_Id}', 'PlanningsController@deleteData');


            });
        });
    });


    $router->group(['prefix' => 'users'], function () use ($router) {
        $router->get('/role/{roleId}', 'UsersController@getsByRoleAction');
        $router->get('', 'UsersController@getsAction');

        $router->get('/getAll', 'UsersController@getAllUsers');

        $router->get('/get/{id}', 'UsersController@getOneUser');

        $router->get('/getByRole/{role_id}', 'UsersController@getUsersByRole');

        $router->get('/getAllRole', 'UsersController@getAllRole');

        $router->get('/getFullUsers', 'UsersController@getAllUsersWithData');

        $router->get('/getOneUserWithData/{id}', 'UsersController@getOneUserWithData');

        $router->post('/post', 'UsersController@postOneUser');

        $router->put('/put', 'UsersController@updateOneUser');
        $router->put('/password/put', 'UsersController@updateOneUserPassword');

        $router->delete('/delete/{id}', 'UsersController@deleteOneUser');

        $router->group(['prefix' => 'data'], function () use ($router) {

            $router->get('/{userData_userId}', 'UsersController@getUsersData');

            $router->get('/search/{userData_id}', 'UsersController@getOneUserData');

            $router->post('/post', 'UsersController@setUserData');

            $router->put('/put', 'UsersController@updateUserData');

            $router->delete('/{userData_Id}', 'UsersController@deleteUserData');
        });
    });
    $router->group(['prefix' => '/sites'], function () use ($router) {

        $router->get('', 'SitesController@getsAction');

        $router->get('/search/{siteId}', 'SitesController@getAction');

        $router->get('/detail/{site_Id}', 'SitesController@showFullSiteById');

        $router->get('/user/{userId}', 'SitesController@getsByUserAction');

        $router->post('', 'SitesController@postAction');

        $router->put('/update', 'SitesController@putAction');

        $router->delete('/delete/{siteId}', 'SitesController@deleteAction');

        $router->group(['prefix' => 'data'], function () use ($router) {
            $router->get('/all', 'SitesDataController@getsAction');
            $router->get('/{dataId}', 'SitesDataController@getAction');
            $router->post('', 'SitesDataController@postAction');
            $router->put('/update', 'SitesDataController@putAction');
            $router->delete('/delete/{dataId}', 'SitesDataController@deleteAction');
        });
    });

    $router->group(['prefix' => '/materials'], function () use ($router) {

        $router->get('', 'MaterialsController@getsAction');
        $router->get('/search/{materialId}', 'MaterialsController@getAction');
        $router->post('', 'MaterialsController@postAction');
        $router->put('/update', 'MaterialsController@putAction');
        $router->delete('/delete/{materialId}', 'MaterialsController@deleteAction');

        $router->group(['prefix' => '/data'], function () use ($router) {
            $router->get('/all', 'MaterialsDataController@getsAction');
            $router->get('/{dataId}', 'MaterialsDataController@getAction');
            $router->get('/material/{materialId}', 'MaterialsDataController@getsByMaterialAction');
            $router->post('', 'MaterialsDataController@postAction');
            $router->put('/update', "MaterialsDataController@putAction");
            $router->delete('/delete/{dataId}', 'MaterialsDataController@deleteAction');
        });
        $router->group(['prefix' => '/category'], function () use ($router) {
            $router->get('/getAll', 'MaterialsController@showAllMaterialsCategory');
        });
    });
});
