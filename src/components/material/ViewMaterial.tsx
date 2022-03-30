import React, { FunctionComponent, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Materials from "../../models/Materials";
import { Button, Modal } from 'react-bootstrap';
import { deleteOneMaterial, getAllMaterialData, getAllMaterialCategory } from "../../services/Materials-services";
import MaterialData from "../../models/MaterialData";
import MaterialCategory from '../../models/MaterialCategory';
import Moment from "moment";
import { ToastContainer, toast } from 'react-toastify';

type Props = {
    material: Materials
}

const ViewMaterial: FunctionComponent<Props> = ({ material }) => {

    
    useEffect(() => {
        getAllMaterialData(material.material_id).then(data => setData(data));
    }, [material.material_id])

    
    useEffect(() => {
        getAllMaterialCategory().then(oo => setDataCategory(oo));
    }, [])

    const [data, setData] = useState<MaterialData[]>([]);
    const [dataCategory, setDataCategory] = useState<MaterialCategory[]>([]);
    const [show, setShow] = useState(false);
    const [materialId, setMaterialId] = useState(-1)
    const handleClose = () => setShow(false);

    //const [materialData, setMaterialData] = useState<MaterialData>(); 

    function MaterialDelete(id: number) {
        setShow(true);
        setMaterialId(id);
    }

    async function confirmDelete(id: number) {
        var responseDelete = null;
        await deleteOneMaterial(id).then(e => responseDelete = e)
        if (responseDelete !== null) {
            toast.success("Matériel supprimer avec succès");
            setTimeout(function() {
                window.location.reload();
            }, 5000);
        }
        else {
            toast.warn("Erreur lors de la suppression du matériel");
            setTimeout(function() {
                window.location.reload();
            }, 5000);
        }
        setShow(false);
       
    }
    const history = useHistory();
    const updateMaterial = (id: number) => {
        history.push(`/material/update/${id}`);
    }
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
                <div className="text-center"><Modal.Body>Etes-vous sur de vouloir supprimer le Materiel numéro {materialId} </Modal.Body>
                    <div className="d-flex justify-content-around">
                        <Button variant="secondary" onClick={handleClose}>
                            Annuler
                        </Button>
                        <Button variant="danger" onClick={() => confirmDelete(materialId)}>
                            Supprimer
                        </Button>
                    </div>
                </div>
            </Modal>


            <tr className="table-light">
                <td className="text-center tdId">{material.material_id}</td>
                <td className="text-center">{material.material_ref}</td>
                {data ?
                    data.map(datas => (datas.data_key === "name" ?
                        <td className="text-center">{datas.data_column}</td>
                        : ""
                    ))
                    : ""
                }
                {data ?
                    data.map(datas => (datas.data_key === "categorie" ?
                        dataCategory ?
                            dataCategory.map(pp => (pp.materialCategory_id === +datas.data_column ?
                                <td className="text-center">{pp.materialCategory_name}</td> : "")) : ""
                        : ""
                    ))
                    : ""
                }
                {data ?
                    data.map(datas => (datas.data_key === "number" ?
                        <td className="text-center">{datas.data_column}</td>
                        : ""
                    ))
                    : ""
                }
                <td className="text-center tdCreated">{Moment(material.created_at).format('DD/MM/YYYY')}</td>

                <td className="text-center tdUpdate">{material.updated_at !== null ?
                    Moment(material.updated_at).format('DD/MM/YYYY'):""}
                </td>
                <td className="text-center p-0">
                    <Button variant="outline-warning" type="submit" className="mt-3 m-3 btn-floating btn-small waves-effect waves-light yellow z-deepth-3" id="editTab" onClick={() => updateMaterial(material.material_id)}>
                        <i className="material-icons">edit</i>
                    </Button>
                    <Button variant="outline-danger" type="submit" className="mt-3 m-3 btn-floating btn-small waves-effect waves-light red z-deepth-3" id="deleteTab" onClick={() => MaterialDelete(material.material_id)}>
                        <i className="material-icons">delete</i>
                    </Button>
                </td>
            </tr>
        </>
    );
}

export default ViewMaterial;
