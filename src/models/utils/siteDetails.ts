import Sites from "../sites";
import Users from "../Users";
import Materials from "../Materials";
import Problem from "../Problem";

export class SiteDetails {
    site: Sites;

    users: Users[];

    materials: Materials[];

    tickets: Problem[];

    constructor(siteDetails?: SiteDetails) {
        this.site = new Sites();
        this.users = [];
        this.materials = [];
        this.tickets = [];
        if (siteDetails !== null && siteDetails !== undefined) {
            this.site = siteDetails.site;
            this.users = siteDetails.users;
            this.materials = siteDetails.materials;
            this.tickets = siteDetails.tickets;
        }
    }

}