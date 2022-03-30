export enum MaterialCategory {
    UNDEFINED,
    PELLE,
    MARTEAU,
    PERCEUSE,
    VEHICULE,
    TRANSPALETTE,
    BROUETTE,
    DIABLE
}
export class MaterialCategoryUtils {

    public static getCategoriesArray(): MaterialCategory[] {
        return [
            MaterialCategory.PELLE,
            MaterialCategory.MARTEAU,
            MaterialCategory.PERCEUSE,
            MaterialCategory.VEHICULE,
            MaterialCategory.TRANSPALETTE,
            MaterialCategory.BROUETTE,
            MaterialCategory.DIABLE
        ];
    }

    public static getTextCategory( cat: MaterialCategory ): string {
        switch (cat) {
            case MaterialCategory.BROUETTE:
                return 'Brouette';
            case MaterialCategory.DIABLE:
                return 'Diable';
            case MaterialCategory.MARTEAU:
                return 'Marteau';
            case MaterialCategory.TRANSPALETTE:
                return 'Transpalette';
            case MaterialCategory.PERCEUSE:
                return 'Perceuse';
            case MaterialCategory.PELLE:
                return 'Pelle';
            case MaterialCategory.VEHICULE:
                return 'Véhicule';
            case MaterialCategory.UNDEFINED:
                return 'undefined';
        }
    }
}
