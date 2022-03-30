import React, {FunctionComponent, useState, useEffect} from "react";
import Sites from "../../models/sites";
import SitesCard from "./sites-card";
import SitesService from "../../services/sites-service";
import "../../pages/sites.css";
import {useUser} from "../../contexts/userContext";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {GetRole} from "../../models/role";

const SitesList: FunctionComponent = () => {
    let userId: number;
    let role: number;
    const userContext = useUser();
    const history = useHistory();
    const [sites, setSites] = useState<Sites[]>([]);

    if (userContext!.state.id !== undefined && userContext!.state.role !== undefined) {
        userId = userContext!.state.id;
        role = userContext!.state.role;
    } else if (localStorage.getItem('user_id') !== null) {
        userId = Number(localStorage.getItem('user_id'));
        role = Number(localStorage.getItem('user_role'));
    } else {
        history.push('/login');
    }

    useEffect(() => {
        if (role === GetRole.DIRECTOR) {
            SitesService.getAllSites().then((sites) => {
                setSites(sites);
            });
        } else {
            SitesService.getSiteByUser(userId).then((sites) => setSites(sites));
        }
    }, []);

    const goToForm = () => {
        history.push('/sites/add');
    }


    return (
        <div className="heroSites">
            <div className="heroSitesEnfant">
                <h1 className="center text-light">Liste des chantiers</h1>
                <div className="container">
                    <div className="row">
                        <Link className="btn-floating btn-large waves-effect waves-light green z-deepth-3"
                              style={{position: 'fixed', top: '90px', right: '25px'}}
                              to="/sites/add">
                            <i className="material-icons">add</i>
                        </Link>
                        {sites.map(site => (
                            <SitesCard key={site.site_id} site={site}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SitesList;
