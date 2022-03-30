export default class MaterialData {

    materialData_id: number;
    materialData_materialId: number;
    data_key: string;
    data_column: string;

    constructor(
        materialData_id: number = -1,
        materialData_materialId: number = -1,
        data_key: string = "",
        data_column: string = "",

    ) {
        this.materialData_id = materialData_id;
        this.materialData_materialId = materialData_materialId;
        this.data_key = data_key;
        this.data_column = data_column;

    }
}
