import Sites from "../../models/sites";
import React, {FunctionComponent, useEffect, useState} from "react";
import SitesData from "../../models/sitesData";
import Users from "../../models/Users";
import {getUsersByRole} from "../../services/usersServices";
import ParametersHelper from "../../helpers/parameters-helper";
import SitesService from "../../services/sites-service";
import {GetRole} from "../../models/role";
import SiteFormMat from "./site-form-mat";
import {GeocodeFeature} from "../../models/geocodeResponse";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    site: Sites,
}

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

const SitesForm: FunctionComponent<Props> = ({site}) => {


    const [firstStep, setFirstStep] = useState<boolean>(true);
    const [siteAddress, setSiteAddress] = useState<SitesData>();
    const [siteCustomer, setSiteCustomer] = useState<SitesData>();
    const [siteManager, setSiteManager] = useState<SitesData>();
    const [geocode, setGeocode] = useState<GeocodeFeature[]>([]);

    const [addressError, setAddressError] = useState<string | null>();

    const [form, setForm] = useState<Form>({
        numberSite: {value: null},
        dateStart: {value: null},
        dateEnd: {value: null}
    });

    const [customer, setCustomer] = useState<Users[]>([]);
    useEffect(() => {
        getUsersByRole(GetRole.CUSTOMER).then(customer => setCustomer(customer))
    }, []);

    const [manager, setManager] = useState<Users[]>([]);
    useEffect(() => {
        getUsersByRole(GetRole.MANAGER).then(manager => setManager(manager))
    }, []);

    const [allSites, setAllSites] = useState<Sites[]>([]);
    useEffect(() => {
        SitesService.getAllSites().then(sites => setAllSites(sites));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        let newField: Field = {[fieldName]: {value: fieldValue}};
        switch (fieldName) {
            case 'numberSite':
                if (allSites) {
                    newField = ParametersHelper.testNumberSite({[fieldName]: {value: fieldValue}}, allSites);
                } else {
                    newField = ParametersHelper.testNumberSite({[fieldName]: {value: fieldValue}});
                }
                break;
            case 'dateStart':
            case 'dateEnd':
                newField = ParametersHelper.testDate({[fieldName]: {value: fieldValue}});
                break;
        }
        setForm({...form, ...newField});
    }

    const handleInputAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const addressData: SitesData = new SitesData();
        addressData.siteData_key = e.target.name
        addressData.siteData_column = e.target.value;
        setSiteAddress(addressData);

        if (e.target.value.length > 5) {
            await SitesService.getAddressGouv(e.target.value).then((g) => {
                setGeocode(g.features);
            });
        }
    }

    const selectAddress = (address: GeocodeFeature) => {

        if (address.properties === null) {
            let error = 'Adresse non valide';
            setAddressError(error);
        } else {
            const addressData: SitesData = new SitesData();
            addressData.siteData_key = 'address';
            addressData.siteData_column = address.properties.label;

            if (siteAddress && siteAddress.siteData_column !== addressData.siteData_column) {
                siteAddress.siteData_column = address.properties.label;
                setSiteAddress(siteAddress);
            }
            setSiteAddress(addressData);
            setGeocode([]);
        }
    }

    const handleAddress = (e: React.FocusEvent<HTMLInputElement>) => {
        if (site.data === null || site.data === undefined) {
            site.data = [];
        }
        if (siteAddress && siteAddress.siteData_key === "address") {

            if (site.data.filter((data) => data.siteData_key === siteAddress.siteData_key).length === 0) {
                site.data.push(siteAddress);
            } else {
                for (const data of site.data) {
                    if (data.siteData_key === siteAddress.siteData_key && data.siteData_column !== siteAddress.siteData_column) {
                        data.siteData_column = siteAddress.siteData_column;
                    }
                }
            }
        }
    }

    const handleSelectCustomerChange = (e: React.FocusEvent<HTMLSelectElement>) => {
        if (site.data === null || site.data === undefined) {
            site.data = [];
        }
        const selectedCustomer: SitesData = new SitesData();
        selectedCustomer.siteData_key = e.target.name;
        selectedCustomer.siteData_column = e.target.value;

        setSiteCustomer(selectedCustomer);
        if (site.data) {
            if (site.data.filter((data) => data.siteData_key === selectedCustomer.siteData_key).length === 0) {
                site.data.push(selectedCustomer);
            } else {
                for (const data of site.data) {
                    if (data.siteData_key === selectedCustomer.siteData_key
                        && data.siteData_column !== selectedCustomer.siteData_column) {
                        data.siteData_column = selectedCustomer.siteData_column;
                    }
                }
            }
        }
    }

    const handleSelectManagerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (site.data === null || site.data === undefined) {
            site.data = [];
        }
        const selectedManager: SitesData = new SitesData();
        selectedManager.siteData_key = e.target.name;
        selectedManager.siteData_column = e.target.value;

        setSiteManager(selectedManager);
        if (site.data) {
            if (site.data.filter((data) => data.siteData_key === selectedManager.siteData_key).length === 0) {
                site.data.push(selectedManager);
            } else {
                for (const data of site.data) {
                    if (data.siteData_key === selectedManager.siteData_key
                        && data.siteData_column !== selectedManager.siteData_column) {
                        data.siteData_column = selectedManager.siteData_column;
                    }
                }
            }
        }
    }

    const disabledSubmit = () => {
        let disabled: boolean = true;
        if (!validateData()) {
            for (let value of Object.entries(form)) {
                if (value[1].isValid) {
                    disabled = false;
                }
            }
        }
        return disabled;
    }

    const validateData = () => {
        return !(siteAddress && siteManager && siteCustomer);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (disabledSubmit()) {
            toast.warn("Le formulaire n'est pas complet !👎", {});
        } else {
            site.site_number_site = form.numberSite.value;
            site.site_date_start = form.dateStart.value;
            site.site_date_end = form.dateEnd.value;
            setFirstStep(false);
        }
    }

    return (
        <div>
            {firstStep ?
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

                    <form className="mt-5 col-8" onSubmit={e => handleSubmit(e)}>
                        <div className="row">
                            <div className="col s12 m8">
                                <div className="card hoverable" id="cardGeneral">
                                    <div className="card-stacked p-0">
                                        <div className="form-group">
                                            <label htmlFor="numberSite">Numéro de chantier</label>
                                            <input id="numberSite" className="form-control" name="numberSite"
                                                   value={form.numberSite.value}
                                                   onChange={e => handleInputChange(e)}/>
                                            {form.numberSite.error ?
                                                <div className="red accent-1">
                                                    {form.numberSite.error}
                                                </div>
                                                :
                                                ''
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="dateStart">Date de début</label>
                                            <input id="dateStart" value={form.dateStart.value} name="dateStart"
                                                   type="date"
                                                   className="form-control" onChange={e => handleInputChange(e)}/>
                                            {form.dateStart.error ?
                                                <div className="red accent-1">
                                                    {form.dateStart.error}
                                                </div>
                                                :
                                                ''
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="dateEnd">Date de fin</label>
                                            <input id="dateEnd" value={form.dateEnd.value} type="date" name="dateEnd"
                                                   className="form-control" onChange={e => handleInputChange(e)}/>
                                            {form.dateEnd.error ?
                                                <div className="red accent-1">
                                                    {form.dateEnd.error}
                                                </div>
                                                :
                                                ''
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="address">Adresse du chantier</label>
                                            <input id="address" className="form-control" type='text'
                                                   value={siteAddress ? siteAddress.siteData_column : ''}
                                                   name="address" onChange={e => handleInputAddressChange(e)}
                                                   onBlur={e => handleAddress(e)}/>
                                            {addressError !== null ?
                                                <div className="red accent-1">
                                                    {addressError}
                                                </div>
                                                :
                                                ''
                                            }
                                        </div>
                                        <div>
                                            {geocode.length !== 0 ?
                                                geocode.map((f) => (
                                                    <p style={{cursor: 'pointer'}}
                                                       onClick={() => selectAddress(f)}>{f.properties.label}</p>
                                                ))
                                                :
                                                ''
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="customer">Client</label>
                                            <select id="customer" name="customer" style={{display: 'block'}}
                                                    onBlur={e => handleSelectCustomerChange(e)}>
                                                <option disabled={true} selected={true}>Client</option>
                                                {customer.map((customer) => (
                                                    <option key={customer.id}
                                                            value={customer.id}>{customer.login}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="manager">Chef de chantier</label>
                                            <select id="manager" name="manager" style={{display: 'block'}}
                                                    onChange={e => handleSelectManagerChange(e)}>

                                                <option disabled={true} selected={true}>Chef de chantier</option>
                                                {manager.map((manager) => (
                                                    <option key={manager.id} value={manager.id}>{manager.login}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mt-5">
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
                :
                <SiteFormMat site={site}/>
            }
        </div>
    );
}

export default SitesForm;
