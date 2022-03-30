import React, { FunctionComponent, useEffect, useState } from "react";
import Materials from "../../models/Materials";
import MaterialData from "../../models/MaterialData";
import { Button } from 'react-bootstrap';
import {  Link } from 'react-router-dom';

import '../../components/CreateMaterial.css';
import ParametersHelper from "../../helpers/parameters-helper";
import { getAllMaterialData, getOneMaterial, updateOneMaterial, updateOneMaterialData, getAllMaterialCategory } from "../../services/Materials-services";
import { RouteComponentProps } from "react-router-dom";
import MaterialCategory from "../../models/MaterialCategory";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';


type Params = { id: string };

const UpdateMaterial: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {

    const [nameMaterialId, setNameId] = useState("");
    const [nameMaterial, setName] = useState("");
    const [refMaterial, setRef] = useState("");
    const [NombreMaterial, setNombreMaterial] = useState("");
    const [NombreMaterialId, setNombreMaterialId] = useState("");
    const [catMaterial, setCatMaterial] = useState("");
    const [catMaterialId, setCatMaterialId] = useState("");
    const [allCategory, setAllCategory] = useState<MaterialCategory[]>([]);
    let checkNameMaterial: boolean = false;
    let checkCatMaterial: boolean = false;
    let checkRefMaterial: boolean = false;
    const history = useHistory();

    useEffect(() => {
        getAllMaterialCategory().then(e => setAllCategory(e));
    }, []);

    useEffect(() => {
        async function yes() {
            //await SitesService.getAllSites().then(tt => setAllSite(tt));
            await getOneMaterial(parseInt(match.params.id)).then(tt => setRef(tt[0].Material_ref));
        }
        yes();
    }, [match.params.id]);

    
    useEffect(() => {
        getAllMaterialData(+match.params.id).then((i) => {
            if (i.length !== 0 && i.error === undefined) {
                i.map((data: MaterialData) => {
                    switch (data.data_key) {
                        case 'name':
                            setName(data.data_column);
                            setNameId(data.materialData_id.toString())
                            break;
                        case 'categorie':
                            setCatMaterial(data.data_column);
                            setCatMaterialId(data.materialData_id.toString())
                            break;
                        case 'number':
                            setNombreMaterial(data.data_column);
                            setNombreMaterialId(data.materialData_id.toString())
                            break;
                    }
                    return 0 ;
                })
            } else {
                i = [];
            }
        })
        getOneMaterial(+match.params.id).then((i) => {
            setRef(i[0].material_ref)
        })
    }, [match.params.id]);


    if (nameMaterial) {
        if (ParametersHelper.testNameMaterial(nameMaterial) === true) {
            checkNameMaterial = true;
        }
    }

    if (catMaterial) {

        if (allCategory.filter(e => e.materialCategory_id === +catMaterial).length !== 0) {
            checkCatMaterial = true;
        }
    }

    if (refMaterial) {
        if (ParametersHelper.testRefMaterial(refMaterial) === true) {
            checkRefMaterial = true;
        }
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (checkNameMaterial === true && checkRefMaterial === true && checkCatMaterial === true) {

            const material = new Materials();
            material.material_ref = refMaterial;
            material.material_id = +match.params.id;
            await updateOneMaterial(material);

            const dataToPost = new MaterialData();

            dataToPost.materialData_id = +catMaterialId;
            dataToPost.data_key = "categorie";
            dataToPost.data_column = catMaterial;
            dataToPost.materialData_materialId = +match.params.id;
            await updateOneMaterialData(dataToPost);

            dataToPost.materialData_id = +NombreMaterialId;
            dataToPost.materialData_materialId = +match.params.id;
            dataToPost.data_key = "number";
            dataToPost.data_column = NombreMaterial;
            await updateOneMaterialData(dataToPost);

            dataToPost.materialData_id = +nameMaterialId;
            dataToPost.data_key = "name";
            dataToPost.data_column = nameMaterial;
            dataToPost.materialData_materialId = +match.params.id;
            await updateOneMaterialData(dataToPost);

            toast.success('Matériel mis à jour avec succès👍', {});
            setTimeout(function() {
                history.push(`/material`);
            }, 5000);
        } else {
            toast.warn("Le formulaire n'est pas complet !👎", {});
        }
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
                pauseOnHover />
            <div className="heroMaterial">
                <div id="materialFristDiv">
                    <div className="container mt-5 p-2">
                        <div className="mt-5 pt-5 mb-3 justify-content-center d-flex">
                            <div className="from" style={{ background: 'white' }}>
                                <form onSubmit={e => handleSubmit(e)}>
                                    <h2 className="mb-5">Modifier le matériel</h2>
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

                                    <Button variant="" type="submit" className="mt-3 btn btn-lg btnLogin">
                                        Modifier
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
        </>
    );
}
export default UpdateMaterial;

