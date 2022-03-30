import { Calendar, momentLocalizer } from 'react-big-calendar'
import React,{useEffect} from "react";
import moment from "moment";



const PlanningChantier = ({eventsChantier}) => {
    const localizer = momentLocalizer(moment);

    
    const detailChantier = (event) => {

    }
    var buttonMoi ;
    var buttonAgenda ;

    useEffect(() => {
        
        let collection = document.getElementsByTagName("button")
        for (let i = 0; i < collection.length; i++) {
            if (collection[i].innerHTML === "Week" || collection[i].innerHTML === "Day" || collection[i].innerHTML === "Today") {
                collection[i].style.display = "none"
            }else if(collection[i].innerHTML === "Month" ){
                collection[i].innerHTML = "Mois"
                buttonMoi = collection[i]
            }
            else if(collection[i].innerHTML === "Mois" ){
                collection[i].innerHTML = "Mois"
                buttonMoi = collection[i]
            }
            else if (collection[i].innerHTML === "Next"){
                collection[i].innerHTML = "Suiv."
            }
            else if (collection[i].innerHTML === "Back"){
                collection[i].innerHTML = "Arr."
            }else if(collection[i].innerHTML === "Agenda"){
                buttonAgenda = collection[i]
            }
            var nameMonth = document.getElementsByClassName("rbc-toolbar-label")
            for (let i = 0; i < nameMonth.length; i++) {
                console.log(nameMonth[i])
            }
        }
        
        buttonMoi ? buttonMoi.click() : console.log()
        buttonAgenda ? buttonAgenda.click() : console.log()
        buttonMoi ? buttonMoi.click() : console.log()
        setTimeout(()=>{
            buttonMoi ? buttonMoi.click() : console.log()
            var tabTextJour = ["Dimanche","Lundi","Mardi","mercredi","Jeudi","Vendredi","Samedi"]
            var divHeader = document.getElementsByClassName("rbc-header")
            for (let i = 0; i < divHeader.length; i++) {
                var elem = divHeader[i].childNodes
                for (let j=0;j<elem.length;j++){
                    elem[j].innerHTML = tabTextJour[i]
                }
            };
        }
            ,100)
    }, []);
    return(
        <>
            {console.log(eventsChantier)}
            <div className="planningChantier">
            
           
                    <h1 className="center pt-5 mt-5 text-light">Planning chantier</h1>
                    <div className="container">
                        <div className="row">

                            <Calendar
                                localizer={localizer}
                                defaultDate={new Date()}
                                defaultView="month"
                                events={eventsChantier}
                                onSelectEvent={(event) => detailChantier(event)}
                                style={{ height: "100vh" }}
                            />

                        </div>
                    </div>
                </div>
     
        
        </>
    )

}

export default PlanningChantier