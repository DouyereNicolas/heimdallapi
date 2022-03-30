<?php

namespace App\Http\Controllers;

use App\Models\UserData;
use App\Models\Users;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use OpenApi\Annotations as OA;

class UsersController extends Controller
{
    /**
     * @OA\Get(
     *     path="/users/role/{roleId}",
     *     summary="Get Users By Role",
     *     tags={"Users"},
     *     security={{ "apiAuth": {} }},
     *     @OA\Parameter(
     *          name="roleId",
     *          description="Role id",
     *          required=true,
     *          in="path"
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(
     *               @OA\Property(
     *                  property="users",
     *                  type="array",
     *                  @OA\Items(ref="#/components/schemas/UsersWithData"),
     *                  minItems=2
     *              ),
     *          ),
     *     ),
     *     @OA\Response(
     *          response="404",
     *          description="Not Found",
     *          @OA\JsonContent(ref="#/components/schemas/NotFoundResponse")
     *     ),
     *     @OA\Response(
     *          response="401",
     *          description="Unauthorized Response",
     *          @OA\JsonContent(ref="#/components/schemas/UnauthorizedResponse")
     *     )
     * )
     *
     * @param Request $request
     * @param Response $response
     * @param string $roleId
     * @return Response
     */
    public function getsByRoleAction(Request $request, Response $response, string $roleId):Response
    {
        $myUsers = Users::getUsersByRole($roleId);
        $myResponse = [];
        foreach ($myUsers as $user) {
            $myUserArray = $user->toArray();
            $myUserData = UserData::getDataByUser($user->getId());
            $myUserArray['data'] = $myUserData;
            $myResponse[] = $myUserArray;
        }
        return $this->okResponse($response, $myResponse);
    }

    /**
     * @OA\Get(
     *     path="/users",
     *     summary="Get All Users",
     *     tags={"Admin", "Users"},
     *     security={{ "apiAuth": {} }},
     *     description="Get all users and user's data",
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="users",
     *                  type="array",
     *                  @OA\Items(ref="#/components/schemas/SiteWithData"),
     *                  minItems=2
     *              )
     *          )
     *     ),
     *     @OA\Response(
     *          response="401",
     *          description="Unauthorized",
     *          @OA\JsonContent(ref="#/components/schemas/UnauthorizedResponse")
     *     )
     * )
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function getsAction(Request $request, Response $response): Response
    {
        $myUsers = Users::getUsers();
        $myUsersResponse = [];
        foreach ($myUsers as $user) {
            $myUserArray = $user->toArray();
            $myUserData = UserData::getDataByUser($user->getId());
            $myUserArray['data'] = $myUserData;
            $myUsersResponse[] = $myUserArray;
        }
        return $this->okResponse($response, $myUsersResponse);
    }

    /**
     * @OA\Get(
     *   path="/getAll",
     *   summary="return list of users",
     *   tags={"Users"},
     *   security={{ "apiAuth": {} }},
     *   @OA\Response(
     *       response=200,
     *       description="Successfull operation",
     *          @OA\JsonContent(
     *              type="array", @OA\Items(ref="#/components/schemas/Users")
     *          )
     *      )
     * )
     */

    public function getAllUsers()
    {
        return response()->json(Users::getAllUsers(), 200);
    }

	public function getAllUsersWithData() {
		/*$array=[];
		$arrayReturn = [];


		for ($i =0; $i < count($users); $i++ ) {

			array_push($dataUser,$users[$i] );
			$array = array_merge( $users[$i], $dataUser );
			array_push($arrayReturn, $array);
		}
		       */
		$users = Users::getAllUsers();
		$finalUsers = [];
		foreach ($users as $user) {
			$out = [];
			$dataUser = Users::getUsersData($user->id);
			$out = json_decode(json_encode($user), true);
			$out['Datas'] = json_decode(json_encode($dataUser), true);
			$finalUsers[] = $out;
		}

		return json_encode($finalUsers);
	}


    public function getOneUser(Request $request)
    {

        $userId = $request->id;
        if ($userId === NULL) {
            return response()->json('Invalid synthax', 400);
        }
        return response()->json(Users::getOneUser($userId), 200);
    }

	public function getOneUserWithData(Request $request) {
		$userId = $request->id;
		if ($userId === NULL) {
			return response()->json('Invalid synthax', 400);
		}

		$users = Users::getOneUser($userId);
		$finalUsers = [];
		foreach ($users as $user) {
			$out = [];
			$dataUser = Users::getUsersData($user->id);
			$out = json_decode(json_encode($user), true);
			$out['Datas'] = json_decode(json_encode($dataUser), true);
			$finalUsers = $out;
		}
		return json_encode($finalUsers);
	}




