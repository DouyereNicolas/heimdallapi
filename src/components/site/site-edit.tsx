import React, { FunctionComponent, useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import Sites from "../../models/sites";
import SitesService from "../../services/sites-service";
import { getDateForInput } from "../../helpers/utils";
import SitesData from "../../models/sitesData";
import Users from "../../models/Users";
import { getUsersByRole } from "../../services/usersServices";
import { GetRole } from "../../models/role";
import { BrowserRouter as Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type Params = { id: string };

type Field = {
    value?: any,
    error?: string,
    isValid?: boolean
}

type Form = {
    numberSite: Field,
    dateStart: Field,
    dateEnd: Field
}

const SiteEdit: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
    const history = useHistory();
    let siteId: number;

    const [site, setSite] = useState<Sites>();
    useEffect(() => {
        // @ts-ignore
        SitesService.getSite(+match.params.id).then((resp) => {
            let newSite = new Sites(resp);
            if (newSite.data && newSite.data.length !== 0) {
                newSite.data.map((data) => {
                    switch (data.siteData_key) {
                        case 'address':
                            setSiteAddress(data);
                            break;
                        case 'manager':
                            setSiteManager(data);
                            break;
                        case 'customer':
                            setSiteCustomer(data);
                            break;
                    }
                    return 0
                });
            }
            setSite(newSite);
        })
    }, [match.params.id]);

    const [siteAddress, setSiteAddress] = useState<SitesData>(new SitesData());
    const [siteCustomer, setSiteCustomer] = useState<SitesData>(new SitesData());
    const [siteManager, setSiteManager] = useState<SitesData>(new SitesData());

    const [customer, setCustomer] = useState<Users[]>([]);
    useEffect(() => {
        getUsersByRole(GetRole.CUSTOMER).then(customer => setCustomer(customer));
    }, []);

    const [manager, setManager] = useState<Users[]>([]);
    useEffect(() => {
        getUsersByRole(GetRole.MANAGER).then(manager => setManager(manager));
    }, []);

    const [form, setForm] = useState<Form>({
        numberSite: { value: 0 },
        dateStart: { value: '' },
        dateEnd: { value: '' }
    });

    if (site !== undefined) {

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const fieldName: string = e.target.name;
            const fieldValue: string = e.target.value;
            if (fieldName === 'numberSite') {
                site.site_number_site = parseInt(fieldValue);
            }
            if (fieldName === 'dateStart') {
                site.site_date_start = new Date(fieldValue);
            }
            if (fieldName === 'dateEnd') {
                site.site_date_end = new Date(fieldValue);
            }
            const newField: Field = { [fieldName]: { value: fieldValue } };
            setForm({ ...form, ...newField });
        }

        const handleInputAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const address: SitesData = new SitesData();
            address.siteData_key = e.target.name;
            address.siteData_column = e.target.value;
            setSiteAddress(address);
        }

        const handleAddress = (e: React.FocusEvent<HTMLInputElement>) => {
            if (siteAddress && siteAddress.siteData_key === 'address') {
                populateSiteDataArray(siteAddress);
            }
        }

        const handleSelectChange = (e: React.FocusEvent<HTMLSelectElement>) => {
            const selectedData: SitesData = new SitesData();
            selectedData.siteData_key = e.target.name;
            selectedData.siteData_column = e.target.value;

            if (site.data && site.data.length !== 0) {
                site.data.map((data) => {
                    if (data.siteData_key === selectedData.siteData_key) {
                        switch (selectedData.siteData_key) {
                            case 'customer':
                                data.siteData_column = selectedData.siteData_column;
                                setSiteCustomer(data);
                                populateSiteDataArray(siteCustomer);
                                break;
                            case 'manager':
                                data.siteData_column = selectedData.siteData_column;
                                setSiteManager(data);
                                populateSiteDataArray(siteManager);
                                break;
                        }
                    } else {
                        switch (selectedData.siteData_key) {
                            case 'customer':
                                setSiteCustomer(selectedData);
                                populateSiteDataArray(selectedData);
                                break;
                            case 'manager':
                                setSiteManager(selectedData);
                                populateSiteDataArray(selectedData);
                                break;
                        }
                    }
                    return 0
                });
            } else {
                switch (selectedData.siteData_key) {
                    case 'customer':
                        siteCustomer.siteData_key = selectedData.siteData_key;
                        siteCustomer.siteData_column = selectedData.siteData_column;
                        setSiteCustomer(selectedData);
                        populateSiteDataArray(selectedData);
                        break;
                    case 'manager':
                        siteManager.siteData_key = selectedData.siteData_key;
                        siteManager.siteData_column = selectedData.siteData_column;
                        setSiteManager(selectedData);
                        populateSiteDataArray(selectedData);
                        break;
                }
            }
        }

        const populateSiteDataArray = (data: SitesData) => {
            if (site.data) {
                if (site.data.length !== 0) {
                    const result = site.data.filter(((d) => data.siteData_key === d.siteData_key));
                    if (result.length !== 0) {
                        for (const d of site.data) {
                            if (d.siteData_key === data.siteData_key) {
                                d.siteData_column = data.siteData_column;
                            }
                        }
                    } else {
                        site.data.push(data);
                    }
                } else {
                    site.data.push(data);
                }
            }
        }

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            await updateSite(site).then();
        }

        const updateSite = async (site: Sites) => {
            await SitesService.updateSite(site).then(value => siteId = value.site_Id);

            if (siteId !== undefined && site.data) {
                for (const data of site.data) {
                    if (data.siteData_id === 0) {
                        data.siteData_siteId = siteId;
                        await addSiteData(data);
                    } else {
                        await updateSiteData(data);
                    }
                }
                toast.success('Chantier modifier avec succès👍', {});
            } else {
                toast.warn('Erreur lors de la modification !', {});
            }
            window.setTimeout( () => {
                history.push('/sites');
            }, 3000 );

        }

        const updateSiteData = async (siteData: SitesData) => {
            await SitesService.updateData(siteData).then();
        }
        const addSiteData = async (siteData: SitesData) => {
            await SitesService.postSiteData(siteData).then();
        }

        return (
            <div className="hero-auto">
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
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
                    <div className="mt-5 pt-5 container-fluid">
                        <div className="d-flex justify-content-center">
                            <form className="mt-5" onSubmit={e => handleSubmit(e)}>
                                <div className="row">
                                    <div className="col m8">
                                        <div className="card hoverable" id="cardGeneral">
                                        <h2 className="text-center mb-5"> Modifier un Chantier</h2>
                                            <div className="card-stacked">
                                                <div className="card-content p-0">
                                                    <div className="form-group">
                                                        <label htmlFor="dateStart">Date de début</label>
                                                        <input id="dateStart" value={getDateForInput(site.site_date_start)} name="dateStart"
                                                               className="form-control" type="date" onChange={e => handleInputChange(e)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="dateEnd">Date de fin</label>
                                                        <input id="dateEnd"
                                                            value={site.site_date_end !== null ? getDateForInput(site.site_date_end) : ''}
                                                            type="date" name="dateEnd" className="form-control"
                                                            onChange={e => handleInputChange(e)} />
                                                    </div>
                                                    {site.data ?
                                                        <div>
                                                            <div className="form-group">
                                                                <label htmlFor="address">Adresse du chantier</label>
                                                                <input id="address" className="form-control" type="text" name="address"
                                                                    value={siteAddress ? siteAddress.siteData_column : ''}
                                                                    onChange={e => handleInputAddressChange(e)}
                                                                    onBlur={e => handleAddress(e)} />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="customer">Client</label>
                                                                <select id="customer" name="customer" style={{ display: "block" }}
                                                                    onBlur={e => handleSelectChange(e)}>
                                                                    <option disabled={true} selected={true}>Client</option>
                                                                    {customer.map((customer) => (
                                                                        <option key={customer.id} value={customer.id}
                                                                            selected={(siteCustomer && parseInt(siteCustomer.siteData_column) === customer.id)}>
                                                                            {customer.login}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="manager">Chef de chantier</label>
                                                                <select id="manager" name="manager" style={{ display: 'block' }}
                                                                    onBlur={e => handleSelectChange(e)}>
                                                                    <option disabled={true} selected={true}> Chef de chantier</option>
                                                                    {manager.map((manager) => (
                                                                        <option key={manager.id} value={manager.id}
                                                                            selected={(siteManager && parseInt(siteManager.siteData_column) === manager.id)}>
                                                                            {manager.login}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        :
                                                        <p>No data</p>
                                                    }
                                                </div>
                                                <div className="mt-5">
                                                    <button type="submit" className="btn btn-lg btnLogin">Valider</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <Link className="btn-floating btn-large waves-effect waves-light orange lighten-1 z-deepth-3"
                                style={{ position: 'fixed', top: '95px', left: '50px' }}
                                to="/sites">
                                <i className="material-icons">navigate_before</i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <h1>Error</h1>
        )
    }
}
export default SiteEdit;
