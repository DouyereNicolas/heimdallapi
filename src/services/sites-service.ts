import Sites from '../models/sites';
import SitesData from '../models/sitesData';
import {GeocodeResponse} from "../models/geocodeResponse";
import {Url} from "../models/utils/Url";
import {SiteDetails} from "../models/utils/siteDetails";

export default class SitesService {

    static async getAllSites(): Promise<Sites[]>{
        return await fetch(Url.GET_ALL_SITES_URL, {
            mode: "cors",
            method: 'GET',
            headers: {'Authorization': 'bearer ' + localStorage.getItem('token')}
        }).then(response => response.json()).catch(error => this.handleError(error));
    }

    static async getSite(site_id: number): Promise<SiteDetails> {
        return await fetch(Url.GET_SITE_SEARCH_URL.replace(Url.ARG_SITE_ID, site_id.toString()), {
            mode: "cors",
            method: 'GET',
            headers: {'Authorization': 'bearer ' + localStorage.getItem('token')}
        }).then(response => response.json());
    }

    static async getSiteData(site_id: number): Promise<SitesData[]> {
        return await fetch('http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/sites/data/' + site_id, {
            mode: "cors",
            method: 'GET',
            headers: {'Authorization': 'bearer ' + localStorage.getItem('token')}
        })
            .then(response => response.json())
    }

    static async getSiteByUser( user_id: number ): Promise<Sites[]> {
        return await fetch( Url.GET_SITE_BY_USER_URL.replace(Url.ARG_USER_ID, user_id.toString()), {
            mode: "cors",
            method: 'GET',
            headers: { 'Authorization': 'bearer ' + localStorage.getItem('token')}
        } ).then( response => response.json());
    }



    static async postSite(site: Sites): Promise<Sites> {
        return await fetch('http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/sites/add', {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify({
                'site_numberSite': site.site_number_site,
                'site_dateStart': site.site_date_start,
                'site_dateEnd': site.site_date_end
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(response => response.json());
    }

    static async postSiteData(siteData: SitesData) {
        return await fetch('http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/sites/data/add', {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify({
                'siteData_siteId': siteData.siteData_siteId,
                'siteData_key': siteData.siteData_key,
                'siteData_column': siteData.siteData_column
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(response => response.json());
    }

    static async updateSite(site: Sites) {
        return await fetch('http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/sites/put', {
            method: 'PUT',
            mode: "cors",
            body: JSON.stringify({
                'site_Id': site.site_id,
                'site_numberSite': site.site_number_site,
                'site_dateStart': site.site_date_start,
                'site_dateEnd': site.site_date_end
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(response => response.json()).catch( (error) => this.handleError(error) );
    }

    static async deleteSite(id: number) {
        return await fetch('http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/sites/' + id, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(response => response.json());
    }

    static async updateData(siteData: SitesData) {
        return await fetch('http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/sites/data/put', {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({
                'siteData_id': siteData.siteData_id,
                'siteData_siteId': siteData.siteData_siteId,
                'siteData_key': siteData.siteData_key,
                'siteData_column': siteData.siteData_column
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(response => response.json()).catch( (error) => this.handleError(error) );
    }

    static async getProblemBySite( site_id: number ) {
        return await fetch('http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1/problem/data/getBySite/' + site_id, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        } ).then( response => response.json() );
    }

    static async getAddressGouv(address: string): Promise<GeocodeResponse> {
        return await fetch( 'https://api-adresse.data.gouv.fr/search/?limit=5&q=' + address.replace(' ', '+'), {
            method: 'GET'
        } ).then( response => response.json());
    }


    static isEmpty(data: Object): boolean {
        return Object.keys(data).length === 0;
    }

    static handleError(error: Error): void {
        console.error(error);
    }
}

