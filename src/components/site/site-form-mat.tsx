import React, {FunctionComponent, useEffect, useState} from "react";
import Users from "../../models/Users";
import {getFullUsers} from "../../services/usersServices";
import {GetRole} from "../../models/role";
import Materials from "../../models/Materials";
import {getFullMaterials} from "../../services/Materials-services";
import SitesData from "../../models/sitesData";
import Sites from "../../models/sites";
import ParametersHelper from "../../helpers/parameters-helper";
import {MaterialCategoryUtils} from "../../models/enums/materialCategory";
import SitesService from "../../services/sites-service";
import {useHistory} from "react-router";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Employee = {
    user: Users,
    isSelected: boolean
}
type MaterialsType = {
    materials: Materials,
    isSelected: boolean
}

type Props = {
    site: Sites
}

const SiteFormMat: FunctionComponent<Props> = ({site}) => {
    const history = useHistory();
    useEffect(() => {
        getFullUsers().then((usr) => {
            getEmployee(usr.filter((u) => {
                return u.role_id === GetRole.EMPLOYEE
            }));
        });
    }, []);

    const [empArray, setEmpArray] = useState<Employee[]>([]);
    const getEmployee = (users: Users[]) => {
        let array: Employee[] = [];
        users.map((worker) => {
            let emp: Employee = {user: worker, isSelected: false}
            array.push(emp);
            return 0
        });
        setEmpArray(array);
    }
    const [searchMaterials, setSearchMaterials] = useState<MaterialsType[]>([]);
    const [materialsTypes, setMaterialsTypes] = useState<MaterialsType[]>([]);
    useEffect(() => {
        const getMaterialsType = (materials: Materials[]) => {
            
            let array: MaterialsType[] = [];
            for (const mat of materials) {
                let type: MaterialsType = {materials: mat, isSelected: false};
                array.push(type);
            }
            setMaterialsTypes(array);
            setSearchMaterials(array.slice(array.length - 10));
        }
        getFullMaterials().then((resp) => getMaterialsType(resp));
    }, []);


    const handleClickWorker = (worker: Employee) => {
        worker.isSelected = !worker.isSelected;
        if (worker.isSelected) {
            let newData = new SitesData();
            newData.siteData_key = 'employee';
            newData.siteData_column = worker.user.id.toString();
            if (site.data === null || site.data === undefined) {
                site.data = [];
                site.data.push(newData);
            } else {
                site.data.push(newData);
            }
        } else {
            if (site.data !== null && site.data !== undefined) {
                let index: any;
                site.data.map((data) => {
                    if (data.siteData_key === 'employee' &&
                        data.siteData_column === worker.user.id.toString()) {
                        index = site.data!.indexOf(data)
                    }
                    return 0
                });
                site.data.splice(index, 1);
            }
        }
    }

    const handleClickMat = (e: React.MouseEvent<HTMLInputElement>, mat: MaterialsType) => {
        mat.isSelected = !mat.isSelected
        const id = e.target.id.split('-')
        setMaterialsTypes(materialsTypes);
        if (mat.isSelected) {
            let element = document.getElementById('div-' + id[1])
            element!.style.display = 'block';
        } else {
            let element = document.getElementById('div-' + id[1])
            element!.style.display = 'none';
        }
    }

    const getValueRadio = (worker: Employee) => {
        let name = '';
        if (worker.user.data && worker.user.data.length !== 0) {
            worker.user.data.map((data) => {
                if (name.length === 0) {
                    name = data.userData_column;
                } else {
                    name += ' ' + data.userData_column;
                }
                return 0
            })
        }
        return name;
    }

    const handleInputMat = (e: React.ChangeEvent<HTMLInputElement>, max: number, materielType: MaterialsType) => {
        if (materielType.isSelected) {
            let newData = new SitesData();
            newData.siteData_key = 'mat-' + e.target.name;
            newData.siteData_column = e.target.value;
            if (e.target.value.length !== 0) {
                if (ParametersHelper.checkNombreMaterial(newData.siteData_column)) {
                    if (Number(newData.siteData_column) > max) {
                        document.getElementById('error-' + e.target.name)!.style.display = 'block';
                    } else {
                        document.getElementById('error-' + e.target.name)!.style.display = 'none';
                        if (site.data === null || site.data === undefined) {
                            site.data = [];
                            site.data.push(newData);
                        } else {
                            if (site.data.filter((data) => data.siteData_key === newData.siteData_key).length === 0) {
                                site.data.push(newData);
                            } else {
                                for (const data of site.data!) {
                                    if (newData.siteData_key === data.siteData_key) {
                                        data.siteData_column = newData.siteData_column;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    document.getElementById('error-' + e.target.name)!.style.display = 'block';
                }
            } else {
                if (site.data !== null && site.data !== undefined) {
                    let index: any;
                    site.data.map((data) => {
                        if (data.siteData_key === newData.siteData_key) {
                            index = site.data!.indexOf(data)
                        }
                        return 0
                    });
                    site.data.splice(index, 1);
                }
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (site) {
            if (site.data) {
                if (site.data.filter((d) => d.siteData_key === 'employee' || d.siteData_key.startsWith('mat-')).length !== 0) {
                    toast.success('Chantier créer avec succès👍', {});
                    await addSite(site);
                } else {
                    toast.warn("Le formulaire n'est pas complet !👎", {});
                }
            } else {
                toast.warn("Le formulaire n'est pas complet !👎", {});
            }
        } else {
            toast.warn("Le formulaire n'est pas complet !👎", {});
        }
    }

    const addSite = async (newSite: Sites) => {
        await SitesService.postSite(site).then((resp) => {
            if (newSite.data && newSite.data.length !== 0) {
                newSite.data.map((data) => {
                    data.siteData_siteId = resp.site_id;
                    if (data.siteData_key.startsWith('mat-')) {
                        let id = data.siteData_key.split('-');
                        materialsTypes.map((mat) => {
                            if (mat.isSelected && mat.materials.material_id === Number(id[1])) {
                                addSiteData(data);
                            }
                            return 0
                        })
                    } else {
                        addSiteData(data);
                    }
                    return 0
                })
            }
        });
        window.setTimeout(() => {
            history.push('/sites');
        }, 2000);
    }

    const addSiteData = async (newData: SitesData) => {
        await SitesService.postSiteData(newData).then();
    }

    const filterMaterials = (inputValue: string) => {
        let array = materialsTypes.slice(materialsTypes.length - 10);
        if (inputValue.length !== 0) {
            array = materialsTypes.filter((mat) => {
                if (mat.materials.material_ref.startsWith(inputValue)) {
                    return mat;
                }else{
                    return 0
                }
            });
        }
        setSearchMaterials(array);
    }

    const handleInputSearchMaterials = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(e.target.value);
        const searchMaterial: Materials = new Materials();
        filterMaterials(e.target.value);
    }

    // const setSiteForPlanning = (id_site,site_dateStart,site_dateEnd) =>{
    //     dateStart = site_dateStart
    //     dateEnd = site_dateEnd
    //     idSiteForPlanning = id_site
    // }
    //
    return (
        <div className="mt-3 d-flex justify-content-center">
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
                theme="dark"/>
            <form className="mt-5 col-8" onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                    <div className="col s12 m8">
                        <div className="card hoverable" id="cardGeneral">
                            <div className="card-stacked p-0">
                                <div className="form-check">
                                    <p>Sélectionner les employés liés au chantier</p>
                                    {empArray ?
                                        empArray.map((worker) => (
                                            <div className="form-check form-switch">
                                                <input className="form-check-input"
                                                       style={{opacity: 1, pointerEvents: "all"}} role="switch"
                                                       type="checkbox" value={worker.user.id}
                                                       id={worker.user.id.toString()}
                                                       onClick={() => handleClickWorker(worker)}/>
                                                <label className="form-check-label h6"
                                                       htmlFor={worker.user.id.toString()}>
                                                    {getValueRadio(worker)}
                                                </label>
                                            </div>
                                        ))
                                        :
                                        <div>No employee</div>
                                    }
                                </div>
                                <div className="form-check">
                                    <p>Sélectionner les matériels liés au chantier</p>
                                    <div className="form-group">
                                        <label htmlFor="material">Rechercher un matériel</label>
                                        <input id="material" className="form-control" type='text'
                                               name="material" onChange={e => handleInputSearchMaterials(e)}/>
                                    </div>
                                    {searchMaterials ?
                                        searchMaterials.map((mat) => (
                                            <div>
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input"
                                                           style={{opacity: 1, pointerEvents: "all"}} role="switch"
                                                           type="checkbox" value={mat.materials.material_id}
                                                           id={'checkbox-' + mat.materials.material_id.toString()}
                                                           onClick={(e) => handleClickMat(e, mat)}/>
                                                    <label className="form-check-label h6"
                                                           htmlFor={'checkbox-' + mat.materials.material_id.toString()}>
                                                        {mat.materials.material_ref}
                                                    </label>
                                                </div>
                                                <div id={'div-' + mat.materials.material_id.toString()}
                                                     style={{display: 'none'}}>
                                                    {mat.materials.data && mat.materials.data.length !== 0 ? (
                                                            mat.materials.data.map((data) => (
                                                                    data.data_key === 'number' ? (
                                                                        <div className="form-control">
                                                                            <p>{'En stock : ' + data.data_column}</p>
                                                                            <input type="text"
                                                                                   name={mat.materials.material_id.toString()}
                                                                                   onChange={(e) => handleInputMat(e, Number(data.data_column), mat)}/>
                                                                            <p style={{display: 'none'}}
                                                                               className={'red accent-1'}
                                                                               id={'error-' + mat.materials.material_id}>
                                                                                Un chiffre inférieur à votre stock
                                                                                ({data.data_column})
                                                                            </p>
                                                                        </div>
                                                                    ) : (data.data_key === 'categorie' ? (
                                                                            <p>{MaterialCategoryUtils.getTextCategory(Number(data.data_column))}</p>
                                                                        ) : (
                                                                            ''
                                                                        )
                                                                    )
                                                                )
                                                            ))
                                                        :
                                                        ''
                                                    }
                                                </div>
                                            </div>
                                        ))
                                        :
                                        <div>No materials</div>
                                    }
                                </div>
                                <div className="mt-5 d-flex justify-content-center">
                                    <button type="submit" className="btn btn-lg btnLogin">
                                        Valider
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default SiteFormMat;
