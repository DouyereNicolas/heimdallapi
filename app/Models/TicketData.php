<?php

namespace App\Models;
use App\Models\Utils\Keys;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 *  *  @OA\Schema (
 *     schema="TicketData",
 *     description="TicketData Model",
 * )
 */
class TicketData extends Model
{
    /**
     * @OA\Property
     * @var int
     */
    private int $data_id;
    /**
     * @OA\Property
     * @var int
     */
    private int $data_ticket_id;
    /**
     * @OA\Property
     * @var string
     */
    private string $data_key;
    /**
     * @OA\Property
     * @var string
     */
    private string $data_column;

    public function __construct()
    {
        parent::__construct();
        $this->setDataId(0);
        $this->setDataTicketId(0);
        $this->setDataKey('');
        $this->setDataColumn('');
    }

    public function setDataId(int $id): TicketData {
        $this->data_id = $id;
        return $this;
    }
    public function getDataId(): int {
        return $this->data_id;
    }
    public function setDataTicketId(int $ticket_id): TicketData {
        $this->data_ticket_id = $ticket_id;
        return $this;
    }
    public function getDataTicketId(): int {
        return $this->data_ticket_id;
    }
    public function setDataKey(string $key): TicketData {
        $this->data_key = $key;
        return $this;
    }
    public function getDataKey(): string {
        return $this->data_key;
    }
    public function setDataColumn(string $column): TicketData {
        $this->data_column = $column;
        return $this;
    }
    public function getDataColumn(): string {
        return $this->data_column;
    }

    public function toArray(): array
    {
        return array(
            Keys::DATABASE_TICKET_DATA_ID => $this->getDataId(),
            Keys::DATABASE_TICKET_DATA_TICKET_ID => $this->getDataTicketId(),
            Keys::DATABASE_TICKET_DATA_KEY => $this->getDataKey(),
            Keys::DATABASE_TICKET_DATA_COLUMN => $this->getDataColumn()
        );
    }

    public function fromDatabase(array $array): void {
        $this->setDataId( $array[Keys::DATABASE_TICKET_DATA_ID] );
        $this->setDataTicketId( $array[Keys::DATABASE_TICKET_DATA_TICKET_ID] );
        $this->setDataKey( $array[Keys::DATABASE_TICKET_DATA_KEY] );
        $this->setDataColumn( $array[Keys::DATABASE_TICKET_DATA_COLUMN] );
    }

    public static function getAllTicketData(): array
    {
        $myTicketData = [];
        $myResult = DB::select("SELECT * FROM hc_problem_data");
        foreach ($myResult as $item) {
            $data = new TicketData();
            $data->fromDatabase(json_decode(json_encode($item), true));
            $myTicketData[] = $data;
        }
        return $myTicketData;
    }

    public static function getTicketDataById(int $id): ?TicketData {
        $myTicketData = new TicketData();
        $myResult = DB::select("SELECT * FROM hc_problem_data WHERE problemData_id = $id ");
        if (count($myResult) > 0) {
            foreach ($myResult as $item) {
                $myTicketData->fromDatabase(json_decode(json_encode($item), true));
            }
            return $myTicketData;
        }
        return null;
    }

    public static function getTicketDataByTicket(int $ticket_id): array {
        $myTicketDatas = [];
        $myResult = DB::select("SELECT * FROM hc_problem_data WHERE problemData_problemId = $ticket_id");
        foreach ($myResult as $item) {
            $data = new TicketData();
            $data->fromDatabase(json_decode(json_encode($item), true));
            $myTicketDatas[] = $data;
        }
        return $myTicketDatas;
    }

    /**
     * @OA\Schema(
     *     schema="PostTicketDataRequest",
     *     required={"problemData_problemId", "problemData_key", "problemData_column"},
     *     @OA\Property(
     *          property="problemData_problemId",
     *          type="integer",
     *          default=1,
     *          description="Problem id"
     *     ),
     *     @OA\Property(
     *          property="problemData_key",
     *          type="string",
     *          default="key",
     *          description="Key of the column value"
     *     ),
     *     @OA\Property(
     *          property="problemData_column",
     *          type="string",
     *          default="column",
     *          description="Value of the key"
     *     )
     * )
     * @param TicketData $data
     * @return bool
     */
    public static function addTicketData(TicketData $data): bool {
        $id = DB::table('hc_problem_data')->insertGetId($data->toArray());
        if ($id === null || $id === 0) {
            return false;
        }
        $data->setDataId($id);
        return true;
    }

    /**
     * @OA\Schema(
     *     schema="UpdateTicketDataRequest",
     *     required={"problemData_id", "problemData_key", "problemData_column"},
     *     @OA\Property(
     *          property="problemData_id",
     *          type="integer",
     *          default=1,
     *          description="ProblemData id"
     *     ),
     *     @OA\Property(
     *          property="problemData_key",
     *          type="string",
     *          default="key",
     *          description="Key of the column value"
     *     ),
     *     @OA\Property(
     *          property="problemData_column",
     *          type="string",
     *          default="column",
     *          description="Value of the key"
     *     )
     * )
     * @param TicketData $data
     * @return bool
     */
    public static function updateTicketData(TicketData $data): bool {
        return DB::table('hc_problem_data')->where('problemData_id', $data->getDataId())->update($data->toArray());
    }

    public static function deleteTicketData(int $id): bool {
        return DB::delete("DELETE FROM hc_problem_data WHERE problemData_id = $id");
    }
}
