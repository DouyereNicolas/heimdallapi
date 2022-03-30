<?php

namespace App\Models;

use App\Models\Utils\Functions;
use App\Models\Utils\Keys;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * @OA\Schema(
 *     schema="Users",
 *     description="Users's Model",
 * )
 */
class Users extends Model
{
    /**
     * @OA\Property
     * @var int
     */
    private int $id;

    /**
     * @OA\Property
     * @var string
     */
    private string $login;

    /**
     * @OA\Property
     * @var string
     */
    private string $password;

    /**
     * @OA\Property
     * @var int
     */
    private int $role_id;

    /**
     * @OA\Property
     * @var \DateTime
     */
    private \DateTime $created_at;

    /**
     * @OA\Property
     * @var \DateTime|null
     */
    private ?\DateTime $updated_at;

    /**
     * @OA\Property
     * @var \DateTime|null
     */
    private ?\DateTime $deleted_at;

    public function __construct(?Users $user = null)
    {
        parent::__construct();
        if ($user !== null) {
            $this->setId($user->getId());
            $this->setLogin($user->getLogin());
            $this->setPassword($user->getPassword());
            $this->setRole($user->getRole());
            // $this->setJob($user->getJob());
            $this->setCreated($user->getCreated());
            $this->setUpdated($user->getUpdated());
            $this->setDeleted($user->getDeleted());
        }
        $this->setId(0);
        $this->setLogin('');
        $this->setPassword('');
        $this->setRole(0);
        // $this->setJob();
        $this->setCreated(new \DateTime());
        $this->setUpdated(null);
        $this->setDeleted(null);
    }

    /**
     * @OA\Schema(
     *     schema="UsersWithData",
     *     description="User's Model with data",
     *     allOf={@OA\Schema(ref="#/components/schemas/Users")},
     *      @OA\Property(
     *          property="data",
     *          type="array",
     *          @OA\Items(ref="#/components/schemas/UsersData"),
     *          minItems=2
     *     )
     * )
     */

