import TaskData from "../models/taskData";
import Tasks from "../models/tasks";


export  async function getAllTasks(): Promise<Tasks[]> {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/plannings", {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': 'bearer ' + localStorage.getItem('token')}
    }).then(response =>  response.json());
  }

  export  async function getAllDataTask(id : Number): Promise<TaskData[]> {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/plannings/tasks/data/"+id, {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': 'bearer ' + localStorage.getItem('token')}
    }).then(response =>  response.json());
  }

  export  async function getDataByUser(id : number): Promise<TaskData[]> {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/plannings/tasks/data/user/"+id, {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': 'bearer ' + localStorage.getItem('token')}
    }).then(response =>  response.json());
  }

  export  async function getTaskById(id : number): Promise<Tasks[]> {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/plannings/tasks/search/"+id, {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': 'bearer ' + localStorage.getItem('token')}
    }).then(response =>  response.json());
  }

  export  async function getTaskByUserId(id : number): Promise<Tasks[]> {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/plannings/tasks/taskByUser/"+id, {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': 'bearer ' + localStorage.getItem('token')}
    }).then(response => {
      if(response.status === 204){
              return 0
      }else{
              return response.json()
      }
 });
  }

  export async function supprTask(id : number) {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/plannings/tasks/delete/"+id, {
        mode: "cors",
        method: 'DELETE',
        headers: {'Authorization': 'bearer ' + localStorage.getItem('token')}
    }).then(response =>  response.json());
  }

  export async function addTask(task){
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/plannings/tasks", {
      mode: "cors",
      method: 'POST',
      body : JSON.stringify(task),
      headers: {'Content-Type': 'application/json','Authorization': 'bearer ' + localStorage.getItem('token')}
  }).then(response =>  response.json());
  }

  export async function modifyTask(task){
    
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/plannings/tasks", {
      mode: "cors",
      method: 'PUT',
      body : JSON.stringify(task),
      headers: {'Content-Type': 'application/json','Authorization': 'bearer ' + localStorage.getItem('token')}
  }).then(response =>  response.json());
  }

  export async function addTaskData(data){
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/plannings/tasks/data", {
      mode: "cors",
      method: 'POST',
      body : JSON.stringify(data),
      headers: {'Content-Type': 'application/json','Authorization': 'bearer ' + localStorage.getItem('token')}
  }).then(response =>  response.json());
  }

  export  async function getTaskDataById(id : number){
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/plannings/tasks/data/"+id, {
        mode: "cors",
        method: 'GET',
        headers: {'Authorization': 'bearer ' + localStorage.getItem('token')}
    }).then(response =>  response.json());
  }

  export async function supprTaskData(id : number) {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/plannings/tasks/data/del/"+id, {
        mode: "cors",
        method: 'DELETE',
        headers: {'Authorization': 'bearer ' + localStorage.getItem('token')}
    }).then(response =>  response.json());
  }

  export async function modifyTaskData(data){
    
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/plannings/tasks/data", {
      mode: "cors",
      method: 'PUT',
      body : JSON.stringify(data),
      headers: {'Content-Type': 'application/json','Authorization': 'bearer ' + localStorage.getItem('token')}
  }).then(response =>  response.json());
  }
 
  export async function supprTaskDataByTaskId(id : number) {
    return await fetch("http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/plannings/tasks/data/delByTaskId/"+id, {
        mode: "cors",
        method: 'DELETE',
        headers: {'Authorization': 'bearer ' + localStorage.getItem('token')}
    }).then(response =>  response.json());
  }

  
