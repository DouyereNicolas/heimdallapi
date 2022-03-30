import React, { FunctionComponent, useEffect, useState } from "react";
import ParametersHelper from "../../helpers/parameters-helper";
import Sites from "../../models/sites";
import { getOneProblem, updateOneDataProblem, updateOneProblem } from "../../services/problems-service";
import SitesService from '../../services/sites-service';
import Problem from "../../models/Problem";
import { RouteComponentProps } from "react-router-dom";
import ProblemData from "../../models/ProblemData";
import { BrowserRouter as Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';

type Params = { id: string };

const UpdateProblem: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {

    const [name, setName] = useState("");
    const [ref, setRef] = useState("");
    const [problem, setProblem] = useState<Problem>( new Problem());
    const [site, setSite] = useState("");
    const [description, setDescription] = useState("");
    const [allSites, setAllSite] = useState<Sites[]>([]);
    const [nameId, setNameId] = useState("");
    const [siteId, setSiteId] = useState("");
    const [descriptionId, setDescriptionId] = useState("");
    const history = useHistory();
    useEffect(() => {
        async function yes() {
            await SitesService.getAllSites().then(tt => setAllSite(tt));
            await getOneProblem(parseInt(match.params.id)).then(tt => setProblem(tt));
        }
        yes();
    }, [match.params.id]);


    let checkName: boolean = false;
    let checkDescription: boolean = false;
    let checkRef: boolean = false;
    let checkSite: boolean = false;

    if (name) {
        if (ParametersHelper.testProblemName(name) === true) {
            checkName = true;       
        }
    }
    if (ref)
    {
        checkRef = true;
    }
    if (site) {
        if (allSites.filter(e => e.site_id === +site).length !== 0) {
            checkSite = true;
        }

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

            problemToPost.problem_id = parseInt(match.params.id);
            problemToPost.problem_ref = problem.problem_ref;

            await updateOneProblem(problemToPost).then(e => e);

            dataToPost.problemData_id = parseInt(nameId);
            dataToPost.problemData_key = "Nom";
            dataToPost.problemData_column = name;
            dataToPost.problemData_problemId = parseInt(match.params.id);
            await updateOneDataProblem(dataToPost).then(e => e);

            dataToPost.problemData_id = parseInt(siteId);
            dataToPost.problemData_key = "Site";
            dataToPost.problemData_column = site;
            dataToPost.problemData_problemId = parseInt(match.params.id);
            await updateOneDataProblem(dataToPost).then(e => e);

            dataToPost.problemData_id = parseInt(descriptionId);
            dataToPost.problemData_key = "Description";
            dataToPost.problemData_column = description;
            dataToPost.problemData_problemId = parseInt(match.params.id);
            await updateOneDataProblem(dataToPost).then(e => e);
            toast.success('Ticket mis à jours avec succès👍', {});
            setTimeout(function() {
                history.push(`/problems`);
            }, 5000);

        }else {
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
                <div className="container mt-5 pt-5 justify-content-center d-flex">
                    <form className="mt-5 " onSubmit={e => handleSubmit(e)}>
                        <div className="row">
                            <div className="col s12 m8">
                                <div className="card hoverable" id="cardGeneral">
                                    <h2 className="text-center mb-4"> Modifier un Ticket</h2>
                                    <div className="card-stacked p-0">
                                        <div className="card-content">
                                            <div className="form-group">
                                                <label htmlFor="place" className="text-secondary">Nom du problème</label>

                                                
                                                {problem.data ?
                                                        problem.data.map(datas => (datas.problemData_key === "Nom" ?
                                                        <input id="place" className="form-control" name="name" value=  {datas.problemData_column}onChange={(e) => setName(e.target.value)} />
                                                            : ""
                                                        ))
                                                        : ""
                                                    } 

                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="budget" className="text-secondary">Référence du problème</label>
                                                
                                                        
                                                <input id="budget" type="number" className="form-control" name="ref" value={problem.problem_ref} onChange={(e) => setRef(e.target.value)} />
                                            

                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="firstname" className="text-secondary">Site associés</label>
                                                <select id="firstname" value={site} onChange={(e) => setSite(e.target.value)}>
                                                    {allSites && allSites.map((e) => (
                                                        <option value={e.site_id}>{e.site_id}</option>
                                                    ))}
                                                </select>


                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="desc" className="text-secondary">Description du problème</label>
                                                {problem.data ?
                                                        problem.data.map(datas => (datas.problemData_key === "Description" ?
                                                        <textarea id="desc" className="form-control styleArea" name="desc" value={datas.problemData_column} onChange={(e) => setDescription(e.target.value)}>
                                                </textarea>
                                                            : ""
                                                        ))
                                                        : ""
                                                    } 

                                               
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
                </div>
            </div>
            <Link className="btn-floating btn-large waves-effect waves-light orange lighten-1 z-deepth-3"
                style={{ position: 'fixed', top: '95px', left: '50px' }}
                to="/problems">
                <i className="material-icons">navigate_before</i>
            </Link>
        </div>

    );
}

export default UpdateProblem;
