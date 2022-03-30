export default class UsersData {

    userData_id: number;
    userData_userId: number;
    userData_key: string;
    userData_column: string;

    constructor(
        userData_id: number = 0,
        userData_userId: number = 0,
        userData_key: string = "",
        userData_column: string = "",
    )
    {
        this.userData_id = userData_id;
        this.userData_userId = userData_userId;
        this.userData_key = userData_key;
        this.userData_column = userData_column;
    }

}
