<?php


namespace App\Models;


use App\Models\Utils\Functions;
use App\Models\Utils\Keys;
use DateTime;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Site",
 *     description="Site Model"
 * )
 */
class Site extends Model
{
	/**
     * @OA\Property
	 * @var int
	 */
	private int $site_id;

	/**
     * @OA\Property
	 * @var int
	 */
	private int $site_number_site;

	/**
     * @OA\Property
	 * @var DateTime
	 */
	private DateTime $site_date_start;

	/**
     * @OA\Property
	 * @var DateTime
	 */
	private DateTime $site_date_end;

	/**
     * @OA\Property
	 * @var DateTime
	 */
	private DateTime $created_at;

	/**
     * @OA\Property
	 * @var DateTime|null
	 */
	private ?DateTime $updated_at;

	/**
     * @OA\Property
	 * @var DateTime|null
	 */
	private ?DateTime $deleted_at;


	public function __construct()
	{
		parent::__construct();
		$this->setId( 0 );
		$this->setNumberSite(0);
		$this->setDateStart(new DateTime());
		$this->setDateEnd(new DateTime());
		$this->setCreated(new \DateTime());
		$this->setUpdated(null);
		$this->setDeleted(null);
	}

    /**
     * @OA\Schema(
     *     schema="SiteWithData",
     *     description="Site Model with data",
     *     allOf={@OA\Schema(ref="#/components/schemas/Site")},
     *      @OA\Property(
     *          property="data",
     *          type="array",
     *          @OA\Items(ref="#/components/schemas/SiteData"),
     *          minItems=2
     *     )
     * )
     */

    /**
     * @return int
     */
	public function getId(): int
	{
		return $this->site_id;
	}

    /**
     * @param int $id
     * @return $this
     */
	public function setId(int $id): Site
	{
		$this->site_id = $id;
		return $this;
	}

    /**
     * @return int
     */
	public function getNumberSite(): int
	{
		return $this->site_number_site;
	}

    /**
     * @param int $site_numberSite
     * @return $this
     */
	public function setNumberSite(int $site_numberSite): Site
	{
		$this->site_number_site = $site_numberSite;
		return $this;
	}

    /**
     * @return DateTime
     */
	public function getDateStart(): DateTime
	{
		return $this->site_date_start;
	}

    /**
     * @param DateTime $date
     * @return $this
     */
	public function setDateStart(DateTime $date): Site
	{
		$this->site_date_start = $date;
        return $this;
	}

    /**
     * @param DateTime $date
     * @return $this
     */
	public function setDateEnd(DateTime $date): Site
	{
		$this->site_date_end = $date;
        return $this;
	}

    /**
     * @return DateTime
     */
	public function getDateEnd(): DateTime
	{
		return $this->site_date_end;
	}

    /**
     * @return DateTime|null
     */
	public function getCreated(): ?\DateTime
	{
		return $this->created_at;
	}

    /**
     * @param DateTime|null $createdAt
     * @return $this
     */
	public function setCreated(?DateTime $createdAt) : Site {
		$this->created_at = $createdAt;
		return $this;
	}

    /**
     * @return DateTime|null
     */
	public function getUpdated(): ?\DateTime
	{
		return $this->updated_at;
	}

    /**
     * @param DateTime|null $updatedAt
     * @return $this
     */
	public function setUpdated(?DateTime $updatedAt) : Site {
		$this->updated_at = $updatedAt;
		return $this;
	}

    /**
     * @return DateTime|null
     */
	public function getDeleted(): ?\DateTime
	{
		return $this->deleted_at;
	}

    /**
     * @param DateTime|null $deletedAt
     * @return $this
     */
	public function setDeleted(?\DateTime $deletedAt): Site
	{
		$this->deleted_at = $deletedAt;
		return $this;
	}

    /**
     * @return array
     */
    public function toArray(): array
    {
        return array(
            Keys::DATABASE_SITE_ID => $this->getId(),
            Keys::DATABASE_SITE_NUMBER_SITE => $this->getNumberSite(),
            Keys::DATABASE_SITE_DATE_START => $this->getDateStart()->getTimestamp(),
            Keys::DATABASE_SITE_DATE_END => $this->getDateEnd()->getTimestamp(),
            Keys::DATABASE_CREATED_AT => $this->getCreated()->getTimestamp(),
            Keys::DATABASE_UPDATED_AT => ($this->getUpdated() !== null ? $this->getUpdated()->getTimestamp() : null),
            Keys::DATABASE_DELETED_AT => ($this->getDeleted() !== null ? $this->getDeleted()->getTimestamp() : null)
        );
    }

    /**
     * @param array $array
     * @return void
     */
    public function fromDatabase(array $array): void
    {
        $this->setId($array[Keys::DATABASE_SITE_ID]);
        $this->setNumberSite($array[Keys::DATABASE_SITE_NUMBER_SITE]);
        $this->setDateStart(Functions::fromUnix($array[Keys::DATABASE_SITE_DATE_START]));
        $this->setDateEnd(Functions::fromUnix($array[Keys::DATABASE_SITE_DATE_END]));
        $this->setCreated(Functions::fromUnix($array[Keys::DATABASE_CREATED_AT]));
        $this->setUpdated(($array[Keys::DATABASE_UPDATED_AT] !== null ? Functions::fromUnix($array[Keys::DATABASE_UPDATED_AT]) : null));
        $this->setDeleted(($array[Keys::DATABASE_DELETED_AT] !== null ? Functions::fromUnix($array[Keys::DATABASE_DELETED_AT]) : null));
    }

