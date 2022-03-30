<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\MaterialData;
use App\Models\Utils\ParameterHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * @OA\RequestBody(
 *     request="PostMaterialData",
 *     description="Post material data body",
 *     @OA\MediaType(
 *          mediaType="application/json",
 *          @OA\Schema(ref="#/components/schemas/PostMaterialDataRequest")
 *      )
 * )
 */

/**
 * @OA\RequestBody(
 *     request="UpdateMaterialData",
 *     description="Update Material data body",
 *     @OA\MediaType(
 *          mediaType="application/json",
 *          @OA\Schema(ref="#/components/schemas/UpdateMaterialDataRequest")
 *      )
 * )
 */
class MaterialsDataController extends Controller
{
    /**
     * @OA\Get(
     *     path="/materials/data/{dataId}",
     *     summary="Get MaterialData By Id",
     *     tags={"MaterialData"},
     *     security={{ "apiAuth": {} }},
     *     @OA\Parameter(
     *          name="dataId",
     *          description="MaterialData id",
     *          required=true,
     *          in="path"
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(ref="#/components/schemas/MaterialData")
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
     * @param string $dataId
     * @return Response
     */
    public function getAction(Request $request, Response $response, string $dataId): Response
    {
        $myMaterialData = MaterialData::getMaterialDataById($dataId);
        if ($myMaterialData === null) {
            return $this->notFoundResponse($response, 'material data');
        }
        return $this->okResponse($response, $myMaterialData->toArray());
    }

    /**
     * @OA\Get(
     *     path="/materials/data/all",
     *     summary="Get All MaterialData ",
     *     tags={"MaterialData", "Admin"},
     *     security={{ "apiAuth": {} }},
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="materialData",
     *                  type="array",
     *                  @OA\Items(ref="#/components/schemas/MaterialData"),
     *                  minItems=2
     *              )
     *          )
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
    public function getsAction(Request $request, Response $response): Response
    {
        return $this->okResponse($response, array('siteData' => array_map(static function (MaterialData $materialData): array {
            return $materialData->toArray();
        }, MaterialData::getAllMaterialData())));
    }

    /**
     * @OA\Get(
     *     path="/materials/data/material/{materialId}",
     *     summary="Get MaterialData By Material",
     *     tags={"MaterialData"},
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
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="materialData",
     *                  type="array",
     *                  @OA\Items(ref="#/components/schemas/MaterialData"),
     *                  minItems=2
     *              )
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
    public function getsByMaterialAction(Request $request, Response $response, string $materialId): Response
    {
        $myMaterial = Material::getMaterialById($materialId);
        if ($myMaterial === null) {
            return $this->notFoundResponse($response, 'material');
        }

        return $this->okResponse($response, array('materialData' => array_map(static function (MaterialData $data): array {
            return $data->toArray();
        }, MaterialData::getMaterialDataByMaterial($materialId))));
    }

    /**
     * @OA\Post(
     *     path="/materials/data",
     *     summary="Post Material Data",
     *     description="Post a material data, only director",
     *     tags={"MaterialData"},
     *     security={{ "apiAuth": {} }},
     *     @OA\RequestBody(ref="#/components/requestBodies/PostMaterialData"),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(ref="#/components/schemas/MaterialData")
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
        $myDataMaterialId = ParameterHelper::testDataMaterialId($this, $request, $response, true);
        if ($myDataMaterialId === null) {
            return $response;
        }
        $myDataKey = ParameterHelper::testDataKey($this, $request, $response, 'data_key', true);
        if ($myDataKey === null) {
            return $response;
        }
        $myDataColumn = ParameterHelper::testDataColumn($this, $request, $response, 'data_column', true);
        if ($myDataColumn === null) {
            return $response;
        }

        $myData = new MaterialData();
        $myData->setDataMaterialId($myDataMaterialId);
        $myData->setDataKey($myDataKey);
        $myData->setDataColumn($myDataColumn);

        if (MaterialData::addMaterialData($myData)) {
            return $this->okResponse($response, $myData->toArray());
        }
        return $this->internalServerErrorResponse($response, 'Can\'t add material data');
    }

    /**
     * @OA\Put(
     *     path="/materials/data/update",
     *     summary="Update MaterialData",
     *     description="Update MaterialData with MaterialData Model in body",
     *     security={{ "apiAuth": {} }},
     *     tags={"MaterialData"},
     *     @OA\RequestBody(ref="#/components/requestBodies/UpdateMaterialData"),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(ref="#/components/schemas/MaterialData")
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
     * )
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function putAction(Request $request, Response $response): Response
    {
        $myDataId = $this->getParam($request, 'materialData_id');
        $myMaterialData = MaterialData::getMaterialDataById($myDataId);
        if ($myMaterialData === null) {
            return $this->notFoundResponse($response, 'material data');
        }
        $myDataMaterialId = ParameterHelper::testDataMaterialId($this, $request, $response, false);
        if ($myDataMaterialId !== null) {
            $myMaterialData->setDataMaterialId($myDataMaterialId);
        }
        $myDataKey = ParameterHelper::testDataKey($this, $request, $response, 'data_key',false);
        if ($myDataKey !== null) {
            $myMaterialData->setDataKey($myDataKey);
        }
        $myDataColumn = ParameterHelper::testDataColumn($this, $request, $response, 'data_column', false);
        if ($myDataColumn !== null) {
            $myMaterialData->setDataColumn($myDataColumn);
        }

        if (MaterialData::updateMaterialData($myMaterialData)) {
            return $this->okResponse($response, $myMaterialData->toArray());
        }

        return $this->internalServerErrorResponse($response, 'Can\'t update material data');
    }

    /**
     * @OA\Delete(
     *     path="/materials/data/delete/{dataId}",
     *     summary="Delete MaterialData",
     *     tags={"MaterialData"},
     *     description="Delete a MaterialData",
     *     security={{ "apiAuth": {} }},
     *     @OA\Parameter(
     *          name="dataId",
     *          description="MaterialData Id",
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
     * @param string $dataId
     * @return Response
     */
    public function deleteAction(Request $request, Response $response, string $dataId): Response
    {
        if (MaterialData::getMaterialDataById($dataId) === null) {
            return $this->notFoundResponse($response, 'material data');
        }
        if (MaterialData::deleteMaterialData($dataId)) {
            return $this->okResponse($response);
        }
        return $this->internalServerErrorResponse($response, 'Can\'t remove material data');
    }

//
//	public function dataAndCat(Request $request) {
//		$id = $request->materialCategory_id;
//		if ($id === NULL) {
//			return response()->json("Syntaxe invalide", 400);
//		}
//		return response()->json(MaterialData::getDataAndCategory($id), 200);
//	}
}


