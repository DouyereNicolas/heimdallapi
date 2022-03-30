<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;
use  App\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

/**
 * @OA\Schema(
 *      schema="LoginRequest",
 *      required={"login", "password"},
 *      @OA\Property(
 *          property="login",
 *          type="string",
 *          default="test1",
 *          description="Login of the user"
 *      ),
 *      @OA\Property(
 *          property="password",
 *          type="string",
 *          default="test1",
 *          description="Password of the user"
 *      )
 * )
 */
/**
 * @OA\RequestBody(
 *      request="Login",
 *      description="Login body",
 *      @OA\MediaType(
 *          mediaType="application/json",
 *          @OA\Schema(ref="#/components/schemas/LoginRequest")
 *      )
 *  )
 */

class AuthController extends Controller
{
    /**
     * Store a new user.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */


    /**
     * @OA\Post(
     *   path="/register",
     *   summary="register",
     *   tags={"Users"},
     *     @OA\Parameter(
     *         name="login",
     *         in="query",
     *         description="login of the user",
     *         required=true,
     *         @OA\Schema(type="string", default="test")
     *     ),
     *     @OA\Parameter(
     *         name="password",
     *         in="query",
     *         description="Password of the user",
     *         required=true,
     *         @OA\Schema(type="string", default="test")
     *     ),
     * @OA\Parameter(
     *         name="password_confirmation",
     *         in="query",
     *         description="Confirmation Password of the user",
     *         required=true,
     *         @OA\Schema(type="string", default="test")
     *     ),
     * @OA\Parameter(
     *         name="role_id",
     *         in="query",
     *         description="role of user",
     *         required=true,
     *         @OA\Schema(type="string", default="1")
     *     ),
     *    @OA\Response(
     *        response=401,
     *        description="Credentials not valid",
     *    ),
     * @OA\Response(
     *        response=422,
     *        description="login has already been taken",
     *    ),
     *    @OA\Response(
     *        response=404,
     *        description="Resource Not Found"
     *    ),
*    @OA\Response(
     *      response=201,
     *      description="Login",
     *      @OA\JsonContent(
     *        @OA\Property(
     *          property="login",
     *          type="string",
     *          default="login",
     *          description="login of User",
     *        ),
     *        @OA\Property(
     *          property="role_id",
     *          type="string",
     *          default="1",
     *          description="lvl of User",
     *        ),
     *        @OA\Property(
     *          property="updated_at",
     *          type="string",
     *          default="2021-08-25T14:38:35.000000Z",
     *          description="date of Modification on User",
     *        ),
     *        @OA\Property(
     *          property="created_at",
     *          type="string",
     *          default="2021-08-25T14:38:35.000000Z",
     *          description="date of creation of User",
     *        ),
     *        @OA\Property(
     *          property="id",
     *          type="string",
     *          default="1",
     *          description="id of User",
     *        ),
     *      )
     *  )
     * )
     */


    public function register(Request $request)
    {
        //validate incoming request
        $this->validate($request, [
            'login' => 'required|unique:users',
            'password' => 'required|confirmed',
            'role_id' => 'required'
        ]);

        try {

            $user = new User;
            $user->login = $request->input('login');
            $plainPassword = $request->input('password');
            $user->password = app('hash')->make($plainPassword);
            $user->role_id = $request->input('role_id');

            $user->save();

            //return successful response
            return response()->json(['user' => $user, 'message' => 'CREATED'], 201);
        } catch (\Exception $e) {
            //return error message
            return response()->json(['message' => 'User Registration Failed!'], 409);
        }
    }


    /**
     * @OA\Post(
     *      path="/login",
     *      summary="Login",
     *      tags={"Auth"},
     *      description="Log a user",
     *      @OA\RequestBody(ref="#/components/requestBodies/Login"),
     *
     *      @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(ref="#/components/schemas/LoginResponse")
     *      ),
     *     @OA\Response(
     *          response="401",
     *          description="Unauthaurized",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="error",
     *                  default="Bad login/password"
     *              )
     *          )
     *     )
     *  )
     * @param Request $request
     * @param Response $response
     * @return Response
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(Request $request, Response $response): Response
    {
        //validate incoming request
        $this->validate($request, [
            'login' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = $request->only(['login', 'password']);

        if (!$token = Auth::attempt($credentials)) {
           return $this->unauthorizedResponse($response, 'Bad Login/Password');
        }
        $userArray = AuthController::me()->toArray();
        unset($userArray['password']);
        return $this->okResponse($response, array(
            'user' => $userArray,
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ));
    }

    /**
     * @return Users|null
     */
    public static function me(): ?Users
    {
        $myId = auth()->user()->getAuthIdentifier();
        return Users::getUserById($myId);
    }
}