    /**
     * @return array
     */
    public static function getCurrentSites(): array
    {
        $mySites = [];
        $myResult = DB::select("SELECT * FROM hc_site WHERE deleted_at IS NULL");
        foreach ($myResult as $item) {
            $site = new Site();
            $site->fromDatabase(json_decode(json_encode($item), true));
            $mySites[] = $site;
        }
        return $mySites;
    }

    /**
     * @return array
     */
    public static function getPreviousSites(): array
    {
        $mySites = [];
        $myResult = DB::select("SELECT * FROM hc_site WHERE deleted_at IS NOT NULL");
        foreach ($myResult as $item) {
            $site = new Site();
            $site->fromDatabase(json_decode(json_encode($item), true));
            $mySites[] = $site;
        }
        return $mySites;
    }

    /**
     * @param int $id
     * @return Site|null
     */
    public static function getSiteById(int $id): ?Site
    {
        $mySite = new Site();
        $myResult = DB::select("SELECT * FROM hc_site WHERE site_id = $id");
        if (count($myResult) > 0) {
            foreach ($myResult as $item) {
                $mySite->fromDatabase(json_decode(json_encode($item), true));
            }
            return $mySite;
        }
        return null;
    }

    /**
     * @param int $numberSite
     * @return Site|null
     */
    public static function getSiteByNumberSite(int $numberSite): ?Site
    {
        $mySite = new Site();
        $myResult = DB::select("SELECT * FROM hc_site WHERE site_number_site = $numberSite");
        if (count($myResult) > 0 ) {
            foreach ($myResult as $item) {
                $mySite->fromDatabase(json_decode(json_encode($item), true));
            }
            return $mySite;
        }
        return null;
    }

    /**
     * @return array
     */
    public static function getAllSites(): array
    {
        $mySites = [];
        $myResult = DB::select("SELECT * FROM hc_site WHERE deleted_at IS NULL");
        foreach ($myResult as $item) {
            $site = new Site();
            $site->fromDatabase(json_decode(json_encode($item), true));
            $mySites[] = $site;
        }
        return $mySites;
    }

    /**
     * @param string $userId
     * @return array
     */
    public static function getSitesByUser(string $userId): array
    {
        $mySites = [];
        $myResult = DB::select("SELECT s.* FROM hc_site s INNER JOIN hc_site_data d ON s.site_id = d.siteData_siteId
                                WHERE s.site_id = d.siteData_siteId AND d.siteData_column = $userId
                                AND (d.siteData_key = 'employee' OR d.siteData_key = 'customer' OR d.siteData_key = 'manager') ");
        foreach ($myResult as $item) {
            $site = new Site();
            $site->fromDatabase(json_decode(json_encode($item), true));
            $mySites[] = $site;
        }
        return $mySites;
    }

    /**
     * @param int $startYear
     * @param int $endYear
     * @return array
     */
    public static function getSitesByYear(int $startYear, int $endYear): array
    {
        $mySites = [];
        $myResult = DB::select("SELECT * FROM hc_site s WHERE s.site_date_start BETWEEN $startYear AND $endYear");
        foreach ($myResult as $item) {
            $site = new Site();
            $site->fromDatabase( json_decode(json_encode($item), true) );
            $mySites[] = $site;
        }
        return $mySites;
    }

	/**
	 ** @OA\Schema(
     *     schema="PostSiteRequest",
     *     required={"site_number_site", "site_date_start", "site_date_end"},
     *     @OA\Property(
     *          property="site_number_site",
     *          type="integer",
     *          default=987654,
     *          description="Number of site"
     *     ),
     *     @OA\Property(
     *          property="site_date_start",
     *          type="integer",
     *          default=1648601639,
     *          description="Begin date of site"
     *     ),
     *     @OA\Property(
     *          property="site_date_end",
     *          type="integer",
     *          default=1649465639,
     *          description="End date of site"
     *     )
     * )
	 *
	 * @param Site $site
	 * @return bool
	 */
	public static function addSite(Site $site): bool
	{
		$numberSite = $site->getNumberSite();
		if( DB::select(
			"SELECT * FROM hc_site WHERE EXISTS( SELECT site_number_site FROM hc_site WHERE site_number_site = $numberSite)") ) {
			return false;
		}
        $id =  DB::table('hc_site')->insertGetId($site->toArray());
		if( $id === null || $id === 0){
			return false;
		}
		$site->setId( $id );
		return true;
	}

	/**
	 * @OA\Schema(
     *     schema="UpdateSiteRequest",
     *     required={"site_id", "site_number_site", "site_date_start", "site_date_end"},
     *     @OA\Property(
     *          property="site_id",
     *          type="integer",
     *          default=2,
     *          description="Site Id"
     *     ),
     *     @OA\Property(
     *          property="site_number_site",
     *          type="integer",
     *          default=987654,
     *          description="Number of site"
     *     ),
     *     @OA\Property(
     *          property="site_date_start",
     *          type="integer",
     *          default=1648601639,
     *          description="Begin date of site"
     *     ),
     *     @OA\Property(
     *          property="site_date_end",
     *          type="integer",
     *          default=1649465639,
     *          description="End date of site"
     *     )
     * )
	 *
	 * @param Site $mySite
	 * @return bool
	 */
	public static function updateSite(Site $mySite ): bool
	{
		$mySite->setUpdated(new DateTime());
		return DB::table('hc_site')->where('site_Id', $mySite->getId())->update( $mySite->toArray() );
	}

    /**
     * @param Site $mySite
     * @return bool
     */
	public static function deleteSite(Site $mySite): bool
    {
        $mySite->setDeleted(new DateTime());
		return DB::table('hc_site')->where('site_Id', $mySite->getId())
										->WhereNull('deleted_at')
										->update($mySite->toArray());
	}
}
