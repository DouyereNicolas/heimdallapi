import Problems from "../models/Problem"
import ProblemData from "../models/ProblemData"
import { Url } from "../models/utils/Url"

export async function getAllProblems() {
    return await fetch(Url.GET_ALL_TICKET_URL, {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0"}
    })
        .then(response => response.json())
}

export async function getOneProblem(id: number) {
    return await fetch(Url.GET_TICKET_URL.replace(Url.ARG_PROBLEM_ID , id.toString()), {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0"}
    })
        .then(response => response.json())
}

export async function deleteOneProblem(id: number) {
    return await fetch(Url.DELETE_TICKET_URL.replace(Url.ARG_PROBLEM_ID , id.toString()), {
        mode: "cors",
        method: 'DELETE',
        headers: {'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0"}
    })
        .then(response => response)
}

export async function updateOneProblem(problem: Problems) {
    return await fetch(Url.UPDATE_TICKET_URL	, {
        mode: "cors",
        method: 'PUT',
        body: JSON.stringify({"problem_id": problem.problem_id, "problem_ref": problem.problem_ref,}),
        headers: {
            'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0",
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
}

export async function postOneProblem(problem: Problems) {
    return await fetch(Url.POST_TICKET_URL, {
        mode: "cors",
        method: 'POST',
        body: JSON.stringify({"problem_ref": problem.problem_ref}),
        headers: {
            'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0",
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
}


export async function postDataProblem(data: ProblemData) {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/tickets/data", {
        mode: "cors",
        method: 'POST',
        body: JSON.stringify({
            "problemData_problemId": data.problemData_problemId,
            "problemData_key": data.problemData_key,
            "problemData_column": data.problemData_column
        }),
        headers: {
            'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0",
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
}

export async function getAllProblemData() {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/problem/data/getAll", {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0"}
    })
        .then(response => response.json())
}



export async function updateOneDataProblem(data: ProblemData) {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/problem/data/put", {
        mode: "cors",
        method: 'PUT',
        body: JSON.stringify({
            "problemData_id": data.problemData_id,
            "problemData_problemId": data.problemData_problemId,
            "problemData_key": data.problemData_key,
            "problemData_column": data.problemData_column
        }),
        headers: {
            'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0",
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
}
  
