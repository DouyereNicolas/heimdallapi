import UsersData from "./UsersData";

export default class Users {
    id: number = 0;
    login: string = '';
    password: string = '';
    role_id: number = 0;
    created_at: Date = new Date();
    updated_at: Date|null = null;
    deleted_at: Date|null = null;
    data?: UsersData[]|null = null;

    constructor( user?: Users ) {
        if( user !== null && user !== undefined ) {
            this.id = user.id;
            this.login = user.login;
            this.password = user.password;
            this.role_id = user.role_id;
            this.created_at = user.created_at;
            this.updated_at = user.updated_at;
            this.deleted_at = user.deleted_at;
            this.data = user.data;
        }
    }
}
