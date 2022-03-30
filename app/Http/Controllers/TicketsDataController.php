<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\TicketData;
use App\Models\Utils\ParameterHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * @OA\RequestBody(
 *     request="PostTicketData",
 *     description="Post ticket data body",
 *     @OA\MediaType(
 *          mediaType="application/json",
 *          @OA\Schema(ref="#/components/schemas/PostTicketDataRequest")
 *      )
 * )
 */

/**
 * @OA\RequestBody(
 *     request="UpdateTicketData",
 *     description="Update Ticket data body",
 *     @OA\MediaType(
 *          mediaType="application/json",
 *          @OA\Schema(ref="#/components/schemas/UpdateTicketDataRequest")
 *      )
 * )
 */

class TicketsDataController extends Controller
{

    /**
     * @OA\Get(
     *     path="/tickets/data/{dataId}",
     *     summary="Get TicketData By Id",
     *     tags={"TicketsData"},
     *     security={{ "apiAuth": {} }},
     *     @OA\Parameter(
     *          name="dataId",
     *          description="TicketData id",
     *          required=true,
     *          in="path"
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(ref="#/components/schemas/TicketData")
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
        $myTicketData = TicketData::getTicketDataById($dataId);
        if ($myTicketData === null) {
            return $this->notFoundResponse($response, 'ticket data');
        }
        return $this->okResponse($response, $myTicketData->toArray());
    }

    /**
     * @OA\Get(
     *     path="/tickets/data/all",
     *     summary="Get All TicketData ",
     *     tags={"TicketsData"},
     *     security={{ "apiAuth": {} }},
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="ticketData",
     *                  type="array",
     *                  @OA\Items(ref="#/components/schemas/TicketData"),
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
        return $this->okResponse($response, array('ticketData' => array_map(static function(TicketData $data): array {
            return $data->toArray();
        }, TicketData::getAllTicketData())));
    }

    /**
     * @OA\Get(
     *     path="/tickets/data/ticket/{ticketId}",
     *     summary="Get TicketData By Ticket",
     *     tags={"TicketsData"},
     *     security={{ "apiAuth": {} }},
     *     @OA\Parameter(
     *          name="ticketId",
     *          description="Ticket id",
     *          required=true,
     *          in="path"
     *     ),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="ticketData",
     *                  type="array",
     *                  @OA\Items(ref="#/components/schemas/TicketData"),
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
     * @param string $ticketId
     * @return Response
     */
    public function getsByTicketAction(Request $request, Response $response, string $ticketId): Response
    {
        if (Ticket::getTicketById($ticketId) === null) {
            return $this->notFoundResponse($response, 'ticket');
        }
        return $this->okResponse($response, array( 'ticketData' => array_map(static function(TicketData $data): array {
            return $data->toArray();
        }, TicketData::getTicketDataByTicket($ticketId))));
    }

    /**
     * @OA\Post(
     *     path="/tickets/data",
     *     summary="Post Ticket Data",
     *     description="Post a ticket data, only director",
     *     tags={"TicketsData"},
     *     security={{ "apiAuth": {} }},
     *     @OA\RequestBody(ref="#/components/requestBodies/PostTicketData"),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(ref="#/components/schemas/TicketData")
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
        $myDataTicketId = ParameterHelper::testDataTicketId($this, $request, $response, true);
        if ($myDataTicketId === null) {
            return $response;
        }
        if (Ticket::getTicketById($myDataTicketId) === null) {
            return $this->notFoundResponse($response, 'ticket');
        }
        $myTicketDataKey = ParameterHelper::testDataKey($this, $request, $response, 'problemData_key', true);
        if ($myTicketDataKey === null) {
            return $response;
        }
        $myTicketDataColumn = ParameterHelper::testDataColumn($this, $request, $response, 'problemData_column', true);
        if ($myTicketDataColumn === null) {
            return $response;
        }

        $myTicketData = new TicketData();
        $myTicketData->setDataTicketId($myDataTicketId);
        $myTicketData->setDataKey($myTicketDataKey);
        $myTicketData->setDataColumn($myTicketDataColumn);

        if (TicketData::addTicketData($myTicketData)) {
            return $this->okResponse($response, $myTicketData->toArray());
        }
        return $this->internalServerErrorResponse($response, 'Can\'t add ticket data');
    }

    /**
     * @OA\Put(
     *     path="/tickets/data/update",
     *     summary="Update TicketData",
     *     description="Update TicketData with TicketData Model in body",
     *     security={{ "apiAuth": {} }},
     *     tags={"TicketsData"},
     *     @OA\RequestBody(ref="#/components/requestBodies/UpdateTicketData"),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(ref="#/components/schemas/TicketData")
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
     *
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function putAction(Request $request, Response $response): Response
    {
        $myDataId = $this->getParam($request, 'problemData_id');
        $myTicketData = TicketData::getTicketDataById($myDataId);
        if ($myTicketData === null) {
            return $this->notFoundResponse($response, 'ticket data');
        }
        $myDataTicketId = ParameterHelper::testDataTicketId($this, $request, $response, false);
        if ($myDataTicketId !== null) {
            $myTicketData->setDataTicketId($myDataTicketId);
        }
        $myDataKey = ParameterHelper::testDataKey($this, $request, $response, 'problemData_key',false);
        if ($myDataKey !== null) {
            $myTicketData->setDataKey($myDataKey);
        }
        $myDataColumn = ParameterHelper::testDataColumn($this, $request, $response, 'problemData_column', false);
        if ($myDataColumn !== null) {
            $myTicketData->setDataColumn($myDataColumn);
        }

        if (TicketData::updateTicketData($myTicketData)) {
            return $this->okResponse($response, $myTicketData->toArray());
        }

        return $this->internalServerErrorResponse($response, 'Can\'t update material data');
    }

    /**
     * @OA\Delete(
     *     path="/tickets/data/delete/{dataId}",
     *     summary="Delete TicketData",
     *     tags={"TicketsData"},
     *     description="Delete a TicketData",
     *     security={{ "apiAuth": {} }},
     *     @OA\Parameter(
     *          name="dataId",
     *          description="TicketData Id",
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
        if (TicketData::getTicketDataById($dataId) === null) {
            return $this->notFoundResponse($response, 'ticket data');
        }

        if (TicketData::deleteTicketData($dataId)) {
            return $this->okResponse($response);
        }
        return $this->internalServerErrorResponse($response, 'Can\'t remove ticket data');
    }

}
