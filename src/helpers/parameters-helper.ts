import Sites from "../models/sites";

export default class ParametersHelper {

    static testFormatDate( value: string ) {

        // format: YYYY-MM-DD

        return /^[2][0-9]{3}[-][0-9]{2}[-][0-9]{2}$/.test(value);
    }

    static testString(value: string) {
        return /^[a-zA-Zàéè ]{3,25}$/.test(value)
    }


    static testInt(value: string) {
        return /^[0-9]{1,25}$/.test(value)
    }
    static isValidAddress(value: string) {
        return /([0-9]{4}) ?([a-zA-Z ]*) ?([0-9]{5}) ?([a-zA-Z]*)/.test(value);
    }

    static isValideEmail(value: string) {
        return /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(value)
    }

    static isValideTel(value: string) {
        return /^((\+|00)33\s?|0)[67](\s?\d{2}){4}$/.test(value)
    }

    static testFirstname(field: any) {

        if (!this.testString(field.value)) {
            field.error = 'Le prénom est requis (3-25).';
            field.isValid = false;
        } else {
            field.isValid = true;
        }
        return field;
    }

    static testLastname(field: any) {

        if (!this.testString(field.value)) {
            field.error = 'Le nom est requis (3-25).';
            field.isValid = false;
        } else {
            field.isValid = true;
        }
        return field;
    }

    static testPlace(field: any) {

        if (!this.testString(field.value)) {
            field.error = 'Le lieu est requis (3-25).';
            field.isValid = false;
        } else {
            field.isValid = true;
        }
        return field;
    }

    static testBudget(field: any) {

        if (!this.testInt(field.value)) {
            field.error = 'Le budget est requis (3-25).';
            field.isValid = false;
        } else {
            field.isValid = true;
        }
        return field;
    }

    static testEmail(field: any) {

        if (!this.isValideEmail(field.value)) {
            field.error = 'L\'email n\'est pas valide';
            field.isValid = false;
        } else {
            field.isValid = true;
        }
        return field;
    }

    static testTel(field: any) {

        if (!this.isValideTel(field.value)) {
            field.error = 'Le numéro de téléphone n\'est pas valide';
            field.isValid = false;
        } else {
            field.isValid = true;
        }
        return field;
    }
    static testProblemName(field: string) {

        if (field.length > 25) {
            return false
        } else {
            return true
        }
    }
    static testTextLength(field: string) {

        if (field.length > 400) {
            return false
        } else {
            return true
        }
    }

    static testNameMaterial(field: string) {

        if (field.length > 25) {
            return false
        } else {
            return true
        }
    }

    static testCatMaterial(field: string) {

        if (field.length > 25) {
            return false
        } else {
            return true
        }
    }

    static testRefMaterial(field: string) {

        if (field.length > 25) {
            return false
        } else {
            return true
        }
    }

    static checkNombreMaterial(value: any) {

        if (!this.testInt(value)) {
            return false;
        } else {
            return true;
        }
    }

    static testNumberSite(field: any, allSites?: Sites[]) {

        if (!this.testInt(field.numberSite.value)) {
            field.numberSite.error = 'Le numéro de chantier est requis (3-25).';
            field.numberSite.isValid = false;
        } else {
            if (allSites) {
                if (allSites.filter( (s) => s.site_number_site === Number(field.numberSite.value) ).length === 0) {
                    field.numberSite.isValid = true;
                }else{
                    field.numberSite.error = 'Le numéro de chantier éxiste déjà.';
                    field.numberSite.isValid = false;
                }
            }else{
                field.numberSite.isValid = true;
            }
        }
        return field;
    }


    static testDate(field: any) {
        if (field.dateStart) {
            if (!this.testFormatDate(field.dateStart.value)) {
                field.dateStart.error = 'Le format date n\'est pas valide';
                field.dateStart.isValid = false;
            }else {
                field.dateStart.isValid = true;
            }
        }
        if( field.dateEnd ) {
            if (!this.testFormatDate(field.dateEnd.value)) {
                field.dateEnd.error = 'Le format date n\'est pas valide';
                field.dateEnd.isValid = false;
            }else {
                field.dateEnd.isValid = true;
            }
        }
        return field;
    }

    static testAddress(field: string) {

        if (field.length > 5) {
            return this.isValidAddress(field);
        }
    }

    static testPassword( field: any ) {
        if( this.testString( field ) ) {
            return true;
        }else{
            return false;
        }
    }

}
