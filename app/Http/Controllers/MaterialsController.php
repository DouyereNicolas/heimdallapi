<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\MaterialData;
use App\Models\Utils\ParameterHelper;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * @OA\RequestBody(
 *      request="PostMaterial",
 *      description="Post Material body",
 *      @OA\MediaType(
 *          mediaType="application/json",
 *          @OA\Schema(ref="#/components/schemas/PostMaterialRequest")
 *      )
 *  )
 */

/**
 * @OA\RequestBody(
 *      request="UpdateMaterial",
 *      description="Put Material body",
 *      @OA\MediaType(
 *          mediaType="application/json",
 *          @OA\Schema(ref="#/components/schemas/UpdateMaterialRequest")
 *      )
 *  )
 */
class MaterialsController extends Controller
{
    /**
     * @OA\Get(
     *     path="/materials/{materialId}",
     *     summary="Get Material by Id",
     *     description="Get material with material's data",
     *     tags={"Materials"},
     *     security={{ "apiAuth": {} }},
     *     @OA\Parameter(
     *          name="materialId",
     *          description="Material id",
     *          required=true,
     *          in="path"
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(ref="#/components/schemas/MaterialWithData")
     *          )
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
     * @param Request $request
     * @param Response $response
     * @param string $materialId
     * @return Response
     */
    public function getAction(Request $request, Response $response, string $materialId): Response
    {
        $myMaterial = Material::getMaterialById($materialId);
        if ($myMaterial === null) {
            return $this->notFoundResponse($response, 'material');
        }

        $myMaterialArray = $myMaterial->toArray();
        $myMaterialArray['data'] = array_map(static function (MaterialData $data): array {
            return $data->toArray();
        }, MaterialData::getMaterialDataByMaterial($myMaterial->getId()));
        return $this->okResponse($response, $myMaterialArray);
    }

    /**
     * @OA\Get(
     *     path="/materials",
     *     summary="Get All Materials",
     *     tags={"Materials"},
     *     description="Get all materials with data, only for director",
     *     security={{ "apiAuth": {} }},
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="materials",
     *                  type="array",
     *                  @OA\Items(ref="#/components/schemas/MaterialWithData"),
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
        $myMaterials = Material::getAllMaterials();
        $myMaterialArray = [];

        foreach ($myMaterials as $material) {
            $myArray = $material->toArray();
            $myArray['data'] = MaterialData::getMaterialDataByMaterial($material->getId());
            $myMaterialArray[] = $myArray;
        }

        return $this->okResponse($response, $myMaterialArray);
    }

    /**
     * @OA\Post(
     *     path="/materials",
     *     summary="Post a Material",
     *     tags={"Materials"},
     *     description="Post a Material",
     *     security={{ "apiAuth": {} }},
     *     @OA\RequestBody(ref="#/components/requestBodies/PostMaterial"),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(ref="#/components/schemas/Material")
     *     ),
     *     @OA\Response(
     *          response="406",
     *          description="Error Not Acceptable",
     *          @OA\JsonContent(ref="#/components/schemas/NotAcceptableResponse")
     *     ),
     *     @OA\Response(
     *          response="500",
     *          description="Internal Server Error",
     *          @OA\JsonContent(ref="#/components/schemas/InternalServerErrorResponse")
     *     ),
     *     @OA\Response(
     *          response="401",
     *          description="Unauthorized Response",
     *          @OA\JsonContent(ref="#/components/schemas/UnauthorizedResponse")
     *     )
     * )
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function postAction(Request $request, Response $response): Response
    {
        $myMaterialName = ParameterHelper::testMaterialRef($this, $request, $response, true);
        if ($myMaterialName === null) {
            return $this->notAcceptableResponse($response, 'material_ref');
        }
        $myMaterial = new Material();
        $myMaterial->setMaterialRef($myMaterialName);

        if (Material::addMaterial($myMaterial)) {
            return $this->okResponse($response, $myMaterial->toArray());
        }
        return $this->internalServerErrorResponse($response, 'Can\'t add material');
    }

    /**
     * @OA\Put(
     *     path="/materials/update",
     *     summary="Update Material",
     *     description="Update Material with Material Model in body",
     *     security={{ "apiAuth": {} }},
     *     tags={"Materials"},
     *     @OA\RequestBody(ref="#/components/requestBodies/UpdateMaterial"),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(ref="#/components/schemas/Material")
     *     ),
     *     @OA\Response(
     *          response="404",
     *          description="Not Found",
     *          @OA\JsonContent(ref="#/components/schemas/NotFoundResponse")
     *     ),
     *     @OA\Response(
     *          response="406",
     *          description="Error Not Acceptable",
     *          @OA\JsonContent(ref="#/components/schemas/NotAcceptableResponse")
     *     ),
     *     @OA\Response(
     *          response="500",
     *          description="Internal Server Error",
     *          @OA\JsonContent(ref="#/components/schemas/InternalServerErrorResponse")
     *     ),
     *     @OA\Response(
     *          response="401",
     *          description="Unauthorized Response",
     *          @OA\JsonContent(ref="#/components/schemas/UnauthorizedResponse")
     *     )
     *)
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function putAction(Request $request, Response $response): Response
    {
        $myMaterialId = $this->getParam($request, 'material_id');
        $myMaterial = Material::getMaterialById($myMaterialId);
        if ($myMaterial === null) {
            return $this->notFoundResponse($response, 'material');
        }

        $myMaterialName = ParameterHelper::testMaterialRef($this, $request, $response, false);
        if ($myMaterialName !== null) {
            $myMaterial->setMaterialRef($myMaterialName);
        }
        if (Material::updateMaterial($myMaterial)) {
            return $this->okResponse($response, $myMaterial->toArray());
        }
        return $this->internalServerErrorResponse($response, 'Can\'t update material');
    }

    /**
     * @OA\Delete(
     *     path="/materials/delete/{materialId}",
     *     summary="Delete Material",
     *     tags={"Materials"},
     *     description="Delete a Material, update material.deleted_at",
     *     security={{ "apiAuth": {} }},
     *     @OA\Parameter(
     *          name="materialId",
     *          description="Material Id",
     *          required=true,
     *          in="path"
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Success"
     *     ),
     *     @OA\Response(
     *          response="404",
     *          description="Not Found",
     *          @OA\JsonContent(ref="#/components/schemas/NotFoundResponse")
     *     ),
     *     @OA\Response(
     *          response="500",
     *          description="Internal Server Error",
     *          @OA\JsonContent(ref="#/components/schemas/InternalServerErrorResponse")
     *     ),
     *     @OA\Response(
     *          response="401",
     *          description="Unauthorized Response",
     *          @OA\JsonContent(ref="#/components/schemas/UnauthorizedResponse")
     *     )
     * )
     * @param Request $request
     * @param Response $response
     * @param string $materialId
     * @return Response
     */
    public function deleteAction(Request $request, Response $response, string $materialId): Response
    {
        $myMaterial = Material::getMaterialById($materialId);
        if ($myMaterial === null) {
            return $this->notFoundResponse($response, 'material');
        }
        if (Material::deleteMaterial($myMaterial)) {
            return $this->okResponse($response);
        }
        return $this->internalServerErrorResponse($response, 'Can\'t delete material');
    }
}