	public function getUsersByRole(Request $request) {

		$roleId = $request->role_id;
		if( $roleId  === NULL) {
			return response()->json('Invalid syntac', 400);
		}
		return response()->json(Users::getUserByRole($roleId), 200);
	}


    // public function updateOneUser(Request $request)
    // {
    //     $plainPassword = $request->password;
    //     $passwordHash = app('hash')->make($plainPassword);
    //     $user = ['id' => $request->id,'login' => $request->login, 'password' => $passwordHash, 'role_id' => $request->role_id,
    //     'created_at' => $request->created_at,'updated_at' => $request->updated_at];

    //     if ($request->id === NULL && $request->login === NULL && $request->password === NULL && $request->role_id === NULL
    //         && $request->created_at === NULL && $request->updated_at === NULL ) {
    //         $return = response()->json('Erreur lors de l\'execution de la requete ', 400);
    //     } else {
    //         $requete = Users::updateOneUser($user);
    //         if ($requete == 0) {
    //             $return = response()->json('la requete na pas abouti', 400);
    //         } else {
    //             $return =  response()->json($requete, 200);
    //         }
    //     }
    //     return $return;
    // }
    public function updateOneUser(Request $request)
    {
        $user = ['id' => $request->id,'login' => $request->login, 'role_id' => $request->role_id,'updated_at' => $request->updated_at];

        if ($request->id === NULL && $request->login === NULL && $request->password === NULL && $request->role_id === NULL
            && $request->created_at === NULL && $request->updated_at === NULL ) {
            $return = response()->json('Erreur lors de l\'execution de la requete ', 400);
        } else {
            $requete = Users::updateOneUser($user);
            if ($requete == 0) {
                $return = response()->json('la requete na pas abouti', 400);
            } else {
                $return =  response()->json($requete, 200);
            }
        }
        return $return;
    }

    public function updateOneUserPassword(Request $request)
    {
        $plainPassword = $request->password;
        $passwordHash = app('hash')->make($plainPassword);
        $user = ['id' => $request->id, 'password' => $passwordHash];

        if ($request->id === NULL && $request->login === NULL && $request->password === NULL && $request->role_id === NULL
            && $request->created_at === NULL && $request->updated_at === NULL ) {
            $return = response()->json('Erreur lors de l\'execution de la requete ', 400);
        } else {
            $requete = Users::updateOneUser($user);
            if ($requete == 0) {
                $return = response()->json('la requete na pas abouti', 400);
            } else {
                $return =  response()->json($requete, 200);
            }
        }
        return $return;
    }


    public function deleteOneUser(Request $request)
    {
        $id_user = $request->id;
        if ($id_user === NULL) {
            return response()->json('Invalid synthax', 400);
        }
        return response()->json(Users::deleteOneUser($id_user), 200);
    }

	public function getAllRole(){
		return response()->json( Users::getRole() );
	}

    //DATA











    public function getUsersData(Request $request)
    {

        $data_id = $request->userData_userId;
        return response()->json(Users::getUsersData($data_id), 200);
    }



    public function getOneUserData(Request $request)
    {

        $data_id = $request->userData_id;
        if ($data_id === NULL) {
            return response()->json('Invalid synthax', 400);
        }
        return response()->json(Users::getOneUserData($data_id), 200);
    }



    public function setUserData(Request $request)
    {

        $userData = ['userData_userId' => $request->userData_userId, 'userData_key' => $request->userData_key, 'userData_column' => $request->userData_column];
        if ($request->userData_userId === NULL && $request->userData_key === NULL && $request->userData_column === NULL ) {
            $return = response()->json('Erreur lors de l\'execution de la requete ', 400);
        } else {
            $requete = Users::setUserData($userData);
            if ($requete == 0) {
                $return = response()->json('la requete na pas abouti', 400);
            } else {
                $return =  response()->json($requete, 200);
            }
        }
        return $return;
    }



    public function updateUserData(Request $request)
    {

        $data = ['userData_id' => $request->userData_id,'userData_userId' => $request->userData_userId, 'userData_key' => $request->userData_key, 'userData_column' => $request->userData_column];;
        if ($request->userData_id === NULL && $request->userData_userId === NULL && $request->userData_key === NULL && $request->userData_column === NULL ) {
            return response()->json('Invalid synthax', 400);
        } else {
            $requete = Users::updateUserData($data);
            if ($requete == 0) {
                $return = response()->json('la requete na pas abouti', 400);
            } else {
                $return =  response()->json($requete, 200);
            }
        }
        return $return;
    }



    public function deleteUserData(Request $request)
    {
        $data_id = $request->userData_Id;
        if ($data_id === NULL) {
            return response()->json('Invalid synthax', 400);
        }
        return response()->json(Users::deleteUserData($data_id), 200);
    }
}
//
