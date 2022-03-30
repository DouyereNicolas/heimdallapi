<?php


namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\MaterialData;
use App\Models\Ticket;
use App\Models\Site;
use App\Models\SiteData;
use App\Models\TicketData;
use App\Models\UserData;
use App\Models\Users;
use App\Models\Utils\Functions;
use App\Models\Utils\ParameterHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use OpenApi\Annotations as OA;

/**
 * @OA\RequestBody(
 *      request="PostSite",
 *      description="Post Site body",
 *      @OA\MediaType(
 *          mediaType="application/json",
 *          @OA\Schema(ref="#/components/schemas/PostSiteRequest")
 *      )
 *  )
 */

/**
 * @OA\RequestBody(
 *     request="UpdateSite",
 *     description="Update Site body",
 *     @OA\MediaType(
 *          mediaType="application/json",
 *          @OA\Schema(ref="#/components/schemas/UpdateSiteRequest")
 *     )
 * )
 */
class SitesController extends Controller
{

    /**
     * @OA\Get(
     *     path="/sites",
     *     summary="Get All Sites",
     *     tags={"Admin", "Sites"},
     *     security={{ "apiAuth": {} }},
     *     description="Get all sites and site's data, only for director",
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="sites",
     *                  type="array",
     *                  @OA\Items(ref="#/components/schemas/SiteWithData"),
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
        $mySites = Site::getAllSites();
        $mySitesResponse = [];
        foreach ($mySites as $site) {
            $mySiteArray = $site->toArray();
            $mySiteData = SiteData::getSiteDataBySite($site->getId());
            $mySiteArray['data'] = $mySiteData;
            $mySitesResponse[] = $mySiteArray;
        }
        return $this->okResponse($response, $mySitesResponse);
    }


    /**
     * @OA\Get(
     *     path="/sites/search/{siteId}",
     *     summary="Get Site By Id",
     *     tags={"Sites"},
     *     security={{ "apiAuth": {} }},
     *     @OA\Parameter(
     *          name="siteId",
     *          description="Site id",
     *          required=true,
     *          in="path"
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="site",
     *                  ref="#/components/schemas/SiteWithData"
     *              ),
     *              @OA\Property(
     *                    property="users",
     *                    type="array",
     *                    @OA\Items(ref="#/components/schemas/UsersWithData"),
     *                    minItems=2
     *              ),
     *              @OA\Property(
     *                  property="materials",
     *                  type="array",
     *                  @OA\Items(ref="#/components/schemas/MaterialWithData"),
     *                  minItems=2
     *              ),
     *              @OA\Property(
     *                  property="tickets",
     *                  type="array",
     *                  minItems=2,
     *                  @OA\Items(ref="#/components/schemas/TicketWithData")
     *              )
     *          ),
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
     * @param string $siteId
     * @return Response
     */
    public function getAction(Request $request, Response $response, string $siteId): Response
    {
        $mySite = Site::getSiteById($siteId);
        if ($mySite === null) {
            return $this->notFoundResponse($response, 'site');
        }
        $mySiteArray = $mySite->toArray();
        $mySiteData = SiteData::getSiteDataBySite($mySite->getId());
        $mySiteArray['data'] = array_map(static function(SiteData $data): array {
            return $data->toArray();
        }, $mySiteData);

        $myTicketsArray = [];
        $myTickets = Ticket::getTicketBySite($siteId);
        foreach ($myTickets as $ticket) {
            $array = $ticket->toArray();
            $array['data'] = array_map(static function(TicketData $data): array {
                return $data->toArray();
            }, TicketData::getTicketDataByTicket($ticket->getTicketId()));
            $myTicketsArray[] = $array;
        }

        $myUsers = [];
        $myMaterials = [];
        foreach ($mySiteData as $data) {
            switch ($data->getSiteData_key()) {
                case 'employee':
                case 'manager':
                case 'customer':
                    $user = Users::getUserById((int)$data->getSiteData_column());
                    $userArray = $user->toArray();
                    $userArray['data'] = array_map(static function(UserData $data): array {
                        return $data->toArray();
                    }, UserData::getDataByUser($user->getId()));
                    $myUsers[] = $userArray;
                    break;
                case str_starts_with($data->getSiteData_key(), 'mat-'):
                    $material = Material::getMaterialById((int)trim($data->getSiteData_key(), 'mat-'));
                    $materialArray = $material->toArray();
                    $materialArray['data'] = array_map(static function(MaterialData $data): array {
                        return $data->toArray();
                    }, MaterialData::getMaterialDataByMaterial($material->getId()));
                    $myMaterials[] = $materialArray;
                    break;
            }
        }
        return $this->okResponse($response, array(
            'site' => $mySiteArray,
            'users' => $myUsers,
            'materials' => $myMaterials,
            'tickets' => $myTicketsArray
        ));
    }

