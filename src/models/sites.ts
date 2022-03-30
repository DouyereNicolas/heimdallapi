import SitesData from "./sitesData";

export default class Sites {
    site_id: number = 0;
    site_number_site: number = 0;
    site_date_start: number = 0;
    site_date_end: number = 0;
    created_at: number|null = null;
    updated_at: number|null = null;
    deleted_at: number|null = null;
    data?: SitesData[]|null = null;

    constructor(site?: Sites ) {
        if (site !== undefined && site !== null) {
            this.site_id = site.site_id;
            this.site_number_site = site.site_number_site;
            this.site_date_start = site.site_date_start;
            this.site_date_end = site.site_date_end;
            this.created_at = site.created_at;
            this.updated_at = site.updated_at;
            this.deleted_at = site.deleted_at;
            this.data = site.data;
        }
    }

    setSiteId(id: number) {
        this.site_id = id;
        return this;
    }
    setNumberSite(nbSite: number) {
        this.site_number_site = nbSite;
        return this;
    }
    // setDateStart(dateStart: ){
    //     this.site_date_start = dateStart;
    //     return this;
    // }
    // setDateEnd(dateEnd: Date){
    //     this.site_date_end = dateEnd;
    //     return this;
    // }
}
