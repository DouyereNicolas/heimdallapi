import React, { FunctionComponent, useEffect, useState } from "react";
import {  useHistory } from "react-router-dom";
import Task from "../../models/tasks";
import {  addTaskData,   modifyTask,  supprTaskData } from "../../services/tasksServices";





type Props = {
    task: Task,
    taskData: [],
    users: [],
    sites: []
}
const FormModifyTask: FunctionComponent<Props> = ({ task, taskData, users, sites }) => {
    
    const history = useHistory();
    const [taskModify, setTaskModify] = useState("")
    const [dateStartModify, setDateStartModify] = useState("")
    const [heureStartModify, setHeureStartModify] = useState("")
    const [dateEndModify, setDateEndModify] = useState("")
    const [heureEndModify, setHeureEndModify] = useState("")
    const [userId, setUserId] = useState("")
    const [detail, setDetail] = useState("")
    const [siteId, setSiteId] = useState("")
    const [name, setName] = useState("")
    const [errorDate, setErrorDate] = useState("")
    const [errorHeureStart, setErrorHeureStart] = useState("")
    const [errorHeureEnd, setErrorHeureEnd] = useState("")
    const [errorTitle, setErrorTitle] = useState("")
    const [form, setForm] = useState<Form>({
        taskTitle: { value: null },
        dateStart: { value: null },
        dateEnd: { value: null },
        heureStart: { value: null },
        heureEnd: { value: null },
        details: { value: null }
    });
    var test;

    useEffect(() => {

        taskData.map((data) => {
            if (data.taskData_key === "user_id") {
                setUserId(data.taskData_column)
            }
            else if (data.taskData_key === "site_id") {
                setSiteId(data.taskData_column)
            }
            else if (data.taskData_key === "Description") {
                setDetail(data.taskData_column)
            } else if (data.taskData_key === "nameUser") {
                setName(data.taskData_column)
            }
            return 0 ;
        })
        if (task) {
            var concaStart = task.task_dateStart.split(" ")
            setDateStartModify(concaStart[0])
            setHeureStartModify(concaStart[1])

            var concaEnd = task.task_dateEnd.split(" ")
            setDateEndModify(concaEnd[0])
            setHeureEndModify(concaEnd[1])
            setTaskModify(task)
        }
    }, [task, taskData]);



    const handleSelectedChange = (e: React.FocusEvent<HTMLSelectElement>) => {
        if (e.target.name === "site") {
            setSiteId(e.target.value)
        } else if (e.target.name === "users") {
            setUserId(e.target.value)
            setName(e.target.selectedOptions[0].text)
        }


        const fieldName: string = e.target.name;
        let fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue } };

        if (fieldName === "users") {

        }

        setForm({ ...form, ...newField });
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === "dateStart") {
            setDateStartModify(e.target.value)
        } else if (e.target.name === "dateEnd") {
            setDateEndModify(e.target.value)
        } else if (e.target.name === "heureStart") {
            setHeureStartModify(e.target.value)

        } else if (e.target.name === "heureEnd") {
            setHeureEndModify(e.target.value)
        } else if (e.target.name === "details") {
            setDetail(e.target.value)
        }
        else if (e.target.name === "taskTitle") {
            taskModify.task_title = e.target.value
        }
        const fieldName: string = e.target.name;
        let fieldValue: string = e.target.value;

        const newField: Field = { [fieldName]: { value: fieldValue } };
        setForm({ ...form, ...newField });
    }
    const handleSubmitModify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var day = now.getDate()
        var heure = now.getHours();
        var minute = now.getMinutes();
        var date = year + "-" + (month + 1) + "-" + day + " " + heure + ":" + minute + ":00"
        let heureStart = heureStartModify
        let heureEnd = heureEndModify
        var DateStart = dateStartModify + " " + heureStart
        var DateEnd = dateEndModify + " " + heureEnd

        if (taskModify.task_title !== "" && heureStartModify !== "" && heureEndModify !== "" && dateStartModify !== "" && dateEndModify !== "") {

            setErrorHeureStart("")
            setErrorHeureEnd("")
            setErrorDate("")
            setErrorTitle("")

            if (DateStart <= DateEnd) {
                var arrTask = { "task_id": taskModify.task_id, "task_title": taskModify.task_title, "task_dateStart": DateStart, "task_dateEnd": DateEnd, "updated_at": date }
                modifyTask(arrTask)
                taskData.map((data) => {
                    console.log(data)
                    supprTaskData(data.taskData_id)
                    return 0;
                })
                if (siteId !== "Site") {
                    var arrDataSite = { "taskData_taskId": taskModify.task_id, "taskData_key": "site_id", "taskData_column": siteId }
                    addTaskData(arrDataSite)
                }
                if (userId !== "User") {
                    var arrDataUser = { "taskData_taskId": taskModify.task_id, "taskData_key": "user_id", "taskData_column": userId }
                    var arrName = { "taskData_taskId": taskModify.task_id, "taskData_key": "nameUser", "taskData_column": name }
                    addTaskData(arrDataUser)
                    addTaskData(arrName)
                }
                if (detail !== "") {
                    var arrDataDetail = { "taskData_taskId": taskModify.task_id, "taskData_key": "Description", "taskData_column": detail }
                    addTaskData(arrDataDetail)
                }
                history.push('/planning')
            }
        } else {

            if (dateStartModify === "" || dateEndModify === "") {
                setErrorDate("Date non valide")
            }
            if (heureStartModify === "") {
                setErrorHeureStart("Heure non valide")
            }
            if (heureEndModify === "") {
                setErrorHeureEnd("Heure non valide")
            }
            if (taskModify.task_title === "") {
                setErrorTitle("Titre manquant")
            }
        }
    }

    return (
        <>
            <div className="hero-site">

                <form className="mt-5 d-flex justify-content-center" onSubmit={e => handleSubmitModify(e)}>
                    <div className="row">
                        <div className="col-12 m8">
                            <div className="card hoverable" id="cardGeneral">
                                <h2 className="text-center">Modifier la tache {taskModify ? taskModify.task_title : ""}</h2>
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="taskTitle">Titre de la tache</label>
                                        <input id="taskTitle" className="form-control" value={taskModify ? taskModify.task_title : ""} name="taskTitle" type="text" onChange={e => handleInputChange(e)} />
                                    </div>
                                    <div className="red accent-1">
                                        {errorTitle}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="dateStart">Date de début de la tache</label>
                                        <input id="dateStart" className="form-control" name="dateStart" value={dateStartModify ? dateStartModify : ""} type="date" onChange={e => handleInputChange(e)} />
                                    </div>
                                    <div className="red accent-1">
                                        {errorDate}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="heureStart">Heure de début de la tache</label>
                                        <input id="heureStart" className="form-control" placeholder="10:00" value={heureStartModify ? heureStartModify : ""} name="heureStart" min="00:00" max="23:59" onClick={e => { e.target.value = ""; setHeureStartModify("") }} type="time" onChange={e => handleInputChange(e)} />
                                    </div>
                                    <div className="red accent-1">
                                        {errorHeureStart}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="dateEnd">Date de fin de la tache</label>
                                        <input id="dateEnd" className="form-control" name="dateEnd" value={dateEndModify ? dateEndModify : ""} type="date" onChange={e => handleInputChange(e)} />
                                    </div>
                                    <div className="red accent-1">
                                        {errorDate}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="heureEnd">Heure de fin de la tache</label>
                                        <input id="heureEnd" className="form-control" placeholder="10:00" value={heureEndModify ? heureEndModify : ""} name="heureEnd" min="00:00" max="23:59" onClick={e => { e.target.value = ""; setHeureEndModify("") }} type="time" onChange={e => handleInputChange(e)} />
                                    </div>
                                    <div className="red accent-1">
                                        {errorHeureEnd}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="details">detail de la tache (facultatif)</label>
                                        <input id="details" className="form-control" value={detail ? detail : ""} name="details" type="text" onChange={e => handleInputChange(e)} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="site">Site (facultatif)</label>
                                        <select id="site" name="site" style={{ display: 'block' }}
                                            onBlur={e => { handleSelectedChange(e) }}>
                                            <option >Site </option>
                                            {sites.map((site) => (
                                                <option selected={siteId === site.site_id ? true : false} key={site.site_id} value={site.site_id}>{"Site " + site.site_number_site}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {console.log(users)}
                                    <div className="form-group">
                                        <label htmlFor="users">User (facultatif)</label>
                                        <select id="users" name="users" style={{ display: 'block' }}
                                            onBlur={e => { handleSelectedChange(e) }}>
                                            <option >User</option>
                                            {users.length !== 0 ? users.map((client) => (

                                                <option selected={userId === client.id ? true : false} key={client.id} value={client.id}>{client.data.map((data) => {

                                                    if (data.userData_userId === client.id) {
                                                        if (data.userData_key === "Nom") {
                                                            test = data.userData_column;
                                                        }
                                                        if (data.userData_key === "Prénom") {
                                                            test = test + " " + data.userData_column;
                                                        }
                                                    }return 0;
                                                })}
                                                    {test}</option>
                                            )) : null}
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-lg btnLogin">Valider</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </>
    )
}

export default FormModifyTask;