    public function showOneSiteWithData(Request $request, Response $response)
    {
        $myId = $request->site_Id;
        if ($myId === null) {
            return $this->notAcceptableResponse($response, 'site_Id');
        }

        return response()->json(Site::getOneSiteWithData($myId));
    }

    public function showSiteByUser(Request $request, Response $response)
    {
        $myId = '' . $request->user_Id . '';
        if ($myId === null) {
            return $this->notAcceptableResponse($response, 'user_id');
        }
        return response()->json(Site::getSiteByUserId($myId));
    }

    public function showFullSites()
    {
        $sites = Site::getAllSite();
        $finalSites = [];
        foreach ($sites as $site) {
            $out = [];
            $dataSites = SiteData::getDataBySite($site->site_Id);
            $out = json_decode(json_encode($site), true);
            $out['Datas'] = json_decode(json_encode($dataSites), true);
            $finalSites[] = $out;
        }
        return json_encode($finalSites);
    }


    /**
     * @OA\Get(
     *     path="/sites/user/{userId}",
     *     summary="Get Sites By User",
     *     tags={"Sites"},
     *     security={{ "apiAuth": {} }},
     *     @OA\Parameter(
     *          name="userId",
     *          description="User id",
     *          required=true,
     *          in="path"
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(ref="#/components/schemas/SiteWithData")
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
     * @param string $userId
     * @return Response
     */
    public function getsByUserAction(Request $request, Response $response, string $userId): Response
    {
        if (Users::getUserById($userId) === null) {
            return $this->notFoundResponse($response, 'user');
        }
        return $this->okResponse($response, array('sites' => array_map(static function(Site $site): array {
            $mySiteArray = $site->toArray();
            $mySiteArray['data'] = SiteData::getSiteDataBySite($site->getId());
            return $mySiteArray;
        }, Site::getSitesByUser($userId))));
    }

//    public function showFullSitesByUser(Request $request, Response $response)
//    {
//        $myId = '' . $request->user_Id;
//        $sites = Site::getSiteByUserId($myId);
//        $finalSites = [];
//        foreach ($sites as $site) {
//            $out = [];
//            $dataSites = SiteData::getDataBySite($site->site_Id);
//            $out = json_decode(json_encode($site), true);
//            $out['Datas'] = json_decode(json_encode($dataSites), true);
//            $finalSites[] = $out;
//        }
//        return json_encode($finalSites);
//    }

    public function showFullSiteById(Request $request, Response $response)
    {
        $myId = $request->site_Id;
        $site = Site::getOneSite($myId);
        $problem = Ticket::getOneProblemDataBySiteId($myId);
        $problemDatas = [];
        foreach ($problem as $p) {
            $problemData = Ticket::getProblemsForSite($p->problemData_problemId);
            $problemDatas[] = $problemData;
        }
        $finalSite = [];
        foreach ($site as $s) {
            $out = [];
            $data = SiteData::getDataBySite($myId);
            $users = [];
            $materials = [];

            foreach ($data as $d) {
                switch ($d->siteData_key) {
                    case 'employee':
                    case 'manager':
                    case 'customer':
                        $user = Users::getUsersForSite((int)$d->siteData_column);
                        $users[] = $user;
                        break;
                    case str_starts_with($d->siteData_key, 'mat-'):
                        $material = Material::getMaterialsForSite((int)trim($d->siteData_key, 'mat-'));
                        $materials[] = $material;
                        break;
                }
            }

            $out = json_decode(json_encode($s), true);

            $out['Datas'] = count($data) > 0 ? json_decode(json_encode($data), true) : null;
            $out['Users'] = count($users) > 0 ? json_decode(json_encode($users), true) : null;
            $out['Materials'] = count($materials) > 0 ? json_decode(json_encode($materials), true) : null;
            $out['Problems'] = count($problemDatas) > 0 ? json_decode(json_encode($problemDatas), true) : null;

            $finalSite = $out;
        }
        return json_encode($finalSite);
    }

