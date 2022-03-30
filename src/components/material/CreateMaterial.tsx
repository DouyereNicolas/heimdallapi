import React, { FunctionComponent, useState, useEffect } from "react";
import Materials from "../../models/Materials";
import MaterialData from "../../models/MaterialData";
import { Button } from 'react-bootstrap';
import {  Link } from 'react-router-dom';

import '../../components/CreateMaterial.css';
import ParametersHelper from "../../helpers/parameters-helper";
import { postDataMaterial, postMaterials, getAllMaterialCategory } from "../../services/Materials-services";
import MaterialCategory from "../../models/MaterialCategory";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';



const CreateMaterial: FunctionComponent = () => {


    const [nameMaterial, setName] = useState("");
    const [refMaterial, setRef] = useState("");
    const [NombreMaterial, setNombreMaterial] = useState("");
    const [catMaterial, setCatMaterial] = useState("0");
    const [allCategory, setAllCategory] = useState<MaterialCategory[]>([]);
    useEffect(() => {
        getAllMaterialCategory().then(e => setAllCategory(e));
    }, []);

    let checkNameMaterial: boolean = false;
    let checkRefMaterial: boolean = false;
    let checkCatMaterial: boolean = false;
    const history = useHistory();

    if (nameMaterial) {
        if (ParametersHelper.testNameMaterial(nameMaterial) === true) {
            checkNameMaterial = true;
        }
    }

    if (refMaterial) {
        if (ParametersHelper.testRefMaterial(refMaterial) === true) {
            checkRefMaterial = true;
        }
    }

    if (NombreMaterial) {
        if (ParametersHelper.checkNombreMaterial(NombreMaterial) === true) {
        }
    }

    if (catMaterial) {
        if (catMaterial !== "0") {
            if (allCategory.filter(e => e.materialCategory_id === +catMaterial).length !== 0) {
                checkCatMaterial = true;
            }
        }
        
    }

    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (checkNameMaterial === true && checkRefMaterial === true  && checkCatMaterial === true) {
            var createdId = -105;
            const material = new Materials();
            material.material_ref = refMaterial;
            await postMaterials(material).then(t => createdId = t);

            const dataToPost = new MaterialData();
            dataToPost.materialData_materialId = createdId;
            dataToPost.data_key = "categorie";
            dataToPost.data_column = catMaterial;
            await postDataMaterial(dataToPost);

            dataToPost.materialData_materialId = createdId;
            dataToPost.data_key = "name";
            dataToPost.data_column = nameMaterial;
            await postDataMaterial(dataToPost);

            dataToPost.materialData_materialId = createdId;
            dataToPost.data_key = "number";
            dataToPost.data_column = NombreMaterial;
            await postDataMaterial(dataToPost);

            toast.success('Matériel crée avec succès👍', {});
            setTimeout(function() {
                history.push(`/material`);
            }, 5000);
        } else {
            toast.warn("Le formulaire n'est pas complet !👎", {});
        }
    }

    return (
        <div>
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
                
                
            <div className="heroMaterial">
                <div id="materialFristDiv">

                    <div className="container mt-5 p-2 pb-5">
                        <div className="mt-5 pt-5 justify-content-center d-flex">
                            <div className="from" style={{ background: 'white' }}>
                                <form onSubmit={e => handleSubmit(e)}>
                                    <h2 className="text-center mb-5 mt-2"> Créer un Material</h2>
                                    <div className="form-group">
                                        <label htmlFor="nameMaterial">Nom du Material</label>
                                        <input id="nameMaterial" className="form-control" name="nameMaterial " value={nameMaterial} onChange={(e) => setName(e.target.value)} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="RefMaterial">Référence du Material</label>
                                        <input id="RefMaterial" className="form-control" name="refMaterial " value={refMaterial} onChange={(e) => setRef(e.target.value)} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="NombreMaterial">Nombre du matériel</label>
                                        <input type="number" id="NombreMaterial" className="form-control" name="NombreMaterial " value={NombreMaterial} onChange={(e) => setNombreMaterial(e.target.value)} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect1">Catégorie</label>
                                        <select className="form-control" id="exampleFormControlSelect1" name="catMaterial" value={catMaterial} onChange={(e) => setCatMaterial(e.target.value)}>
                                            <option value="0">Veuillez choisir une Catégorie </option>
                                            {allCategory.map((ii) => (
                                                <option value={ii.materialCategory_id}>{ii.materialCategory_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <Button type="submit" className="mt-3 btn btn-lg btnLogin">
                                        Créer
                                    </Button>
                                </form>
                                <Link className="btn-floating btn-large waves-effect waves-light orange lighten-1 z-deepth-3"
                                    style={{ position: 'fixed', top: '95px', left: '50px' }}
                                    to="/material">
                                    <i className="material-icons">navigate_before</i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
}

export default CreateMaterial;