import React, { FunctionComponent, useState, useEffect } from 'react';
import ViewMaterial from './ViewMaterial';
import Materials from '../../models/Materials';
import { getAllMaterial } from '../../services/Materials-services';
import '../../pages/Material.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'






const MaterialDetail: FunctionComponent = () => {

    const [materials, setMaterials] = useState<Materials[]>([]);

    useEffect(() => {
        getAllMaterial().then(element => setMaterials(element));
    }, [])

    return (
        <>
            <div className="heroMaterial">
                <div id="materialFristDiv">
                    <div className="container" id="container">
                        <div className="text-center mt-3 pt-2 pb-3 titleStyle text-light">Materiels</div>

                        <Table striped hover className="table table-responsive table-hover text-center pb-5 mb-5" id="tableMaterialDetail">
                            <thead>
                                <tr className="bg-dark text-white">
                                    <th scope="row" className='tdId'>Matériel id</th>
                                    <th scope="row">Référence du matériel</th>
                                    <th scope="row">Nom du matériel</th>
                                    <th scope="row">Catégorie du matériel</th>
                                    <th scope="row">Nombre de matériel</th>
                                    <th scope="row" className='tdCreated'>Crée le</th>
                                    <th scope="row" className="tdUpdate">Dernière Modification</th>
                                    <th scope="row">Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    materials.map(i => <ViewMaterial material={i} />)

                                }
                            </tbody>
                        </Table>


                    </div>
                    <div className="pb-2">
                        {/* <Button variant="primary" type="submit" className="mt-3 m-1">
                        <Link to="/CreateMaterial" className="" style={{ color: "white" }}>Ajouter un Matériel </Link>
                    </Button> */}
                        <Link className="btn-floating btn-large waves-effect waves-light green z-deepth-3"
                            style={{ position: 'fixed', top: '85px', right: '25px' }}
                            to="/CreateMaterial"
                        >
                            <i className="material-icons">add</i>
                        </Link>
                        {/* <a className="btn btn-secondary" role="button"></a> */}
                        {/* <Button variant="danger" type="submit" className="mt-3 m-1">
                        Supprimer un matériel
                    </Button> */}
                    </div>
                </div>
            </div>

        </>
    )
}


export default MaterialDetail;