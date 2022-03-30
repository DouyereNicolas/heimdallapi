import React, {FunctionComponent, useState, useEffect} from "react";
import {RouteComponentProps, useHistory, Link} from "react-router-dom";
import Sites from "../../models/sites";
import SitesService from "../../services/sites-service";
import {Button, Modal} from "react-bootstrap";
import Moment from "moment";
import {SiteDetails} from "../../models/utils/siteDetails";
import Users from "../../models/Users";
import Materials from "../../models/Materials";
import Problem from "../../models/Problem";

type Params = { id: string };

const SiteDetail: FunctionComponent<RouteComponentProps<Params>> = ({match}) => {
    const history = useHistory();

    const [siteDetails, setSiteDetails] = useState<SiteDetails>();
    const [site, setSite] = useState<Sites>();
    const [users, setUsers] = useState<Users[]>();
    const [materials, setMaterials] = useState<Materials[]>();
    const [tickets, setTickets] = useState<Problem[]>();

    useEffect(() => {
        const fetchSite = async () => {
            const siteDetails = await SitesService.getSite(+match.params.id).then();
            setSiteDetails(siteDetails);
            setSite(siteDetails.site);
            setUsers(siteDetails.users);
            setMaterials(siteDetails.materials);
            setTickets(siteDetails.tickets);
        }
        fetchSite().then();
    }, [match.params.id]);

    const [show, setShow] = useState();
    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    const deleteSite = () => {
        handleCloseModal();
        SitesService.deleteSite(+match.params.id).then();
        history.go(-1);
    }

    const setDates = (date: number) => {
        let myDate = Moment.unix(date);
        return myDate.format('DD/MM/YYYY');
    }

    return (
        <div>
            <div className="hero-auto">
                <div className="heroProblemeEnfant">
                    <div className="mt-5 pt-5 container-fluid ">
                        <div className="d-flex flex-column">
                            <div>
                                <form className="mt-5 d-flex justify-content-center">
                                    <div className="row">
                                        <div className="col-12 m8">
                                            <div className="card hoverable" id="cardGeneral">
                                                <h2 className="text-center mb-5"> Détail du chantier</h2>
                                                <div className="card-stacked">
                                                    <div className="card-content p-0">
                                                        <div className="form-group">
                                                            {site ?
                                                                <div
                                                                    className="d-flex flex-column text-center align-items-center">
                                                                    <div className="col-sm-8">
                                                                        <div className="card-block text-center">
                                                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600 h6">Information
                                                                                du Chantier Id {site.site_id}</h6>

                                                                            <div className="col-12">
                                                                                <p className="m-b-10 f-w-600">Numéro du
                                                                                    chantier :</p>
                                                                                <h6 className="text-muted f-w-400">{site.site_number_site}</h6>
                                                                            </div>

                                                                            <div className="col-12">
                                                                                <p className="m-b-10 f-w-600">Débute le
                                                                                    :</p>
                                                                                <h6 className="text-muted f-w-400">{setDates(site.site_date_start)}</h6>
                                                                            </div>
                                                                            <div className="col-12">
                                                                                <p className="m-b-10 f-w-600">Fini le
                                                                                    :</p>
                                                                                {site.site_date_end !== null ?
                                                                                    <h6 className="text-muted f-w-400">{setDates(site.site_date_end)}</h6>
                                                                                    :
                                                                                    <p>En cours</p>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <h3>Site not found</h3>
                                                            }
                                                        </div>
                                                        <h2 className="text-center m-b-20 p-b-5 b-b-default f-w-600 h6">Liste
                                                            des données du chantier</h2>
                                                        {site && site.data && site.data.length !== 0 ?
                                                            <div className=" d-flex flex-column text-center">
                                                                <div
                                                                    className="d-flex flex-column text-center align-items-center">
                                                                    <div className="col-sm-8">
                                                                        <div className="card-block text-center p-0">
                                                                            <div className="col-12">

                                                                                {site.data.map(siteData => (
                                                                                    <div>
                                                                                        {
                                                                                            siteData.siteData_key === 'address' ?
                                                                                                <p className="m-b-10 f-w-600">Adresse: {siteData.siteData_column}</p>

                                                                                                : ''
                                                                                        }
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            :
                                                            <h3 className="text-center m-5">Aucune données</h3>
                                                        }
                                                        <h2 className="text-center m-b-20 p-b-5 b-b-default f-w-600 h6 mt-4">Liste
                                                            des personne affecter au chantier</h2>
                                                        <div className=" d-flex flex-column text-center">
                                                            {users ?
                                                                users.map(user => (
                                                                    <div>
                                                                        {user.data ?
                                                                            user.data.map(data => (
                                                                                <span>{data.userData_column} </span>
                                                                            ))
                                                                            :
                                                                            ''
                                                                        }
                                                                    </div>
                                                                ))
                                                                :
                                                                ''
                                                            }
                                                        </div>
                                                        <div className="d-flex flex-column text-center">
                                                            <h2 className="text-center m-b-20 p-b-5 b-b-default f-w-600 h6 mt-4">Liste
                                                                des problèmes liés au chantier</h2>
                                                        {tickets ?
                                                                tickets.map(ticket => (
                                                                <div>
                                                                    {ticket.data ?
                                                                        ticket.data.map(data => (
                                                                            <span>{data.problemData_column}</span>
                                                                        ))
                                                                        :
                                                                        ''
                                                                    }
                                                                </div>
                                                                ))
                                                                :
                                                                ''
                                                        }
                                                        </div>
                                                        <div className="d-flex flex-column text-center">
                                                            <h2 className="text-center m-b-20 p-b-5 b-b-default f-w-600 h6 mt-4">Liste
                                                                des matériels du chantier</h2>
                                                            {materials ?
                                                                materials.map(material => (
                                                                    <div>
                                                                        {material.data ?
                                                                            material.data.map(data => (
                                                                                <p>
                                                                                    {data.data_key}
                                                                                    {data.data_column}
                                                                                </p>
                                                                            ))
                                                                            :
                                                                            ''
                                                                        }
                                                                    </div>
                                                                ))
                                                                :
                                                                ''
                                                            }
                                                        </div>
                                                        <div className='d-flex justify-content-center mt-5'>
                                                            <Button variant="" className="btn btn-lg btnLogin"
                                                                    onClick={handleShowModal}>Supprimer</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <Link
                                className="btn-floating btn-large waves-effect waves-light orange lighten-1 z-deepth-3"
                                style={{position: 'fixed', top: '95px', left: '50px'}}
                                to="/sites">
                                <i className="material-icons">navigate_before</i>
                            </Link>
                        </div>
                        <Modal size="sm" backdrop={true} show={show} onHide={handleCloseModal}>
                            <Modal.Header closeButton={true}>
                                <Modal.Title><h2 className="text-center mb-5">Supprimer le chantier</h2></Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Êtes-vous sûr de vouloir supprimer ce chantier ? </p>
                            </Modal.Body>
                            <Modal.Footer className='d-flex justify-content-around'>
                                <Button onClick={handleCloseModal}>Annuler</Button>
                                <Button className='red' onClick={deleteSite}>Supprimer</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SiteDetail;
