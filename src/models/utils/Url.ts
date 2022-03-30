import { url } from "inspector";

class Url {

    // ARG ID
    static readonly ARG_SITE_ID = ':siteId';
    static readonly ARG_USER_ID = ':userId';
    static readonly ARG_ROLE_ID = ':roleId';
    static readonly ARG_MATERIAL_ID = ':materialId';
    static readonly ARG_TASK_ID = ':taskId';
    static readonly ARG_PROBLEM_ID = ':problemId';
    static readonly ARG_DATA_ID = ':dataId';


    static readonly BASE_URL = 'http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/api/v1';
    //static readonly BASE_URL = 'http://heimdallapi/api/v1';

    // URL LOGIN
    static readonly POST_LOGIN_URL = Url.BASE_URL + '/login';

    // URL SITES
    static readonly GET_ALL_SITES_URL = Url.BASE_URL + '/sites';

    static readonly GET_SITE_SEARCH_URL = Url.GET_ALL_SITES_URL + '/search/' + Url.ARG_SITE_ID;
    static readonly GET_SITE_BY_USER_URL = Url.GET_ALL_SITES_URL + '/user/' + Url.ARG_USER_ID;

    static readonly POST_SITE_URL = Url.GET_ALL_SITES_URL;
    static readonly PUT_SITE_URL = Url.GET_ALL_SITES_URL + '/update';
    static readonly DELETE_SITE_URL = Url.GET_ALL_SITES_URL + '/delete/' + Url.ARG_SITE_ID;

    // URL SITES DATA
    static readonly GET_SITE_DATA_URL = Url.GET_ALL_SITES_URL + '/data/' + Url.ARG_SITE_ID;

    static readonly POST_SITE_DATA_URL = Url.BASE_URL + '/sites/data';
    static readonly PUT_SITE_DATA_URL = Url.BASE_URL + '/sites/data/update';
    static readonly DELETE_SITE_DATA_URL = Url.BASE_URL + '/sites/data/delete/' + Url.ARG_DATA_ID;

    // URL USERS
    static readonly GET_ALL_USERS_URL = Url.BASE_URL + '/users';
    static readonly GET_USER_URL = Url.BASE_URL + '/users/get/' + Url.ARG_USER_ID;
    static readonly GET_USERS_BY_ROLE_URL = Url.BASE_URL + '/users/role/' + Url.ARG_ROLE_ID;
    static readonly GET_USER_DETAIL_URL = Url.BASE_URL + '/users/getOneUserWithData/' + Url.ARG_USER_ID;

    //URL PROBLEMS
    static readonly DELETE_TICKET_URL = Url.BASE_URL + '/tickets/delete/' + Url.ARG_PROBLEM_ID;
    static readonly GET_ALL_TICKET_URL = Url.BASE_URL + '/tickets';
    static readonly GET_TICKET_URL = Url.BASE_URL + '/tickets/'+Url.ARG_PROBLEM_ID;
    static readonly UPDATE_TICKET_URL = Url.BASE_URL + 'tickets/update';
    static readonly POST_TICKET_URL = Url.BASE_URL + '/tickets';

    // URL MATERIALS
    static readonly GET_ALL_MATERIALS_URL = Url.BASE_URL + '/materials';
    static readonly GET_MATERIAL_DETAIL_URL = Url.BASE_URL + 'material/getDetail/' + Url.ARG_MATERIAL_ID;

    // URL TASKS
    static readonly GET_ALL_TASKS_URL = Url.BASE_URL + '/plannings/searchAllTask';
    static readonly POST_TASK_URL = Url.BASE_URL + '/plannings/nativeTask';
    static readonly PUT_TASK_URL = Url.BASE_URL + '/plannings/tasks';

    // URL TASKS DATA
    static readonly GET_TASK_DATA_URL = Url.BASE_URL + '/plannings/tasks/data/' + Url.ARG_TASK_ID;
    static readonly POST_TASK_DATA_URL = Url.BASE_URL + 'plannings/nativeData';
    static readonly PUT_TASK_DATA_URL = Url.BASE_URL + '/plannings/tasks/data';

}

export {Url};