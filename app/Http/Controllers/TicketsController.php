<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\TicketData;
use App\Models\Utils\ParameterHelper;
use DateTime;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;


/**
 * @OA\RequestBody(
 *      request="PostTicket",
 *      description="Post Ticket body",
 *      @OA\MediaType(
 *          mediaType="application/json",
 *          @OA\Schema(ref="#/components/schemas/PostTicketRequest")
 *      )
 *  )
 */

/**
 * @OA\RequestBody(
 *      request="UpdateTicket",
 *      description="Put Ticket body",
 *      @OA\MediaType(
 *          mediaType="application/json",
 *          @OA\Schema(ref="#/components/schemas/UpdateTicketRequest")
 *      )
 *  )
 */
class TicketsController extends Controller
{
    /**
     * @OA\Get(
     *     path="/tickets/{ticketId}",
     *     summary="Get Ticket By Id",
     *     tags={"Tickets"},
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
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(ref="#/components/schemas/TicketWithData")
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
    public function getAction(Request $request, Response $response, string $ticketId): Response
    {
        $myTicket = Ticket::getTicketById($ticketId);
        if ($myTicket === null) {
            return $this->notFoundResponse($response, 'ticket');
        }
        $myTicketArray = $myTicket->toArray();
        $myTicketArray['data'] = array_map(static function (TicketData $data): array {
            return $data->toArray();
        }, TicketData::getTicketDataByTicket($myTicket->getTicketId()));
        return $this->okResponse($response, $myTicketArray );
    }

    /**
     * @OA\Get(
     *     path="/tickets",
     *     summary="Get All Tickets",
     *     tags={"Admin", "Tickets"},
     *     security={{ "apiAuth": {} }},
     *     description="Get all tickets and ticket's data, only for director",
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  property="tickets",
     *                  type="array",
     *                  @OA\Items(ref="#/components/schemas/TicketWithData"),
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
        $myTickets = Ticket::getAllTickets();
        $myTicketResponse = [];
        foreach ($myTickets as $ticket) {
            $myTicketArray = $ticket->toArray();
            $myTicketData = TicketData::getTicketDataByTicket($ticket->getTicketId());
            $myTicketArray['data'] = $myTicketData;
            $myTicketResponse[] = $myTicketArray;
        }
        return $this->okResponse($response, $myTicketResponse);
    }

    /**
     * @OA\Post(
     *     path="/tickets",
     *     summary="Post a Ticket",
     *     tags={"Tickets"},
     *     description="Post a Ticket",
     *     security={{ "apiAuth": {} }},
     *     @OA\RequestBody(ref="#/components/requestBodies/PostTicket"),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(ref="#/components/schemas/Ticket")
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
     *
     * @param Request $request
     * @param Response $response
     * @return Response
     */
    public function postAction(Request $request, Response $response): Response
    {
        $myTicketRef = ParameterHelper::testTicketRef($this, $request, $response, true);
        if ($myTicketRef === null) {
            return $response;
        }
        $myTicket = new Ticket();
        $myTicket->setTicketRef($myTicketRef);

        if (Ticket::addTicket($myTicket)) {
            return $this->okResponse($response, $myTicket->toArray());
        }
        return $this->internalServerErrorResponse($response, 'Can\'t add ticket');
    }

