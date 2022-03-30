import moment from "moment";


export const TokenValidity = (): boolean => {
    let validToken = moment().unix() < Number(localStorage.getItem('token_validity'));
    if (!validToken) {
        localStorage.clear();
    }
    return validToken;
}