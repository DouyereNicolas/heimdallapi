import React, { FunctionComponent, useState, useEffect } from "react";
import Task from "../../models/tasks";
import { Calendar, momentLocalizer, Event } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../../components/planning/style_planning.css'
import moment from "moment";
import { getAllDataTask } from "../../services/tasksServices";
import { Button, Modal } from "react-bootstrap";
import TaskData from "../../models/taskData";
import { Link, useHistory } from "react-router-dom";
type Props = {
    Task: Task[]
}
const Planning: FunctionComponent<Props> = ({ Task, supprimer, modify }) => {
   
    const localizer = momentLocalizer(moment);
    const history = useHistory();
    const [taskData, setTaskData] = useState<TaskData[]>([])
    const [taskId, setTaskId] = useState<number>()
    const [task, setTask] = useState<Task[]>([])
    var buttonMoi : HTMLButtonElement;
    var buttonAgenda : HTMLButtonElement;
    useEffect(() => {
        
        let collection = document.getElementsByTagName("button")
        for (let i = 0; i < collection.length; i++) {
            if (collection[i].innerHTML === "Week" || collection[i].innerHTML === "Day" || collection[i].innerHTML === "Today") {
                collection[i].style.display = "none"
            }else if(collection[i].innerHTML === "Month" ){
                collection[i].innerHTML = "Mois"
                buttonMoi = collection[i]
            }
            else if(collection[i].innerHTML === "Mois" ){
                collection[i].innerHTML = "Mois"
                buttonMoi = collection[i]
            }
            else if (collection[i].innerHTML === "Next"){
                collection[i].innerHTML = "Suiv."
            }
            else if (collection[i].innerHTML === "Back"){
                collection[i].innerHTML = "Arr."
            }else if(collection[i].innerHTML === "Agenda"){
                buttonAgenda = collection[i]
            }
            var nameMonth = document.getElementsByClassName("rbc-toolbar-label")
            for (let i = 0; i < nameMonth.length; i++) {
                console.log(nameMonth[i])
            }
        }
        
        buttonMoi ? buttonMoi.click() : console.log()
        buttonAgenda ? buttonAgenda.click() : console.log()
        buttonMoi ? buttonMoi.click() : console.log()
        setTimeout(()=>{
            buttonMoi ? buttonMoi.click() : console.log()
            var tabTextJour = ["Dimanche","Lundi","Mardi","mercredi","Jeudi","Vendredi","Samedi"]
            var divHeader = document.getElementsByClassName("rbc-header")
            for (let i = 0; i < divHeader.length; i++) {
                var elem = divHeader[i].childNodes
                for (let j=0;j<elem.length;j++){
                    elem[j].innerHTML = tabTextJour[i]
                }
            };
        }
            ,100)
    }, []);

    function detailTask(Task) {

        setShow(true)
        setTaskId(Task.ressourceId)
        setTask(Task)
        getAllDataTask(Task.ressourceId).then((data) => {

            setTaskData(data);

        })

    }

    function suppressionData() {
        supprimer(taskId)
        setShow(false)
        history.push('/planning')
    }

    function modifierTask() {
        modify(taskId, task)
    }
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    let modalDetails = document.getElementById('modalDetails')
    return (
        <div className="">
            {console.log(Task)}
            <div className="hero-auto">
                <div className="heroProblemeEnfant">
                    <h1 className="center pt-5 mt-5 text-light">Agenda</h1>
                    <Link className="btn-floating btn-large waves-effect waves-light green z-deepth-3"
                        style={{ position: 'fixed', top: '90px', right: '25px' }}
                        to="/planning/add">
                        <i className="material-icons">add</i>
                    </Link>
                    <div className="container">
                        <Modal show={show} onHide={handleClose} className="deleteModal" animation={false}>
                            <div className="text-center"><Modal.Body>Details de la tache</Modal.Body>
                                <div id="modalDetails">
                                    {taskData.map((plop) => {
                                        if (modalDetails) {
                                            if(plop.taskData_key === "site_id"){
                                                modalDetails.append(`Id du site : `)
                                                modalDetails.append(`${plop.taskData_column}`)
                                            }else if (plop.taskData_key === "nameUser"){
                                                modalDetails.append(`Nom : `)
                                                modalDetails.append(`${plop.taskData_column}`)
                                                
                                            }else if (plop.taskData_key === "Description"){
                                                modalDetails.append(`Details : `)
                                                modalDetails.append(`${plop.taskData_column}`)
                                            }
                                            
                                        }
                                    }
                                    )}
                                </div>
                                <div className="d-flex justify-content-around">
                                    <Button variant="secondary" onClick={modifierTask}>
                                        Modifier
                                    </Button>
                                    <Button variant="secondary" onClick={suppressionData}>
                                        Supprimer
                                    </Button>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Annuler
                                    </Button>
                                </div>
                            </div>
                        </Modal>
                        <div className="row">

                            <Calendar
                                localizer={localizer}
                                defaultDate={new Date()}
                                defaultView="month"
                                events={Task}
                                onSelectEvent={(Task: Event[]) => detailTask(Task)}
                                style={{ height: "100vh" }}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Planning;