    /**
     * @OA\Put(
     *     path="/tickets/update",
     *     summary="Update Ticket",
     *     description="Update Ticket with Ticket Model in body",
     *     security={{ "apiAuth": {} }},
     *     tags={"Tickets"},
     *     @OA\RequestBody(ref="#/components/requestBodies/UpdateTicket"),
     *     @OA\Response(
     *          response="200",
     *          description="Success",
     *          @OA\JsonContent(ref="#/components/schemas/Ticket")
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
        $myTicketId = $this->getParam($request, 'ticket_id');
        $myTicket = Ticket::getTicketById($myTicketId);
        if ($myTicket === null) {
            return $this->notFoundResponse($response, 'ticket');
        }
        $myTicketRef = ParameterHelper::testTicketRef($this, $request, $response, false);
        if ($myTicketRef !== null) {
            $myTicket->setTicketRef($myTicketRef);
        }
        if (Ticket::updateTicket($myTicket)) {
            return $this->okResponse($response, $myTicket->toArray());
        }
        return $this->internalServerErrorResponse($response, 'Can\'t update ticket');
    }

    /**
     * @OA\Delete(
     *     path="/tickets/delete/{ticketId}",
     *     summary="Delete Ticket",
     *     tags={"Tickets"},
     *     description="Delete a Ticket, update ticket.deleted_at",
     *     security={{ "apiAuth": {} }},
     *     @OA\Parameter(
     *          name="ticketId",
     *          description="Ticket Id",
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
     * @param string $ticketId
     * @return Response
     */
    public function deleteAction(Request $request, Response $response, string $ticketId): Response
    {
        $myTicket = Ticket::getTicketById($ticketId);
        if ($myTicket === null) {
            return $this->notFoundResponse($response, 'material');
        }
        if (Ticket::deleteTicket($myTicket)) {
            return $this->okResponse($response);
        }
        return $this->internalServerErrorResponse($response, 'Can\'t delete material');
    }


//    static function showAllProblems()
//    {
//        return response()->json(Ticket::getAllProblems(), 200);
//    }
//
//    static function deleteOneProblem(Request $request)
//    {
//        $problem_id = $request->problem_id;
//        if ($problem_id === NULL) {
//            return response()->json("invalid syntax", 400);
//        }
//        return response()->json(Ticket::deleteOneProblem($problem_id), 200);
//    }
//
//    public function postOneProblem(Request $request, Response $response)
//    {
//        $currentDate = new DateTime("NOW");
//        $problem = ['problem_ref' => $request->problem_ref, 'created_at' => $currentDate, 'updated_at' => $currentDate];
//
//        if ($request->problem_ref === NULL ) {
//            $return = response()->json('Erreur lors de l\'execution de la requete ', 400);
//        } else {
//            $requete = Ticket::createProblem($problem);
//            if ($requete == 0) {
//                $return = response()->json('la requete na pas abouti', 400);
//            } else {
//                $return =  response()->json($requete, 200);
//            }
//        }
//        return $return;
//    }
//
//    static function updateOneProblem(Request $request)
//    {
//        $updateDate = new DateTime("NOW");
//        $problem = ['problem_id' => $request->problem_id, 'problem_ref' => $request->problem_ref,'updated_at' =>$updateDate];
//        if ($request->problem_id === NULL && $request->problem_ref === NULL&& $request->updated_at === NULL) {
//            $return = response()->json('Erreur lors de l\'execution de la requete ', 400);
//        } else {
//            $requete = Ticket::updateOneProblem($problem);
//            if ($requete == 0) {
//                $return = response()->json('la requete na pas abouti', 400);
//            } else {
//                $return =  response()->json($requete, 200);
//            }
//        }
//        return $return;
//    }
//
//    static function showOneProblem(Request $request)
//    {
//        $problem_id = $request->problem_id;
//        if ($problem_id === NULL) {
//            return response()->json("invalid syntax", 400);
//        }
//        return response()->json(Ticket::getOneProblem($problem_id), 200);
//    }
//
//    static function showAllDataForOneProblem(Request $request)
//    {
//        $problemData_id = $request->problemData_id;
//        if ($problemData_id === NULL) {
//            return response()->json("invalid syntax", 400);
//        }
//        return response()->json(Ticket::getOneProblemData($problemData_id), 200);
//    }
//
//    static function showAllDataForOneProblemBySite(Request $request)
//    {
//        $problemData_id = $request->problemData_id;
//        if ($problemData_id === NULL) {
//            return response()->json("invalid syntax", 400);
//        }
//        return response()->json(Ticket::getOneProblemDataBySiteId($problemData_id), 200);
//    }
//
//    static function deleteOneProblemData(Request $request)
//    {
//        $problemData_id = $request->problemData_id;
//        if ($problemData_id === NULL) {
//            return response()->json("invalid syntax", 400);
//        }
//        return response()->json(Ticket::deleteOneProblemData($problemData_id), 200);
//    }
//
//    static function postOneProblemData(Request $request)
//    {
//        $problemData = ['problemData_problemId' => $request->problemData_problemId, 'problemData_key' => $request->problemData_key, 'problemData_column' => $request->problemData_column];
//        if ($request->problemData_problemId === NULL && $request->problemData_column === NULL && $request->problemData_key === NULL) {
//            $return = response()->json('Erreur lors de l\'execution de la requete ', 400);
//        } else {
//            $requete = Ticket::createProblemData($problemData);
//            if ($requete == 0) {
//                $return = response()->json('la requete na pas abouti', 400);
//            } else {
//                $return =  response()->json($requete, 200);
//            }
//        }
//        return $return;
//    }
//
//    static function updateOneProblemData(Request $request)
//    {
//        $problemData = ['problemData_id' => $request->problemData_id, 'problemData_problemId' => $request->problemData_problemId, 'problemData_key' => $request->problemData_key, 'problemData_column' => $request->problemData_column];
//        if ($request->problemData_id === NULL && $request->problemData_problemId === NULL && $request->problemData_column === NULL && $request->problemData_key === NULL) {
//            $return = response()->json('Erreur lors de l\'execution de la requete ', 400);
//        } else {
//            $requete = Ticket::updateProblemData($problemData);
//            if ($requete == 0) {
//                $return = response()->json('la requete na pas abouti', 400);
//            } else {
//                $return =  response()->json($requete, 200);
//            }
//        }
//        return $return;
//    }
//
//    static function showAllProblemsData(Request $request)
//    {
//        $problemId = $request->problemData_problemId;
//        if ($problemId === NULL) {
//            return response()->json("invalid syntax", 400);
//        }
//        return response()->json(Ticket::getAllProblemsData($problemId), 200);
//    }
}