    /**
     *  @OA\Post(
     *     path="/sites",
     *     summary="Post a Site",
     *     tags={"Sites"},
     *     description="Post a Site",
     *     security={{ "apiAuth": {} }},
     *     @OA\RequestBody(ref="#/components/requestBodies/PostSite"),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(ref="#/components/schemas/Site")
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
        $myNumberSite = ParameterHelper::testNumberSite($this, $request, $response, true);
        if ($myNumberSite === null) {
            return $response;
        }

        $myDateStart = Functions::fromUnix(ParameterHelper::testSiteDateStart($this, $request, $response, false) ?? time());
        if ($myDateStart === null) {
            return $response;
        }

        $myDateEnd = Functions::fromUnix(ParameterHelper::testSiteDateEnd($this, $request, $response, true));
        if ($myDateEnd === null) {
            return $response;
        }

        if (Site::getSiteByNumberSite($myNumberSite) !== null) {
            return $this->notAcceptableResponse($response, 'number site exist');
        }

        $mySite = new Site();
        $mySite->setNumberSite($myNumberSite);
        $mySite->setDateStart($myDateStart);
        $mySite->setDateEnd($myDateEnd);

        if (Site::addSite($mySite)) {
            return $this->okResponse($response, $mySite->toArray());
        }
        return $this->internalServerErrorResponse($response, 'Can\'t add site');
    }

    /**
     * @OA\Put(
     *     path="/sites/update",
     *     summary="Update Site",
     *     description="Update Site with Site Model in body",
     *     security={{ "apiAuth": {} }},
     *     tags={"Sites"},
     *     @OA\RequestBody(ref="#/components/requestBodies/UpdateSite"),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(ref="#/components/schemas/Site")
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
        $mySiteId = $this->getParam($request, 'site_id');
        $mySite = Site::getSiteById($mySiteId);
        if ($mySite === null) {
            return $this->notFoundResponse($response, 'site');
        }

        $myNumberSite = ParameterHelper::testNumberSite($this, $request, $response, false);
        if ($myNumberSite !== null) {
            $numberSite = Site::getSiteByNumberSite($myNumberSite);
            if ($numberSite !== null && $numberSite->getId() === $mySite->getId()) {
                $mySite->setNumberSite($myNumberSite);
            } elseif ($numberSite === null) {
                $mySite->setNumberSite($myNumberSite);
            } else {
                return $this->notAcceptableResponse($response, 'number site exist');
            }

        }

        $myDateStart = Functions::fromUnix(ParameterHelper::testSiteDateStart($this, $request, $response, false));
        if ($myDateStart !== null) {
            $mySite->setDateStart($myDateStart);
        }

        $myDateEnd = Functions::fromUnix(ParameterHelper::testSiteDateEnd($this, $request, $response, false));
        if ($myDateEnd !== null) {
            $mySite->setDateEnd($myDateEnd);
        }

        if (Site::updateSite($mySite)) {
            return $this->okResponse($response, $mySite->toArray());
        }
        return $this->internalServerErrorResponse($response, 'Can\'t update site');
    }

    /**
     * @OA\Delete(
     *     path="/sites/delete/{siteId}",
     *     summary="Delete Site",
     *     tags={"Sites"},
     *     description="Delete a Site, update site.deleted_at",
     *     security={{ "apiAuth": {} }},
     *     @OA\Parameter(
     *          name="siteId",
     *          description="Site Id",
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
     * @param string $siteId
     * @return Response
     */
    public function deleteAction(Request $request, Response $response, string $siteId): Response
    {
        $mySite = Site::getSiteById($siteId);
        if ($mySite === null) {
            return $this->notFoundResponse($response, 'site');
        }
        if (Site::deleteSite($mySite)) {
            return $this->okResponse($response);
        }
        return $this->internalServerErrorResponse($response, 'Can\'t remove site');

    }

}
