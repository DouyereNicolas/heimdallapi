import React, {FunctionComponent,useState,useEffect} from "react";
import {   getTaskByUserId, supprTask} from "../../services/tasksServices";
import Planning from "./planning";
import { Event } from 'react-big-calendar'
import { useHistory } from "react-router-dom";


const ContainerPlanning: FunctionComponent = () => {

    const history = useHistory();
    const id_user  = localStorage.getItem("user_id");


  const [events,setEvents] = useState<Event[]>([]);

  let events2 : Event[] = []
  useEffect(() => {
      if(id_user){
        getTaskByUserId(id_user).then((task) => {
          if(task !== 0){
            task.map((data) =>
            events.push({
              title:data.task_title,
              start:data.task_dateStart,
              end:data.task_dateEnd,
              ressourceId:data.task_id
            })
          )
          }
          
        });
      }
      
  }, [events , id_user]);

  function Supprimer(id : number){
    setEvents([])
    supprTask(id).then(()=>{
      if(id_user){
        getTaskByUserId(id_user).then((task) => {
          task.map((data) =>
            events2.push({
              title:data.task_title,
              start:data.task_dateStart,
              end:data.task_dateEnd,
              ressourceId:data.task_id
            })
          )
        });
      }
      setEvents(events2)
    })
    
  }

  function Modifier(id : number){
    history.push("/planning/modify/"+id)  
  }
  
    return (
      <Planning Task={events} supprimer={Supprimer} modify={Modifier}/>
    );
  }
    
  export default ContainerPlanning;