    /**
     * @param int $id
     * @return $this
     */
    public function setId(int $id): Users
    {
        $this->id = $id;
        return $this;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setLogin(string $login): Users
    {
        $this->login = $login;
        return $this;
    }

    public function getLogin(): string
    {
        return $this->login;
    }

    public function setPassword(string $password): Users
    {
        $this->password = $password;
        return $this;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setRole(int $role): Users
    {
        $this->role_id = $role;
        return $this;
    }

    public function getRole(): int
    {
        return $this->role_id;
    }

//    public function setJob(Job $job): Users
//    {
//        $this->job = $job;
//        return $this;
//    }
//
//    public function getJob(): Job
//    {
//        return $this->job;
//    }

    public function setCreated(\DateTime $created_at): Users
    {
        $this->created_at = $created_at;
        return $this;
    }

    public function getCreated(): \DateTime
    {
        return $this->created_at;
    }

    public function setUpdated(?\DateTime $updated_at): Users
    {
        $this->updated_at = $updated_at;
        return $this;
    }

    public function getUpdated(): ?\DateTime
    {
        return $this->updated_at;
    }

    public function setDeleted(?\DateTime $deleted_at): Users
    {
        $this->deleted_at = $deleted_at;
        return $this;
    }

    public function getDeleted(): ?\DateTime
    {
        return $this->deleted_at;
    }

    public function toArray(): array
    {
        return array(
            Keys::DATABASE_ID => $this->getId(),
            Keys::DATABASE_LOGIN => $this->getLogin(),
            Keys::DATABASE_PASSWORD => $this->getPassword(),
            Keys::DATABASE_ROLE => $this->getRole(),
            // Keys::DATABASE_JOB => $this->getJob()->__toInt(),
            Keys::DATABASE_CREATED_AT => $this->getCreated(),
            Keys::DATABASE_UPDATED_AT => ($this->getUpdated() !== null ? $this->getUpdated() : null),
            Keys::DATABASE_DELETED_AT => ($this->getDeleted() !== null ? $this->getDeleted() : null)
        );
    }

    public function fromDatabase(array $array): void
    {
        $this->setId($array[Keys::DATABASE_ID]);
        $this->setLogin($array[Keys::DATABASE_LOGIN]);
        $this->setRole($array[Keys::DATABASE_ROLE]);
        // $this->setJob(Job::get($array[Keys::DATABASE_JOB]));
        $this->setPassword($array[Keys::DATABASE_PASSWORD]);
        $this->setCreated(Functions::fromString($array[Keys::DATABASE_CREATED_AT]));
        $this->setUpdated(($array[Keys::DATABASE_UPDATED_AT] !== null ? Functions::fromString($array[Keys::DATABASE_UPDATED_AT]) : null));
        $this->setDeleted(($array[Keys::DATABASE_DELETED_AT] !== null ? Functions::fromString($array[Keys::DATABASE_DELETED_AT]) : null));
    }

    public static function getUsers(): array
    {
        $myUsers = [];
        $result = DB::select('SELECT * FROM users WHERE deleted_at IS NULL ');
        foreach ($result as $item) {
            $user = new Users();
            $user->fromDatabase(json_decode(json_encode($item), true));
            $myUsers[] = $user;
        }
        return $myUsers;
    }

    public static function getAllUsers(): array
    {
        $myUsers = [];
        $result = DB::select('SELECT * FROM users');
        foreach ($result as $item) {
            $user = new Users();
            $user->fromDatabase(json_decode(json_encode($item), true));
            $myUsers[] = $user;
        }
        return $myUsers;
    }

    public static function getUserById(int $id): ?Users
    {
        $myUser = new Users();
        $result = DB::select("SELECT * FROM users WHERE id = $id AND deleted_at IS NULL ");

        if (count($result) > 0) {
            foreach ($result as $item) {
                $myUser->fromDatabase(json_decode(json_encode($item), true));
            }
            return $myUser;
        }
        return null;
    }

    public static function getUserByLogin(string $login): ?Users {
        $myUser = new Users();
        $myResult = DB::select("SELECT * FROM users WHERE login = '$login'");

        if (count($myResult) > 0) {
            foreach ( $myResult as $item ) {
                $myUser->fromDatabase(json_decode(json_encode($item), true));
            }
            return $myUser;
        }
        return null;
    }

    public static function getUsersByRole(int $role): array
    {
        $myUsers = [];
        $myResult = DB::select("SELECT * FROM users WHERE role_id = $role");

        foreach ($myResult as $item) {
            $user = new Users();
            $user->fromDatabase(json_decode(json_encode($item), true));
            $myUsers[] = $user;
        }
        return $myUsers;
    }

//    public static function getUsersByJob(int $job): array
//    {
//        $myUsers = [];
//        $myResult = DB::select("SELECT * FROM users WHERE job = $job");
//
//        foreach ($myResult as $item) {
//            $user = new Users();
//            $user->fromDatabase(json_decode(json_encode($item), true));
//            $myUsers[] = $user;
//        }
//        return $myUsers;
//    }

    /**
     * @OA\Schema(
     *     schema="RegisterRequest",
     *     required={"login", "password", "role", "job"},
     *     @OA\Property (
     *          property="login",
     *          type="string",
     *          default="test12345",
     *          description="Login of the user"
     *     ),
     *     @OA\Property(
     *          property="password",
     *          type="string",
     *          default="Test12345",
     *          description="Password user"
     *     ),
     *     @OA\Property(
     *          property="role",
     *          type="integer",
     *          default=1,
     *          description="User's role"
     *      ),
     *     @OA\Property(
     *          property="job",
     *          type="integer",
     *          default=0,
     *          description="User's job"
     *     )
     * )
     *
     *
     * @param Users $user
     * @return bool
     */

    public static function addUser(Users $user): bool
    {
        return DB::table('users')->insert($user->toArray());
    }

    /**
     *  * @OA\Schema(
     *     schema="PutLoginPasswordRequest",
     *     required={"login", "password", "role", "job"},
     *     @OA\Property (
     *          property="login",
     *          type="string",
     *          default="test12345",
     *          description="Login of the user"
     *     ),
     *     @OA\Property(
     *          property="password",
     *          type="string",
     *          default="Test12345",
     *          description="Password user"
     *     )
     * )
     * @param Users $user
     * @return bool
     */

    public static function updateUser(Users $user): bool
    {
        $user->setUpdated(new \DateTime());
        return DB::table('users')->where('id', $user->getId())->update($user->toArray());
    }

    public static function deleteUser(Users $user): bool
    {
        $user->setDeleted(new \DateTime());
        return DB::table('users')->where('id', $user->getId())
            ->where('deleted_at', null)
            ->update($user->toArray());
    }

//    static function getAllUsers()
//    {
//        $result = DB::table("users")
//            ->select('id', 'login', 'role_id', 'created_at', 'updated_at', 'deleted_at')
//            ->where('deleted_at', NULL)
//            ->get();
//        return $result;
//    }
//
//    static function getOneUser($userId)
//    {
//        $results = DB::table('users')
//            ->select('id', 'login', 'role_id', 'created_at', 'updated_at', 'deleted_at')
//            ->where('id', '=', $userId)
//            ->where('deleted_at', null)
//            ->get();
//        return $results;
//    }
//
//    static function getUsersForSite(int $userId)
//    {
//        $users = Users::getOneUser($userId);
//        $finalUsers = [];
//        foreach ($users as $user) {
//            $out = [];
//            $dataUser = Users::getUsersData($user->id);
//            $out = json_decode(json_encode($user), true);
//            $out['Datas'] = json_decode(json_encode($dataUser), true);
//            $finalUsers = $out;
//        }
//        return $finalUsers;
//    }
//
//    static function getUserByRole(int $role)
//    {
//        $results = DB::table('users')
//            ->select('*')
//            ->where('role_id', '=', $role)
//            ->where('deleted_at', null)
//            ->get();
//
//        return $results;
//    }
//
//    static function getRole()
//    {
//        return DB::select('SELECT * FROM hc_role');
//    }

    // static function postOneUser($dataUser)
    // {
    //     $decode = json_decode($dataUser, true);
    //     $user = $decode['users'];
    //     $data = $decode['hc_user_data'];
    //     $return = array();

    //     $result = DB::table('users')->insert($user);
    //     if ($result == true) {
    //         $idLastUser = DB::table('users')->select('id')->limit(1)->orderByDesc('id')->get();
    //         $idLastUser = get_object_vars($idLastUser[0])['id'];
    //         $id_user = array('userData_userId' => $idLastUser);
    //         if (count($data) != 0) {
    //             foreach($data as $dataUniq) {
    //                 $arrayUniq = array_merge($id_user, $dataUniq);
    //                 $result2 = DB::table('hc_user_data')->insertGetId($arrayUniq);
    //                 if ($result2 =!true) {
    //                     array_push($return, 'erreur data name : ' . $arrayUniq['userData_key']);
    //                 }
    //             }
    //         };
    //         array_push($return, 'ok');
    //     } else {
    //         array_push($return, 'Erreur insertion user');
    //     };
    //     return $return;
    // }
//    static function createOneUser($user)
//    {
//        $result = DB::table('users')
//            ->insertGetID($user);
//        return $result;
//    }


//    static function updateOneUser($newDataUser)
//    {
//        $newDataUser['updated_at'] = new \DateTime('NOW');
//
//        $result = DB::table("users")
//            ->select("*")
//            ->where('id', "=", $newDataUser["id"])
//            ->update($newDataUser);
//
//        return $result;
//    }
//
//    static function deleteOneUser($idUser)
//    {
//        $result = DB::table('users')
//            ->where('id', $idUser)
//            ->delete();
//        return $result;
//    }

    // Fonction DATA

//    static function getUsersData($data_id)
//    {
//
//        $results = DB::table('hc_user_data')
//            ->select('*')
//            ->where('userData_userId', $data_id)
//            ->get();
//        return $results;
//    }

//    static function getOneUserData($data_id)
//    {
//
//        $results = DB::table('hc_user_data')
//            ->select('*')
//            ->where('userData_id', '=', $data_id)
//            ->get();
//        return $results;
//    }


//    static function setUserData($data)
//    {
//
//        $result = DB::table("hc_user_data")
//            ->insert($data);
//        return $result;
//    }


//    static function updateUserData($user_data)
//    {
//
//        {
//            $result = DB::table('hc_user_data')
//                ->select("*")
//                ->where('userData_id', "=", $user_data["userData_id"])
//                ->update($user_data);
//            return $result;
//        }
//
//        return $result;
//    }
//
//    static function deleteUserData($data_id)
//    {
//
//        $result = DB::table('hc_user_data')
//            ->where('userData_id', $data_id)
//            ->delete();
//        return $result;
//    }
}
