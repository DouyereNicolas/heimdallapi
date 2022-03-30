import React, { FunctionComponent, useState } from 'react';
import EstimateForm from "../components/estimate/estimate-form";
import Estimate from "../models/estimate";
import "./estimate.css";

const EstimateAdd: FunctionComponent = () => {
    const [id] = useState<number>(new Date().getTime());
    const [estimate] = useState<Estimate>(new Estimate(id));

    return (
        <>
            <div className="heroEstimate">
                <div id="materialFristDiv">
                    <div className="container mt-5">
                        <h2 className="header center estimateStyleTitle">Demande de devis</h2>
                        <EstimateForm estimate={estimate} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default EstimateAdd;
