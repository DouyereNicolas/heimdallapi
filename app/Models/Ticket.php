<?php

namespace App\Models;

use App\Models\Utils\Functions;
use App\Models\Utils\Keys;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use OpenApi\Annotations as OA;
/**
 *  @OA\Schema (
 *     schema="Ticket",
 *     description="Ticket Model",
 * )
 */
class Ticket extends Model
{
    /**
     * @OA\Property
     * @var int
     */
    private int $ticket_id;
    /**
     * @OA\Property
     * @var string
     */
    private string $ticket_ref;
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

    /**
     * @OA\Schema(
     *     schema="TicketWithData",
     *     description="Ticket Model with data",
     *     allOf={@OA\Schema(ref="#/components/schemas/Ticket")},
     *      @OA\Property(
     *          property="data",
     *          type="array",
     *          @OA\Items(ref="#/components/schemas/TicketData"),
     *          minItems=2
     *     )
     * )
     */
    public function __construct()
    {
        parent::__construct();
        $this->setTicketId(0);
        $this->setTicketRef('');
        $this->setCreated(new \DateTime());
        $this->setUpdated(null);
        $this->setDeleted(null);
    }

    public function setTicketId(int $id): Ticket
    {
        $this->ticket_id = $id;
        return $this;
    }

    public function getTicketId(): int
    {
        return $this->ticket_id;
    }

    public function setTicketRef(string $subject): Ticket
    {
        $this->ticket_ref = $subject;
        return $this;
    }

    public function getTicketRef(): string
    {
        return $this->ticket_ref;
    }

    public function setCreated(\DateTime $created_at): Ticket
    {
        $this->created_at = $created_at;
        return $this;
    }

    public function getCreated(): \DateTime
    {
        return $this->created_at;
    }

    public function setUpdated(?\DateTime $updated_at): Ticket
    {
        $this->updated_at = $updated_at;
        return $this;
    }

    public function getUpdated(): ?\DateTime
    {
        return $this->updated_at;
    }

