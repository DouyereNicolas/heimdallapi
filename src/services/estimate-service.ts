import Estimate from "../models/estimate";


    export async function addEstimate(estimate: Estimate){
        return await fetch(`http://api.heimdall.cda5.lh.manusien-ecolelamanu.fr/heimdallAPI/public/api/v1/estimate/post`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "accept": "application/json"
            },
            "body": JSON.stringify({
                "place": estimate.place,
                "budget": estimate.budget,
                "firstname": estimate.firstname,
                "lastname": estimate.lastname,
                "email":estimate.email,
                "phoneNumber":estimate.budget,
                "description":estimate.desc
            })
        }).then(response => response.json()).catch(error => error);
    }