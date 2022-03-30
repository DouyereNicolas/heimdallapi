export default  class SitesData {
    siteData_id: number;
    siteData_siteId: number;
    siteData_key: string;
    siteData_column: string;

    constructor(
        siteData_id: number = 0,
        siteData_siteId: number = 0,
        siteData_key: string = '',
        siteData_column: string = ''
    ) {
        this.siteData_id = siteData_id;
        this.siteData_siteId = siteData_siteId;
        this.siteData_key = siteData_key;
        this.siteData_column = siteData_column;
    }
}
