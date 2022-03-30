import React, { useEffect, FunctionComponent, useState } from 'react';
import { RouteComponentProps } from "react-router-dom";
import "./Login.css";
import ProblemRow from '../components/problem/ProblemRow';
import Problems from '../models/Problem';
import { getAllProblems } from '../services/problems-service';
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table'

type Params = { id: string };

const CheckProblems: FunctionComponent<RouteComponentProps<Params>> = () => {

    const [problems, setProblems] = useState<Problems[]>([]);
    useEffect(() => {
        getAllProblems().then(e => setProblems(e));
        
    }, []

    )


    return (
        <>
            <div className="heroMaterial">
                <div className='heroProblemeEnfant'>

                    <div className='container'>

                        <div className="text-center mt-5 pt-5 pb-5 titleStyle text-light">Tickets</div>
                        <Link className="btn-floating btn-large waves-effect waves-light green z-deepth-3"
                            style={{ position: 'fixed', top: '85px', right: '25px' }} to="/problems/create/"
                        >
                            <i className="material-icons">add</i>
                        </Link>
                        <Table striped hover className="table table-responsive table-hover text-center mb-5">
                            <thead>
                                <tr className="table-dark">
                                    <th scope="row" className='tdId'>Ticket id</th>
                                    <th scope="row">Référence du Ticket</th>
                                    <th scope="row">Nom du Ticket</th>
                                    <th scope="row" className='tdId'>Crée le</th>
                                    <th scope="row" className="tdId">Dernière Modification</th>
                                    <th scope="row">Détail du Ticket</th>
                                    <th scope="row">Modifier le Ticket</th>
                                    <th scope="row">Supprimer le Ticket</th>
                                </tr>
                            </thead>
                            <tbody>
                                {problems.map(e =>
                                    <>
                                        <ProblemRow problem={e} />
                                    </>
                                )}
                            </tbody>
                        </Table>
                    </div>

                </div>
            </div>
        </>
    );
}

export default CheckProblems;