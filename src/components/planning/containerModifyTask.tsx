
import React, {FunctionComponent, useEffect, useState} from "react";
import {RouteComponentProps} from "react-router-dom";

import SitesService from "../../services/sites-service";
import {  getTaskById, getTaskDataById } from "../../services/tasksServices";
import {getFullUsers} from "../../services/usersServices"

import FormModifyTask from "./ModifyTask";
type Params = { id: string };

const ContainerModifyTask: FunctionComponent<RouteComponentProps<Params>> = ({match}) => {
    
    const [taskModify, setTaskModify] = useState();
    const [taskModifyData, setTaskModifyData] = useState([])
    const [users, setUsers] = useState([])
    const [sites, setSites] = useState([])
    
    useEffect(() => {
        const getAll = async () => {
            await getTaskById(+match.params.id).then((reponse)=>{
                reponse.map((r)=>setTaskModify(r))
            })
            await getTaskDataById(+match.params.id).then((reponse)=>{
                setTaskModifyData(reponse)
            })
            await getFullUsers().then((reponse)=>{
                setUsers(reponse)
            })
            await SitesService.getAllSites().then((site)=>{
                setSites(site)
            })
        }
        getAll()
    }, [match.params.id]);

    return(
        <>
        <div className="hero-auto">
           
            <div className="container mt-5">
                <div className="mt-5">
                    <FormModifyTask task={taskModify} taskData={taskModifyData} users={users} sites={sites}/>
                </div>
            </div>
        </div>
        </>
            )
}

export default ContainerModifyTask;