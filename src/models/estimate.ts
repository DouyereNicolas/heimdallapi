export default class Estimate {
    id: number;
    place: string;
    budget: string;
    firstname: string;
    lastname: string;
    email: string;
    tel: string;
    desc: string;

    constructor(
        id: number = -1,
        place: string = 'Le Havre',
        budget: string = '100000',
        firstname: string = 'Toto',
        lastname: string = 'Toto',
        email: string = 'toto@email.com',
        tel: string = '0606060606',
        desc: string = 'Décrivez votre projet'
    ) {
        this.id = id;
        this.budget = budget;
        this.place = place;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.tel = tel;
        this.desc = desc;
    }
}
