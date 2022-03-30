import React, { FunctionComponent, useState, useEffect } from "react";
import Problem from "../../models/Problem";
import ProblemData from "../../models/ProblemData";
import { useHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { deleteOneProblem } from "../../services/problems-service";
import Moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = { problem: Problem };

const ProblemRow: FunctionComponent<Props> = ({ problem }) => {

    const [name, setName] = useState("");

    const [problemData, setProblemData] = useState<ProblemData[]>([]);
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);
    const [problemId, setProblemId] = useState(-1)
    const history = useHistory();

    const updateProblem = (id: number) => {
        history.push(`/problems/update/${id}`);
    }
    const detailProblem = (id: number) => {
        history.push(`/problems/detail/${id}`);
    }
    function deleteProblem(id: number) {
        setShow(true);
        setProblemId(id);
    }

    async function confirmDelete(id: number) {
        var responseDelete = null;
        await deleteOneProblem(id).then(e => responseDelete = e)
        if (responseDelete !== null) {
            toast.success("Problème supprimer avec succès");
            setTimeout(function() {
                window.location.reload();
            }, 5000);
        }
        else {
            toast.warn("Erreur lors de la suppression du problème", {});
            setTimeout(function() {
                window.location.reload();
            }, 5000);
        }
        setShow(false);
        
    }

    if (problemData !== null) {
        return (
            <>
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

                <Modal show={show} onHide={handleClose} className="deleteModal" animation={false}>
                    <div className="text-center"><Modal.Body>Etes-vous sur de vouloir supprimer le ticket numéro {problemId} </Modal.Body>
                        <div className="d-flex justify-content-around">
                            <Button variant="secondary" onClick={handleClose}>
                                Annuler
                            </Button>
                            <Button variant="danger" onClick={() => confirmDelete(problemId)}>
                                Supprimer
                            </Button>
                        </div>
                    </div>
                </Modal>
                <tr className="table-light">
                    <td className="col text-center tdId">{problem.problem_id}</td>
                    <td className="col text-center">{problem.problem_ref}</td>
                    <td className="col text-center">{problem.data ?
                    problem.data.map(datas => (datas.problemData_key === "Nom" ?
                        <td className="text-center">{datas.problemData_column}</td>
                        : ""
                    ))
                    : ""
                }
               </td>
                    <td className="col text-center tdId">{Moment(problem.created_at.date).format('DD/MM/YYYY')}</td>
                    <td className="col text-center tdId">
                        {problem.updated_at !== null ? Moment(problem.updated_at.date).format('DD/MM/YYYY') : ""}
                    </td>
                    <td className="col text-center">
                        <Button className="text-lowercase mt-3 btn-floating btn-small waves-effect waves-light green z-deepth-3" variant="outline-primary" onClick={() => detailProblem(problem.problem_id)}>
                            <i className="material-icons">zoom_in</i>
                        </Button>
                    </td>
                    <td className="col text-center">
                        <Button className="text-lowercase mt-3 btn-floating btn-small waves-effect waves-light yellow z-deepth-3" variant="outline-warning" onClick={() => updateProblem(problem.problem_id)}>
                            <i className="material-icons">edit</i>
                        </Button>
                    </td>
                    <td className="col text-center">
                        <Button type="button" className="text-lowercase mt-3  btn-floating btn-small waves-effect waves-light red z-deepth-3" variant="outline-danger" onClick={() => deleteProblem(problem.problem_id)}>
                            <i className="material-icons">delete</i>
                        </Button>
                    </td>
                </tr>
            </>
        )
    } else {
        return (
            <div className="hero">
                <p>Aucune données du ticket a afficher !</p>
            </div>
        )
    }
}
export default ProblemRow;
