<?php


namespace App\Models;


use App\Models\Utils\Functions;
use App\Models\Utils\Keys;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Material",
 *     description="Material's Model"
 * )
 */

class Material extends Model
{
    /**
     * @OA\Property
     * @var int
     */
    private int $material_id;
    /**
     * @OA\Property
     * @var string
     */
    private string $material_ref;
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
     *     schema="MaterialWithData",
     *     description="Material Model with data",
     *     allOf={@OA\Schema(ref="#/components/schemas/Material")},
     *     @OA\Property(
     *          property="data",
     *          type="array",
     *          @OA\Items(ref="#/components/schemas/MaterialData"),
     *          minItems=2
     *     )
     * )
     */
    public function __construct()
    {
        parent::__construct();
        $this->setId(0);
        $this->setMaterialRef("");
        $this->setCreated(new \DateTime());
        $this->setUpdated(null);
        $this->setDeleted(null);
    }

    public function getId(): int
    {
        return $this->material_id;
    }

    public function setId($id): Material
    {
        $this->material_id = $id;
        return $this;
    }

    public function getMaterialRef(): string
    {
        return $this->material_ref;
    }

    public function setMaterialRef(string $material_ref): Material
    {
        $this->material_ref = $material_ref;
        return $this;
    }

    public function setCreated(\DateTime $createdAt): Material
    {
        $this->created_at = $createdAt;
        return $this;
    }
    public function getCreated(): \DateTime
    {
        return $this->created_at;
    }
    public function setUpdated(?\DateTime $updatedAt): Material
    {
        $this->updated_at = $updatedAt;
        return $this;
    }
    public function getUpdated(): ?\DateTime
    {
        return $this->updated_at;
    }
    public function getDeleted(): ?\DateTime
    {
        return $this->deleted_at;
    }
    public function setDeleted(?\DateTime $deletedAt): Material
    {
        $this->deleted_at = $deletedAt;
        return $this;
    }

    public function toArray(): array
    {
        return array(
            Keys::DATABASE_MATERIAL_ID => $this->getId(),
            Keys::DATABASE_MATERIAL_REF => $this->getMaterialRef(),
            Keys::DATABASE_CREATED_AT => $this->getCreated(),
            Keys::DATABASE_UPDATED_AT => ($this->getUpdated() !== null ? $this->getUpdated() : null),
            Keys::DATABASE_DELETED_AT => ($this->getDeleted() !== null ? $this->getDeleted() : null)
        );
    }

    public function fromDatabase(array $array): void
    {
        $this->setId($array[Keys::DATABASE_MATERIAL_ID]);
        $this->setMaterialRef($array[Keys::DATABASE_MATERIAL_REF]);
        $this->setCreated(Functions::fromString($array[Keys::DATABASE_CREATED_AT]));
        $this->setUpdated(($array[Keys::DATABASE_UPDATED_AT] !== null ? Functions::fromString($array[Keys::DATABASE_UPDATED_AT]) : null));
        $this->setDeleted(($array[Keys::DATABASE_DELETED_AT] !== null ? Functions::fromString($array[Keys::DATABASE_DELETED_AT]) : null));
    }

    public static function getMaterialById(int $id): ?Material
    {
        $myMaterial = new Material();
        $myResult = DB::select("SELECT * FROM hc_material WHERE material_id = $id");
        if (count($myResult) > 0) {
            foreach ($myResult as $item) {
                $myMaterial->fromDatabase(json_decode(json_encode($item), true));
            }
            return $myMaterial;
        }
        return null;
    }

    public static function getAllMaterials(): array
    {
        $myMaterials = [];
        $myResult = DB::select("SELECT * FROM hc_material WHERE deleted_at IS NULL ");
        foreach ($myResult as $item) {
            $material = new Material();
            $material->fromDatabase(json_decode(json_encode($item), true));
            $myMaterials[] = $material;
        }
        return $myMaterials;
    }

//    public static function getMaterialByCategory(string $category): array
//    {
//        $myMaterials = [];
//        $myResult = DB::select("SELECT m.* FROM hc_material m INNER JOIN hc_material_data d ON m.material_id = d.data_material_id
//                                    WHERE m.material_id = d.data_material_id AND d.data_key = 'category' AND d.data_column = $category");
//        foreach ($myResult as $item) {
//            $material = new Materials();
//            $material->fromDatabase(json_decode(json_encode($item), true));
//            $myMaterials[] = $material;
//        }
//        return $myMaterials;
//    }

    /**
     * @OA\Schema(
     *     schema="PostMaterialRequest",
     *     required={"material_ref"},
     *     @OA\Property(
     *          property="material_ref",
     *          type="string",
     *          default="10000-01",
     *          description="Reference of the material"
     *     )
     * )
     *
     * @param Material $material
     * @return bool
     */
    public static function addMaterial(Material $material): bool
    {
        $id = DB::table('hc_material')->insertGetId($material->toArray());
        if ($id === null || $id === 0) {
            return false;
        }
        $material->setId($id);
        return true;
    }

    /**
     * @OA\Schema(
     *     schema="UpdateMaterialRequest",
     *     required={"material_id", "material_ref"},
     *     @OA\Property(
     *          property="material_id",
     *          type="integer",
     *          default=2,
     *          description="Material Id"
     *     ),
     *     @OA\Property(
     *          property="material_ref",
     *          type="string",
     *          default="Marteau",
     *          description="Reference of the material"
     *     ),
     * )
     *
     * @param Material $material
     * @return bool
     */
    public static function updateMaterial(Material $material): bool
    {
        $material->setUpdated(new \DateTime());
        return DB::table('hc_material')->where('material_id', $material->getId())->update($material->toArray());
    }

    public static function deleteMaterial(Material $material): bool
    {
        $material->setDeleted(new \DateTime());
        return DB::table('hc_material')->where('material_id', $material->getId())
            ->where('deleted_at', null)->update($material->toArray());
    }
}
