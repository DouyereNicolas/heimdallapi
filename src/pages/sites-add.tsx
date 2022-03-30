import React, { FunctionComponent, useState } from "react";
import Sites from "../models/sites";
import SitesForm from "../components/site/sites-form";


const SitesAdd: FunctionComponent = () => {
    const [sites] = useState<Sites>(new Sites());

    return (
        <div className="heroMaterial">
            <div id="materialFristDiv">
                <div className="container mt-5">
                    <h2 className="header center text-light">Ajouter un chantier</h2>
                    <SitesForm site={sites} />
                </div>
            </div>
        </div>
    )
}
export default SitesAdd;
