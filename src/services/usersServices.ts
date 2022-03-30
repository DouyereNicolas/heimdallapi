import Users from "../models/Users";
import UsersData from "../models/UsersData";
import {Role} from "../models/role";
import moment from "moment";
import {Url} from "../models/utils/Url"; 

export async function login(login: string, password: string) {
    localStorage.removeItem('token');
    let token = await fetch(Url.POST_LOGIN_URL, {
        method: 'POST',
        mode: "cors",
        body: JSON.stringify({"login": login, "password": password}),
        headers: {'Content-Type': 'application/json'}
    }).then(response => response.json());
   
        if(token.message !== "Unauthorized"){
            await setToken(token);
            localStorage.setItem('user_id', token.user.id);
            localStorage.setItem('user_role', token.user.role_id);
            let validity = moment().unix() + token.expires_in;
            localStorage.setItem('token_validity', validity.toString());
            return token.user;
        }
}

export async function setToken(token: any) {
    localStorage.clear();
    localStorage.setItem('token', token.token);
}

export async function getAllUsers() {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/users/getAll", {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0"}
    })
        .then(response => response.json())
}

export async function getUserById(id: number) {

    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/users/get/" + id, {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0"}
    })
        .then(response => response.json())

}

export async function getUsersByRole(role_id: number) : Promise<Users[]> {
    return await fetch(Url.GET_USERS_BY_ROLE_URL.replace(Url.ARG_ROLE_ID, role_id.toString()), {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : '0'}
    }).then(response => response.json());
}

export async function getFullUsers(): Promise<Users[]> {
    return await fetch(Url.GET_ALL_USERS_URL, {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0"}
    }).then(response => response.json());
}

export async function getOneUserWithData(id: number): Promise<Users> {
    return await fetch( 'http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/users/getOneUserWithData/' + id, {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': localStorage.getItem('token') ? 'bearer ' + localStorage.getItem('token') : '0'}
    } ).then(response => response.json());
}

export async function postOneUser(user: Users) {
    return await fetch('http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/register', {
        mode: "cors",
        method: 'POST',
        body: JSON.stringify({
            "login": user.login,
            "password": user.password,
            "password_confirmation": user.password,
            "role_id": user.role_id
        }),
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => response.json())
}

export async function deleteOneUser(id: number) {
    return await fetch('http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/users/delete/' + id, {
        mode: "cors",
        method: 'DELETE',
        headers: {'Authorization': localStorage.getItem('token') ? "bearer" + localStorage.getItem('token') : "0"}
    })
        .then(response => response.json())
}

export async function updateOneUser(user: Users) {
    return await fetch('http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/users/put', {
        mode: "cors",
        method: 'PUT',
        body: JSON.stringify({
            "id": user.id,
            "login": user.login,
            "role_id": user.role_id,
        }),
        headers: {
            'Authorization': localStorage.getItem('token') ? "bearer" + localStorage.getItem('token') : "0",
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
}
export async function updateOneUserPassword(user: Users) {
    return await fetch('http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/users/password/put', {
        mode: "cors",
        method: 'PUT',
        body: JSON.stringify({
            "id": user.id,
            "password": user.password
        }),
        headers: {
            'Authorization': localStorage.getItem('token') ? "bearer" + localStorage.getItem('token') : "0",
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
}

export async function getAllRole() : Promise<Role[]> {
    return await fetch('http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/users/getAllRole', {
        mode: "cors",
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('token') ? "bearer" + localStorage.getItem('token') : "0",
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
}

// Data

export async function postDataUser(data: UsersData) {
    return await fetch('http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/users/data/post', {
        mode: "cors",
        method: 'POST',
        body: JSON.stringify({
            'userData_userId': data.userData_userId,
            'userData_key': data.userData_key,
            'userData_column': data.userData_column
        }),
        headers: {
            'Authorization': localStorage.getItem('token') ? 'bearer ' + localStorage.getItem('token') : '0',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
}

export async function getAllUsersData() {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/users/data", {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0"}
    })
        .then(response => response.json())

}

export async function getOneUsersData(id: number) {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/users/data/" + id, {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0"}
    })
        .then(response => response.json())

}

export async function updateOneUserData(data: UsersData) {
    return await fetch('http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/users/data/put', {
        mode: "cors",
        method: 'PUT',
        body: JSON.stringify({
            'userData_id': data.userData_id,
            'userData_userId': data.userData_userId,
            'userData_key': data.userData_key,
            'userData_column': data.userData_column
        }),
        headers: {
            'Authorization': localStorage.getItem('token') ? "bearer" + localStorage.getItem('token') : "0",
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
}
