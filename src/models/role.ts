
enum GetRole {
    UNDEFINED,
    CUSTOMER,
    EMPLOYEE,
    DIRECTOR,
    MANAGER
}
class Role {
    hc_role_id: number;
    hc_role_name: string;

    constructor(
        hc_role_id = 0,
        hc_role_name = ''
    ) {
        this.hc_role_id = hc_role_id;
        this.hc_role_name = hc_role_name;
    }

    public static getStringEnum(role: GetRole) {
        switch (role) {
            case GetRole.CUSTOMER:
                return 'Client';
            case GetRole.EMPLOYEE:
                return 'Employée';
            case GetRole.DIRECTOR:
                return 'Directeur';
            case GetRole.MANAGER:
                return 'Chef de chantier';
            case GetRole.UNDEFINED:
                return 'Sans emploi';
        }
    }
}



export {Role, GetRole};
