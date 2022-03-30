<?php


namespace App\Models;

use App\Models\Utils\Keys;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use OpenApi\Annotations as OA;
/**
 * @OA\Schema(
 *     schema="SiteData",
 *     description="Données d'un site",
 * )
 */
class SiteData extends Model
{
    /**
     * @OA\Property
     * @var int
     */
	private int $siteData_id;
    /**
     * @OA\Property
     * @var int
     */
	private int $siteData_siteId;
    /**
     * @OA\Property
     * @var string
     */
	private string $siteData_key;
    /**
     * @OA\Property
     * @var string
     */
	private string $siteData_column;

	public function __construct()
	{
		parent::__construct();
        $this->setId(0);
		$this->setSiteData_siteId( 0 );
		$this->setSiteData_key( '' );
		$this->setSiteData_column( '' );
	}

    /**
     * @param int $id
     * @return $this
     */
    public function setId( int $id ) : SiteData {
        $this->siteData_id = $id;
        return $this;
    }
    /**
     * @return int
     */
	public function getId(): int {
		return $this->siteData_id;
	}
    /**
     * @return int
     */
	public function getSiteData_siteId() : int {
		return $this->siteData_siteId;
	}

    /**
     * @param int $id
     * @return $this
     */
	public function setSiteData_siteId( int $id ) : SiteData {
		$this->siteData_siteId = $id;
		return $this;
	}

    /**
     * @return string
     */
	public function getSiteData_key() : string {
		return $this->siteData_key;
	}

    /**
     * @param string $key
     * @return $this
     */
	public function setSiteData_key( string $key ) : SiteData {
		$this->siteData_key = $key;
		return $this;
	}

    /**
     * @return string
     */
	public function getSiteData_column() : string {
		return $this->siteData_column;
	}

    /**
     * @param string $value
     * @return $this
     */
	public function setSiteData_column( string $value ) : SiteData {
		$this->siteData_column = $value;
		return $this;
	}

    /**
     * @return array
     */
    public function toArray(): array
    {
        return array(
            Keys::DATABASE_SITE_DATA_ID => $this->getId(),
            Keys::DATABASE_SITE_DATA_SITE_ID => $this->getSiteData_siteId(),
            Keys::DATABASE_SITE_DATA_KEY => $this->getSiteData_key(),
            Keys::DATABASE_SITE_DATA_COLUMN => $this->getSiteData_column()
        );
    }

    /**
     * @param array $array
     * @return void
     */
    public function fromDatabase(array $array): void {
        $this->setId( $array[Keys::DATABASE_SITE_DATA_ID] );
        $this->setSiteData_siteId( $array[Keys::DATABASE_SITE_DATA_SITE_ID] );
        $this->setSiteData_key( $array[Keys::DATABASE_SITE_DATA_KEY] );
        $this->setSiteData_column( $array[Keys::DATABASE_SITE_DATA_COLUMN] );
    }

    /**
     * @return array
     */
    public static function getAllSiteData(): array {
        $mySiteDatas = [];
        $myResult = DB::select("SELECT * FROM hc_site_data");
        foreach ($myResult as $item) {
            $data = new SiteData();
            $data->fromDatabase(json_decode(json_encode($item), true));
            $mySiteDatas[] = $data;
        }
        return $mySiteDatas;
    }

    /**
     * @param int $id
     * @return SiteData|null
     */
    public static function getSiteDataById(int $id): ?SiteData {
        $mySiteData = new SiteData();
        $myResult = DB::select("SELECT * FROM hc_site_data WHERE siteData_id = $id");
        if (count($myResult) > 0) {
            foreach ($myResult as $item) {
                $mySiteData->fromDatabase(json_decode(json_encode($item), true));
            }
            return $mySiteData;
        }
        return null;
    }

    /**
     * @param int $site_id
     * @return array
     */
    public static function getSiteDataBySite(int $site_id): array {
        $mySiteDatas = [];
        $myResult = DB::select("SELECT * FROM hc_site_data WHERE siteData_siteId = $site_id");
        foreach ($myResult as $item) {
            $data = new SiteData();
            $data->fromDatabase(json_decode(json_encode($item), true));
            $mySiteDatas[] = $data;
        }
        return $mySiteDatas;
    }


	/**
	 * @OA\Schema(
     *     schema="PostSiteDataRequest",
     *     required={"siteData_siteId", "siteData_key", "siteData_column"},
     *     @OA\Property(
     *          property="siteData_siteId",
     *          type="integer",
     *          default=1,
     *          description="Site id"
     *     ),
     *     @OA\Property(
     *          property="siteData_key",
     *          type="string",
     *          default="key",
     *          description="Key of the column value"
     *     ),
     *     @OA\Property(
     *          property="siteData_column",
     *          type="string",
     *          default="column",
     *          description="Value of the key"
     *     )
     * )
	 * @param SiteData $siteData
	 * @return bool
	 */
	public static function addSiteData(SiteData $siteData): bool
    {
        $id = DB::table('hc_site_data')->insertGetId($siteData->toArray());
        if ($id === null || $id === 0) {
            return false;
        }
        $siteData->setId($id);
        return true;
	}

	/**
	 *@OA\Schema(
     *     schema="UpdateSiteDataRequest",
     *     required={"siteData_id", "siteData_key", "siteData_column"},
     *     @OA\Property(
     *          property="siteData_id",
     *          type="integer",
     *          default=1,
     *          description="SiteData id"
     *     ),
     *     @OA\Property(
     *          property="siteData_key",
     *          type="string",
     *          default="key",
     *          description="Key of the column value"
     *     ),
     *     @OA\Property(
     *          property="siteData_column",
     *          type="string",
     *          default="column",
     *          description="Value of the key"
     *     )
     * )
	 * @param SiteData $mySiteData
	 * @return bool
	 */
	public static function updateSiteData(SiteData $mySiteData): bool
    {
		return DB::table('hc_site_data')->where("siteData_id", $mySiteData->getId())->update( $mySiteData->toArray() );
	}

    /**
     * @param int $myId
     * @return bool
     */
	public static function deleteSiteData(int $myId): bool
    {
		return DB::table('hc_site_data')->where("siteData_id", $myId)->delete();
	}
}
