import React, {FunctionComponent} from "react";
import Sites from "../../models/sites";
import Moment from 'moment';
import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";



type Props = {
    site: Sites
}

const SitesCard: FunctionComponent<Props> = ({site}) => {
    const history = useHistory();
    const goToSite = (id: number) => {
        history.push(`/sites/search/${id}`);
    }
    const goToEdit = (id: number) => {
        history.push(`/sites/edit/${id}`);
    }

    const setDates = (date: number) => {
        let myDate = Moment.unix(date);
        return myDate.format('DD/MM/YYYY');
    }

    console.log(site);
    // const setPourcentage = () => {
    //     var start = site.site_date_start
    //     var end = site.site_date_end
    //     var dateStart = new Date(start)
    //     var dateEnd = new Date(end)
    //     var dateNow = new Date()
    //     var retour = 0
    //
    //     if(dateNow < dateStart){
    //         retour =  0;
    //     }
    //     else if (dateNow > dateEnd){
    //         retour = 100
    //     }else{
    //         var Diff_tempsSite = dateEnd.getTime() - dateStart.getTime();
    //         var Diff_joursSite = Diff_tempsSite / (1000 * 3600 * 24);
    //
    //         var Diff_tempsNow = dateNow.getTime() - dateStart.getTime();
    //         var Diff_joursNow = Diff_tempsNow / (1000 * 3600 * 24);
    //         Diff_joursNow = Math.round(Diff_joursNow)
    //         var pourcen = (Diff_joursNow/Diff_joursSite)*100
    //         pourcen = Math.round(pourcen)
    //         retour = pourcen
    //     }
    //
    //     return retour
    // }

    // pourcentage = setPourcentage()

    return (
        <div className="col-sm-12 col-md-6 col-lg-3 s6 m4">
            <div className="card-deck">
                <div className="card">
                    <img src="https://batiadvisor.fr/wp-content/uploads/2019/07/pgc-chantier.jpg" alt="Props"/>
                    <div className="card-body" style={{ minHeight: '300px' }}>
                        <h5 className="card-title d-flex justify-content-center">{site.site_id}</h5>
                        <p className="card-id">Numéro de chantier : {site.site_number_site} </p>
                        <p className="card-date">Débute le : {setDates(site.site_date_start)}</p>
                        {
                            site.site_date_end !== null ? <p>Terminé le
                                    : {setDates(site.site_date_end)}</p> :
                                <p>En cours</p>
                        }
                        {/*<ProgressBar animated now={pourcentage} variant={pourcentage == 100 ? "success" : ""}/>*/}
                        <div className="d-flex justify-content-center">
                        <Button variant="outline-warning" type="submit" className="mt-3 m-3 btn-floating btn-meduim waves-effect waves-light green z-deepth-3"  onClick={ () => goToSite(site.site_id)}>
                            <i className="material-icons">search</i>
                        </Button>
                        <Button variant="outline-warning" type="submit" className="mt-3 m-3 btn-floating btn-meduim waves-effect waves-light yellow z-deepth-3"  onClick={ () => goToEdit(site.site_id)}>
                            <i className="material-icons">edit</i>
                        </Button>
                        
                                {/* <Button className="m-2" variant="outline-warning" onClick={ () => goToSite(site.site_Id)} >Detail</Button> 
                                <Button className="m-2" variant="outline-warning" onClick={ () => goToEdit(site.site_Id)} >Edit</Button>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SitesCard;
