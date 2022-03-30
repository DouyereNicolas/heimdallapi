import Materials from "../models/Materials";
import MaterialData from "../models/MaterialData";
import {Url} from "../models/utils/Url";


export async function getAllMaterial() {

    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/material/getAll", { mode: "cors" ,headers:
    { 'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0" }})

    .then(response => response.json())
}


export async function getMaterialCata(id: number) {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/material/data/getCat/" + id, {
        mode: "cors",
        method: 'GET',
        headers: { 'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0" }
    })
        .then(response => response.json())
}

export async function getAllMaterialCategory() {

    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/material/category/getAll", {mode: "cors",
    method: 'GET',
    headers:
        { 'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0" }})
    
        .then(response => response.json())
}

export async function getFullMaterials(): Promise<Materials[]> {
    return await fetch( Url.GET_ALL_MATERIALS_URL, {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': localStorage.getItem('token') ? "bearer" + localStorage.getItem('token') : '0' }
    } ).then(response => response.json());
}

export async function getOneMaterialWithData(id: number): Promise<Materials> {
    return await fetch( 'http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/material/getDetail/' + id, {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': localStorage.getItem('token') ? "bearer" + localStorage.getItem('token') : '0'}
    } ).then(response => response.json());
}

export async function getOneMaterial(id: number) {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/material/get/" + id, {
        mode: "cors",
        method: 'GET',
        headers:
            { 'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0" }
    })
        .then(response => response.json())
}


export async function postMaterials(material: Materials) {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/material/post", {
        mode: "cors", method: "POST", body: JSON.stringify({ "material_ref": material.material_ref }),
        headers:
        {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(response => response.json());
}


export async function deleteOneMaterial(id: number) {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/material/delete/" + id, {
        mode: "cors",
        method: 'DELETE',
        headers: { 'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0" }
    })
        .then(response => response.json())
}
export async function updateOneMaterial(material: Materials) {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/material/put", {
        mode: "cors",
        method: 'PUT',
        body: JSON.stringify({ "material_id": material.material_id, "material_ref": material.material_ref, }),
        headers: { 'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0", 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
}


////////DATA

export async function postDataMaterial(data: MaterialData) {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/material/data/post", {
        mode: "cors",
        method: 'POST',
        body: JSON.stringify({ "materialData_materialId": data.materialData_materialId, "materialData_key": data.data_key, "materialData_column": data.data_column }),
        headers: { 'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0", 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
}


export async function getAllMaterialData(id: number) {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/material/data/getAll/" + id, {
        mode: "cors",
        method: 'GET',
        headers: { 'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0" }
    })
        .then(response => response.json())
}

export async function updateOneMaterialData(data: MaterialData) {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/material/data/put", {
        mode: "cors",
        method: 'PUT',
        body: JSON.stringify({ "materialData_id": data.materialData_id, "materialData_materialId": data.materialData_materialId, 
        "data_key": data.data_key, "data_column": data.data_column }),
        headers: { 'Authorization': localStorage.getItem('token') ? "bearer " + localStorage.getItem('token') : "0", 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
}
