
import React, { FunctionComponent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { addTask, addTaskData } from "../../services/tasksServices";
import SitesService from "../../services/sites-service";
import { getFullUsers } from "../../services/usersServices"
import { BrowserRouter as  Link } from 'react-router-dom';

type Form = {
    taskTitle: Field,
    dateStart: Field,
    heureStart: Field,
    heureEnd: Field,
    dateEnd: Field,
    details: Field,
    site: Field,
    client: Field
}

const TaskForm: FunctionComponent = () => {
    
    const history = useHistory();
    const [errorDate, setErrorDate] = useState("")
    const [errorHeure, setErrorHeure] = useState("")
    const [errorTitle, setErrorTitle] = useState("")
    
    const [sites, setSites] = useState([])
    const [clients, setClients] = useState([])
    const [name, setName] = useState("")
    var test;
    const [form, setForm] = useState<Form>({
        taskTitle: { value: null },
        dateStart: { value: null },
        dateEnd: { value: null },
        heureStart: { value: null },
        heureEnd: { value: null },
        details: { value: null },
        site: { value: null },
        client: { value: null }
    });

    useEffect(() => {
        async function site() {
            await SitesService.getAllSites().then((site) => {
                setSites(site)
            })
        }
        async function user(){
            await getFullUsers().then((user)=>{

                setClients(user)

            })
        }
        site();
        user();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        
        
        const fieldName: string = e.target.name;
        let fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue } };

        setForm({ ...form, ...newField });
    }

    const handleSelectedChange = (e: React.FocusEvent<HTMLSelectElement>) => {

        const fieldName: string = e.target.name;
        let fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue } };
        if (fieldName === "client") {
            setName(e.target.selectedOptions[0].text)
        }

        setForm({ ...form, ...newField });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        setErrorHeure("")
        setErrorDate("")
        setErrorTitle("")
        e.preventDefault();
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var day = now.getDate()
        var heure = now.getHours();
        var minute = now.getMinutes();
        var date = year + "-" + (month + 1) + "-" + day + " " + heure + ":" + minute + ":00"
        let heureStart = form.heureStart.value + ":00"
        let heureEnd = form.heureEnd.value + ":00"
        var DateStart = form.dateStart.value + " " + heureStart
        var DateEnd = form.dateEnd.value + " " + heureEnd
        let arrTask = { "task_title": form.taskTitle.value, "task_dateStart": DateStart, "task_dateEnd": DateEnd, "user_id": localStorage.getItem("user_id"), "created_at": date, "updated_at": date }

        if (form.taskTitle.value != null && form.heureStart.value != null && form.heureEnd.value != null && form.dateStart.value != null && form.dateEnd.value != null) {
            setErrorHeure("")
            if (DateStart <= DateEnd) {
                setErrorDate("")
                var arrDataTask
                var returnAdd = await addTask(arrTask)
                if (form.details.value !== null) {
                    arrDataTask = { "taskData_taskId": returnAdd, "taskData_key": "Description", "taskData_column": form.details.value }
                    addTaskData(arrDataTask)
                }
                if (form.site.value !== null) {

                     arrDataTask = { "taskData_taskId": returnAdd, "taskData_key": "site_id", "taskData_column": form.site.value }
                    addTaskData(arrDataTask)
                }
                if (form.client.value !== null) {

                     arrDataTask = { "taskData_taskId": returnAdd, "taskData_key": "user_id", "taskData_column": form.client.value }
                    addTaskData(arrDataTask)
                    arrDataTask = { "taskData_taskId": returnAdd, "taskData_key": "nameUser", "taskData_column": name }
                    addTaskData(arrDataTask)
                }
                history.push('/planning')
            } else {
                setErrorDate("Date non valide")
            }
        } else {

            if (form.dateStart.value === null || form.dateEnd.value === null) {
                setErrorDate("Date non valide")
            }
            if (form.heureEnd.value === null || form.heureStart.value === null) {
                setErrorHeure("Heure non valide")
            }
            if (form.taskTitle.value === null) {
                setErrorTitle("Titre manquant")
            }
        }



    }
    return (
        <>
        <div className="hero-auto">
            <div className='heroProblemeEnfant'>
                <div className="">
                    <div className="container">
                        <div className="mt-5">
                            <form className="mt-5 pt-5" onSubmit={e => handleSubmit(e)}>
                                <h2 className="text-center text-light mb-4 mt-5"> Ajouter une tache</h2>
                                <div className="row">
                                    <div className="col m8">
                                        <div className="card hoverable" id="cardGeneral">
                                            <div className="card-stacked">
                                                <div className="card-content p-0">
                                                    <div className="form-group">
                                                        <label htmlFor="taskTitle">Titre de la tache</label>
                                                        <input id="taskTitle" className="form-control" name="taskTitle" type="text" onChange={e => handleInputChange(e)} />
                                                        <div className="red accent-1">
                                                            {errorTitle}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="dateStart">Date de début de la tache</label>
                                                        <input id="dateStart" className="form-control" name="dateStart" type="date" onChange={e => handleInputChange(e)} />
                                                        <div className="red accent-1">
                                                            {errorDate}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="heureStart">Heure de début de la tache</label>
                                                        <input id="heureStart" className="form-control" placeholder="10:00" name="heureStart" min="00:00" max="23:59" onClick={e => e.target.value = ""} type="time" onChange={e => handleInputChange(e)} />
                                                        <div className="red accent-1">
                                                            {errorHeure}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="dateEnd">Date de fin de la tache</label>
                                                        <input id="dateEnd" className="form-control" name="dateEnd" type="date" onChange={e => handleInputChange(e)} />
                                                        <div className="red accent-1">
                                                            {errorDate}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="heureEnd">Heure de fin de la tache</label>
                                                        <input id="heureEnd" className="form-control" placeholder="10:00" name="heureEnd" type="time" min="00:00" max="23:59" onClick={e => e.target.value = ""} onChange={e => handleInputChange(e)} />
                                                        <div className="red accent-1">
                                                            {errorHeure}
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="details">detail de la tache (facultatif)</label>
                                                        <input id="details" className="form-control" name="details" type="text" onChange={e => handleInputChange(e)} />
                                                    </div>


                                                    <div className="form-group">
                                                        <label htmlFor="site">Site (facultatif)</label>
                                                        <select id="site" name="site" style={{ display: 'block' }}
                                                            onBlur={e => { handleSelectedChange(e) }}>
                                                            <option selected={true}>Site </option>
                                                            {sites.map((site) => (
                                                                <option key={site.site_id} value={site.site_id}>{"Site " + site.site_number_site}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="client">User (facultatif)</label>
                                                        <select id="client" name="client" style={{ display: 'block' }}
                                                            onBlur={e => { handleSelectedChange(e) }}>
                                                            <option selected={true}>User</option>
                                                            {clients.map((client) => (

                                                                <option key={client.id} value={client.id}>{client.data.map((data) => {

                                                                    if (data.userData_userId === client.id) {
                                                                        if (data.userData_key === "Nom") {
                                                                            test = data.userData_column;
                                                                        }
                                                                        if (data.userData_key === "Prénom") {
                                                                            test = test + " " + data.userData_column;
                                                                        }
                                                                    }
                                                                    return 0
                                                                })}
                                                                    {test}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="mt-4">
                                                        <button type="submit" className="btn btn-lg btnLogin">Valider</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link className="btn-floating btn-large waves-effect waves-light orange lighten-1 z-deepth-3"
                                        style={{ position: 'fixed', top: '95px', left: '50px' }}
                                        to="/planning">
                                        <i className="material-icons">navigate_before</i>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default TaskForm;
