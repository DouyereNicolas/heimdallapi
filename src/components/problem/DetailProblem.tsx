import React, { FunctionComponent, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import Problem from "../../models/Problem";
import ProblemData from "../../models/ProblemData";
import { getOneProblem } from "../../services/problems-service";
import { BrowserRouter as Link } from 'react-router-dom';

type Params = { id: string };

const DetailProblem: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {

    const [name, setName] = useState("");
    const [ref, setRef] = useState<Problem>();
    const [site, setSite] = useState("");
    const [description, setDescription] = useState("");
    const [problemData, setProblemData] = useState<ProblemData[]>([]);
   
    if (problemData !== null) {
        return (
            <div className="hero">
                <div className='heroProblemeEnfant'>
                    <div className="container mt-5 pt-5 justify-content-center d-flex align-items-center h-100">
                        <div className="card hoverable" id="cardGeneral">
                        <h2 className="text-center mb-4 mt-2"> Détail du Ticket</h2>
                            <div className="card-stacked">
                                <div className="card-content">
                                            <div className="form-group">
                                                <label htmlFor="lastname" className="text-secondary h6">Nom </label>
                                                <input type="text" className="form-control" name="lastname" value={name}/>
                                            </div>

                                            <div className="form-group">
                                        <label  className="text-secondary h6">Site associé</label>
                                        <input  type="number" className="form-control" value={site} />
                                        </div>

                                        <div className="form-group">
                                        <label  className="text-secondary h6">Référence du Ticket</label>
                                        <input  type="number" className="form-control" value={ref ? ref.problem_ref : ""} />
                                        </div>

                                        <div className="form-group">
                                        <label  className="text-secondary h6">description</label>
                                        <input type="text" className="form-control" value={description}/>
                                        </div>
                                </div>
                            </div>
                        </div>
                        
            <Link className="btn-floating btn-large waves-effect waves-light orange lighten-1 z-deepth-3"
                style={{ position: 'fixed', top: '95px', left: '50px' }}
                to="/problems">
                <i className="material-icons">navigate_before</i>
            </Link>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="hero">
                <p>Aucune données du ticket a afficher !</p>
            </div>
        )
    }



    
}
export default DetailProblem;
