<?php


namespace App\Http\Controllers;

use App\Models\Site;
use App\Models\SiteData;
use App\Models\Utils\Keys;
use App\Models\Utils\ParameterHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use OpenApi\Annotations as OA;

/**
 * @OA\RequestBody(
 *     request="PostSiteData",
 *     description="Post Site data body",
 *     @OA\MediaType(
 *          mediaType="application/json",
 *          @OA\Schema(ref="#/components/schemas/PostSiteDataRequest")
 *      )
 * )
 */

/**
 * @OA\RequestBody(
 *     request="UpdateSiteData",
 *     description="Update Site data body",
 *     @OA\MediaType(
 *          mediaType="application/json",
 *          @OA\Schema(ref="#/components/schemas/UpdateSiteDataRequest")
 *      )
 * )
 */
class SitesDataController extends Controller
{

    /**
     * @OA\Get(
     *     path="/sites/data/{dataId}",
     *     summary="Get SiteData By Id",
     *     tags={"SitesData"},
     *     security={{ "apiAuth": {} }},
     *     @OA\Parameter(
     *          name="dataId",
     *          description="SiteData id",
     *          required=true,
     *          in="path"
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(ref="#/components/schemas/SiteData")
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
        $mySiteData = SiteData::getSiteDataById($dataId);
        if ($mySiteData === null) {
            return $this->notFoundResponse($response, 'site data');
        }
        return $this->okResponse($response, $mySiteData->toArray());
    }

    /**
     * @OA\Get(
     *     path="/sites/data/all",
     *     summary="Get All SiteData ",
     *     tags={"SitesData", "Admin"},
     *     security={{ "apiAuth": {} }},
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="siteData",
     *                  type="array",
     *                  @OA\Items(ref="#/components/schemas/SiteData"),
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
        return $this->okResponse($response, array('siteData' => array_map(static function (SiteData $data): array {
            return $data->toArray();
        }, SiteData::getAllSiteData())));
    }

    /**
     * @OA\Post(
     *      path="/sites/data",
     *     summary="Post Site Data",
     *     description="Post a site data, only director",
     *     tags={"SitesData"},
     *     security={{ "apiAuth": {} }},
     *     @OA\RequestBody(ref="#/components/requestBodies/PostSiteData"),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(ref="#/components/schemas/SiteData")
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
    public function postAction(Request $request, Response $response): Response
    {
        $myDataSiteId = ParameterHelper::testDataSiteId($this, $request, $response, true);
        if ($myDataSiteId === null) {
            return $this->notAcceptableResponse($response, 'siteData_siteId');
        }
        if (Site::getSiteById($myDataSiteId) === null) {
            return $this->notFoundResponse($response, 'site');
        }
        $myDataKey = ParameterHelper::testDataKey($this, $request, $response, Keys::DATABASE_SITE_DATA_KEY, true);
        if ($myDataKey === null) {
            return $this->notAcceptableResponse($response, 'data_key');
        }
        $myDataColumn = ParameterHelper::testDataColumn($this, $request, $response, Keys::DATABASE_SITE_DATA_COLUMN, true);
        if ($myDataColumn === null) {
            return $this->notAcceptableResponse($response, 'data_column');
        }

        $mySiteData = new SiteData();
        $mySiteData->setSiteData_siteId($myDataSiteId);
        $mySiteData->setSiteData_key($myDataKey);
        $mySiteData->setSiteData_column($myDataColumn);

        if (SiteData::addSiteData($mySiteData)) {
            return $this->okResponse($response, $mySiteData->toArray());
        }
        return $this->internalServerErrorResponse($response, 'Can\'t add site data');
    }

    /**
     * @OA\Put(
     *     path="/sites/data/update",
     *     summary="Update SiteData",
     *     description="Update SiteData with SiteData Model in body",
     *     security={{ "apiAuth": {} }},
     *     tags={"SitesData"},
     *     @OA\RequestBody(ref="#/components/requestBodies/UpdateSiteData"),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(ref="#/components/schemas/SiteData")
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
        $myDataId = $this->getParam($request, 'siteData_id');
        $mySiteData = SiteData::getSiteDataById($myDataId);
        if ($mySiteData === null) {
            return $this->notFoundResponse($response, 'site data');
        }
        $myDataKey = ParameterHelper::testDataKey($this, $request, $response, Keys::DATABASE_SITE_DATA_KEY, false);
        if ($myDataKey !== null) {
            $mySiteData->setSiteData_key($myDataKey);
        }
        $myDataColumn = ParameterHelper::testDataColumn($this, $request, $response, Keys::DATABASE_SITE_DATA_COLUMN, false);
        if ($myDataColumn !== null) {
            $mySiteData->setSiteData_column($myDataColumn);
        }
        if (SiteData::updateSiteData($mySiteData)) {
            return $this->okResponse($response, $mySiteData->toArray());
        }
        return $this->internalServerErrorResponse($response, 'Can\'t update site data');
    }

    /**
     * @OA\Delete(
     *     path="/sites/data/delete/{dataId}",
     *     summary="Delete SiteData",
     *     tags={"SitesData"},
     *     description="Delete a SiteData",
     *     security={{ "apiAuth": {} }},
     *     @OA\Parameter(
     *          name="dataId",
     *          description="SiteData Id",
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
        $mySiteData = SiteData::getSiteDataById($dataId);
        if ($mySiteData === null) {
            return $this->notFoundResponse($response, 'site data');
        }
        if (SiteData::deleteSiteData($dataId)) {
            return $this->okResponse($response);
        }
        return $this->internalServerErrorResponse($response, 'Can\'t remove site data');
    }
}
