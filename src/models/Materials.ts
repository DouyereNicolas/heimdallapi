import MaterialData from "./MaterialData";

export default class Materials {

    material_id: number = 0;
    material_ref: string = '';
    created_at: Date | null = new Date();
    updated_at: Date | null = null;
    deleted_at: Date | null = null;
    data?: MaterialData[] | null = null;

    constructor(material?: Materials) {
        if( material !== null && material !== undefined ) {
            this.material_id = material.material_id;
            this.material_ref = material.material_ref;
            this.created_at = material.created_at;
            this.updated_at = material.updated_at;
            this.deleted_at = material.deleted_at;
            this.data = material.data;
        }

    }
}
