import React, { FunctionComponent, useEffect, useState } from "react";
import ParametersHelper from "../../helpers/parameters-helper";
import Sites from "../../models/sites";
import { postDataProblem, postOneProblem } from "../../services/problems-service";
import SitesService from '../../services/sites-service';
import Problem from "../../models/Problem";
import ProblemData from "../../models/ProblemData";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';

const CreateProblem: FunctionComponent = () => {
    const [name, setName] = useState("");
    const [ref, setRef] = useState("");
    const [site, setSite] = useState("");
    const [description, setDescription] = useState("");
    const [allSites, setAllSite] = useState<Sites[]>([]);
    const history = useHistory();
    useEffect(() => {
        SitesService.getAllSites().then(e => setAllSite(e));
    }, []);
    let checkName: boolean = false;
    let checkDescription: boolean = false;
    let checkRef: boolean = false;
    let checkSite: boolean = false;
    if (name) {
        if (ParametersHelper.testProblemName(name) === true) {
            checkName = true;
        }
    }
    if (ref) {
        checkRef = true;
    }
    if (site) {
        if (allSites.filter(e => e.site_id === +site).length !== 0)
        checkSite = true;
    }
    if (description) {
        if (ParametersHelper.testTextLength(description) === true) {
            checkDescription = true;
        }
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (checkName === true && checkDescription === true && checkRef === true && checkSite === true) {
            var problemToPost: Problem = new Problem();
            var dataToPost: ProblemData = new ProblemData();
            problemToPost.problem_ref = ref;
            var createdId: number = -105;

            await postOneProblem(problemToPost).then(e => createdId = e);

            dataToPost.problemData_key = "Nom";
            dataToPost.problemData_column = name;
            dataToPost.problemData_problemId = createdId;
            await postDataProblem(dataToPost).then(e => e);

            dataToPost.problemData_key = "Site";
            dataToPost.problemData_column = site;
            dataToPost.problemData_problemId = createdId;
            await postDataProblem(dataToPost).then(e => e);

            dataToPost.problemData_key = "Description";
            dataToPost.problemData_column = description;
            dataToPost.problemData_problemId = createdId;
            await postDataProblem(dataToPost).then(e => e);

            toast.success('Ticket crée avec succès👍', {});
            setTimeout(function() {
                history.push(`/problems`);
            }, 5000);
        } else {
            toast.warn("Le formulaire n'est pas complet !👎", {});
        }
    }
    return (
        <div className="hero-auto">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastClassName="dark-toast"
                theme="dark" />

            <div className='heroProblemeEnfant'>
                <div className="container mt-5 pt-5 justify-content-center d-flex align-items-center h-100">
                    <form className="mt-5 " onSubmit={e => handleSubmit(e)}>
                        <div className="row">
                            <div className="col s12 m8">
                                <div className="card hoverable" id="cardGeneral">
                                    <h2 className="text-center mb-5"> Crée un Ticket</h2>
                                    <div className="card-stacked">
                                        <div className="card-content p-0">
                                            <div className="form-group">
                                                <label htmlFor="place" className="text-secondary h6">Nom du problème</label>

                                                <input id="place" className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)} />

                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="budget" className="text-secondary h6 mt-3">Référence du problème</label>
                                                <input id="budget" type="number" className="form-control" name="ref" value={ref} onChange={(e) => setRef(e.target.value)} />


                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="firstname" className="text-secondary h6 mt-3">Site associés</label>
                                                <select id="firstname" value={site} onChange={(e) => setSite(e.target.value)}>
                                                    <option value="0">Veuillez choisir un site </option>
                                                    {allSites && allSites.map((e) => (
                                                        <option value={e.site_id}>{e.site_id}</option>
                                                    ))}
                                                </select>


                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="desc" className="text-secondary h6 mt-3">Description du ticket</label>
                                                <textarea id="desc" className="form-control styleArea" name="desc" value={description} onChange={(e) => setDescription(e.target.value)}>
                                                </textarea>
                                            </div>
                                            <div className="card-action center">
                                                <button type="submit" className="btn btn-lg btnLogin">Valider</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <Link className="btn-floating btn-large waves-effect waves-light orange lighten-1 z-deepth-3"
                        style={{ position: 'fixed', top: '95px', left: '50px' }}
                        to="/problems">
                        <i className="material-icons">navigate_before</i>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CreateProblem;
