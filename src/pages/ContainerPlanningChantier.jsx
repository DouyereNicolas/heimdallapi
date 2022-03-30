import React, {useEffect, useState} from "react";
import PlanningChantier from "../components/planning/PlanningChantier";
import SitesService from "../services/sites-service";
import Moment from 'moment';



const ContainerPlanningChantier = () => {
    const id_user = localStorage.getItem("user_id")
    const [siteList,setSiteList] = useState([])
    const events = [];
    useEffect(() => {
        getSites()
    }, []);


    useEffect(()=>{
        formatEvent()
    },[siteList])

    const getSites = async () => {
        var resp;
        if(localStorage.getItem("user_role") === "3" || localStorage.getItem("user_role") === "4" ){
            resp = await SitesService.getAllSites()
            if(resp.length ===0){
                resp = []
            }
        }else{

            resp = await SitesService.getSiteByUser(id_user)
            resp = resp.sites
        }
        if(resp.sites){
            setSiteList([])
        }else{
            setSiteList(resp)
        }
        
    }

    const formatEvent = () => {
        if(siteList){

            siteList.map((site)=>{
                events.push({
                    title:site.site_number_site,
                    start:setDate(site.site_date_start),
                    end:setDate(site.site_date_end),
                    ressourceId:site.site_id
                  })
                  return 0
            })
        }
        
    }

    const setDate =(date) => {
        let myDate = Moment.unix(date);
        return myDate.format('YYYY-MM-DD hh:mm:ss');
    }

    return(
        <>
            <div className="hero-auto">
                <PlanningChantier eventsChantier={events} />
            </div>
        </>
            )
}

export default ContainerPlanningChantier;