    public function setDeleted(?\DateTime $deleted_at): Ticket
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
            Keys::DATABASE_TICKET_ID => $this->getTicketId(),
            Keys::DATABASE_TICKET_REF => $this->getTicketRef(),
            Keys::DATABASE_CREATED_AT => $this->getCreated(),
            Keys::DATABASE_UPDATED_AT => ($this->getUpdated() !== null ? $this->getUpdated() : null),
            Keys::DATABASE_DELETED_AT => ($this->getDeleted() !== null ? $this->getDeleted() : null)
        );
    }

    public function fromDatabase(array $array): void {
        $this->setTicketId( $array[Keys::DATABASE_TICKET_ID] );
        $this->setTicketRef( $array[Keys::DATABASE_TICKET_REF] );
        $this->setCreated(Functions::fromString($array[Keys::DATABASE_CREATED_AT]));
        $this->setUpdated(($array[Keys::DATABASE_UPDATED_AT] !== null ? Functions::fromString($array[Keys::DATABASE_UPDATED_AT]) : null));
        $this->setDeleted(($array[Keys::DATABASE_DELETED_AT] !== null ? Functions::fromString($array[Keys::DATABASE_DELETED_AT]) : null));
    }

    public static function getAllTickets(): array
    {
        $myTickets = [];
        $myResult = DB::select("SELECT * FROM hc_problem WHERE deleted_at IS NULL ");
        foreach ($myResult as $item) {
            $ticket = new Ticket();
            $ticket->fromDatabase(json_decode(json_encode($item), true));
            $myTickets[] = $ticket;
        }
        return $myTickets;
    }

    public static function getTicketById(int $ticket_id): ?Ticket
    {
        $myTicket = new Ticket();
        $myResult = DB::select("SELECT * FROM hc_problem WHERE problem_id = $ticket_id");
        if (count($myResult) > 0) {
            foreach ($myResult as $item) {
                $myTicket->fromDatabase(json_decode(json_encode($item), true));
            }
            return $myTicket;
        }
        return null;
    }

    public static function getTicketBySite(string $siteId): array {
        $myTickets = [];
        $myResult = DB::select("SELECT t.* FROM hc_problem t INNER JOIN hc_problem_data d ON t.problem_id = d.problemData_problemId
                                WHERE d.problemData_problemId = t.problem_id AND d.problemData_key = 'Site' AND d.problemData_column = $siteId");
        foreach ($myResult as $item) {
            $ticket = new Ticket();
            $ticket->fromDatabase(json_decode(json_encode($item), true));
            $myTickets[] = $ticket;
        }
        return $myTickets;
    }

    public static function getTicketByEmployee(string $userId): array {
        $myTickets = [];
        $myResult = DB::select("SELECT t.* FROM hc_problem t INNER JOIN hc_problem_data d ON t.problem_id = d.problemData_problemId
                                WHERE d.problemData_problemId = t.problem_id AND d.problemData_key = 'employee' AND d.problemData_column = $userId");
        foreach ($myResult as $item) {
            $ticket = new Ticket();
            $ticket->fromDatabase(json_decode(json_encode($item), true));
            $myTickets[] = $ticket;
        }
        return $myTickets;
    }

    /**
     * @OA\Schema(
     *     schema="PostTicketRequest",
     *     required={"ticket_ref"},
     *     @OA\Property(
     *          property="ticket_ref",
     *          type="string",
     *          default="10000-01",
     *          description="Reference of the ticket"
     *     )
     * )
     * @param Ticket $ticket
     * @return bool
     */
    public static function addTicket(Ticket $ticket): bool {
        $id = DB::table('hc_problem')->insertGetId($ticket->toArray());
        if ($id === null || $id === 0) {
            return false;
        }
        $ticket->setTicketId($id);
        return true;
    }

    /**
     *  @OA\Schema(
     *     schema="UpdateTicketRequest",
     *     required={"ticket_id", "ticket_ref"},
     *     @OA\Property(
     *          property="ticket_id",
     *          type="integer",
     *          default=2,
     *          description="Ticket Id"
     *     ),
     *     @OA\Property(
     *          property="ticket_ref",
     *          type="string",
     *          default="Marteau",
     *          description="Reference of the ticket"
     *     ),
     * )
     * @param Ticket $ticket
     * @return bool
     */
    public static function updateTicket(Ticket $ticket): bool {
        $ticket->setUpdated(new \DateTime());
        return DB::table('hc_problem')->where('problem_id', $ticket->getTicketId())->update($ticket->toArray());
    }

    public static function deleteTicket(Ticket $ticket): bool {
        $ticket->setDeleted(new \DateTime());
        return DB::table('hc_problem')->where('problem_id', $ticket->getTicketId())
            ->where('deleted_at', null)->update($ticket->toArray());
    }



//    static function getAllProblems()
//    {
//        $result = DB::table('hc_problem')
//            ->select("*")
//            ->where("deleted_at", NULL)
//            ->get();
//        return $result;
//    }
//    static function getOneProblem($problemId)
//    {
//        $result = DB::table('hc_problem')
//            ->select("*")
//            ->where("problem_id", "=", $problemId)
//            ->where("deleted_at", null)
//            ->get();
//        return $result;
//    }
//
//    static function getProblemsForSite(int $problemId){
//        $problems = Ticket::getOneProblem($problemId);
//        $finalProblems = [];
//        foreach ($problems as $p) {
//            $out = [];
//            $dataProblem = Ticket::getAllProblemsData($p->problem_id);
//            $out = json_decode(json_encode($p), true);
//            $out['Datas'] = json_decode(json_encode($dataProblem), true);
//            $finalProblems = $out;
//        }
//        return $finalProblems;
//    }
//
//    static function deleteOneProblem($problemId)
//    {
//        $result = DB::table('hc_problem')
//            ->where('problem_id', $problemId)
//            ->update(array(
//                'deleted_at' => date("Y-m-d H:i:s")
//            ));
//        return $result;
//    }
//    static function createProblem($problem)
//    {
//        $result = DB::table('hc_problem')
//            ->insertGetID($problem);
//        return $result;
//    }
//
//    static function updateOneProblem($problem)
//
//    {
//        $result = DB::table("hc_problem")
//            ->select("*")
//            ->where('problem_id', "=", $problem["problem_id"])
//            ->update($problem);
//        return $result;
//    }
//
//
//
//    static function getOneProblemData($problem_id)
//    {
//        $result = DB::table('hc_problem_data')
//            ->select("*")
//            ->where("problemData_id", "=", $problem_id)
//            ->get();
//        return $result;
//    }
//    static function getOneProblemDataBySiteId($problemData_column)
//    {
//        $result = DB::table('hc_problem_data')
//            ->select("*")
//            ->where("problemData_column", "=", $problemData_column)
//            ->get();
//        return $result;
//    }
//
//    static function createProblemData($problem_data)
//    {
//        $result = DB::table('hc_problem_data')
//            ->insertGetId($problem_data);
//        return $result;
//    }
//    static function deleteOneProblemData($problemDataId)
//    {
//        $result = DB::table('hc_problem_data')
//            ->where('problemData_id', $problemDataId)
//            ->delete();
//        return $result;
//    }
//
//
//    static function updateProblemData($problem_data)
//    {
//        $result = DB::table('hc_problem_data')
//            ->select("*")
//            ->where('problemData_id', "=", $problem_data["problemData_id"])
//            ->update($problem_data);
//        return $result;
//    }
//    static function getAllProblemsData($problemId)
//    {
//        $result = DB::table('hc_problem_data')
//            ->select("*")
//            ->where("problemData_problemId", "=", $problemId)
//            ->get();
//        return $result;
//    }
}
