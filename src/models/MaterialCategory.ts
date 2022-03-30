
export default class MaterialCategory {
    materialCategory_id: number;
    materialCategory_name : string;

    constructor(
        materialCategory_id: number = 0,
        materialCategory_name : string = "",
    ) {
        this.materialCategory_id = materialCategory_id;
        this.materialCategory_name = materialCategory_name;
       
    }
}
