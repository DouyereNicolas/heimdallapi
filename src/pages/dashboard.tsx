import React, {FunctionComponent} from 'react';
import {  Link} from "react-router-dom";
import DashboardEmployees from "../components/dashbaord/Pages/DashboardEmployees/DashboardEmployees";
import "../components/dashbaord/Pages/DashboardEmployees/DashboardEmployees.css";



const Dashboard: FunctionComponent = () => {

return (
<>
    <div className="hero-auto">
        <div className="container containerWhite">
            <div>
                <DashboardEmployees />
            </div>
        </div>
    </div>
    <div style={{ position: 'fixed', top: '130px', left: '50px' }} className="none-sm">
        <p className="h5 text-light">Ajouter un chantier</p>
    <Link className="btn-floating btn-large waves-effect waves-light green lighten-1 z-deepth-3"
        style={{ position: 'fixed', top: '160px', left: '95px' }} to="/sites/add">
    <i className="material-icons">add</i>
    </Link>
    </div>

    <div style={{ position: 'fixed', top: '260px', left: '50px' }} className="none-sm">
        <p className="h5 text-light">Ajouter du matériel</p>
    <Link className="btn-floating btn-large waves-effect waves-light green lighten-1 z-deepth-3"
        style={{ position: 'fixed', top: '290px', left: '95px' }} to="/CreateMaterial">
    <i className="material-icons">add</i>
    </Link>
    </div>

    <div style={{ position: 'fixed', top: '390px', left: '50px' }} className="none-sm">
        <p className="h5 text-light">Ajouter un Rdv</p>
    <Link className="btn-floating btn-large waves-effect waves-light green lighten-1 z-deepth-3"
        style={{ position: 'fixed', top: '420px', left: '95px' }} to="/planning/add">
    <i className="material-icons">add</i>
    </Link>
    </div>
</>
)
};



export default Dashboard;