import React, { FunctionComponent, useState } from "react";
import Estimate from "../../models/estimate";
import { addEstimate } from "../../services/estimate-service";
import "../../pages/estimate.css";
import { send } from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type Props = {
    estimate: Estimate
}

const EstimateForm: FunctionComponent<Props> = () => {

    const [place, setPlace] = useState("");
    const [budget, setBudget] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [desc, setDesc] = useState("");
    



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const estimate = new Estimate();
        estimate.place = place;
        estimate.budget = budget;
        estimate.firstname = firstname;
        estimate.lastname = lastname;
        estimate.email = email;
        estimate.tel = tel;
        estimate.desc = desc;
       
        send(
            'service_p17tyxn',
            'template_usnf46z',
            {
                from_name: 'Heimdall Construction',
                to_name: estimate.firstname + " "+ estimate.lastname,
                message: 'Vous souhaiter un chantier a ladresse suivante : '+ estimate.place + " pour un budget max de "+estimate.budget
                +" qui a pour descritpion " + estimate.desc + " Vous etes joignable par mail : " + estimate.email + " ou au numero : " + estimate.tel,
                reply_to: estimate.email,
                
            },
            'user_RnDipXJGB3Kv9T7gL2Ih0'
        ).then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            toast.success('Message envoyer avec succès👍', {});
        })
            .catch((err) => {
                console.log('FAILED...', err);
                toast.warn("Le formulaire n'est pas complet !👎", {});
            })
        
          await addEstimate(estimate);
    }


    return (

        <form className="mt-5" onSubmit={e => handleSubmit(e)}>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastClassName="dark-toast"
                theme="dark" />

            <div className="row">
                <div className="col s12 m8">
                    <div className="card hoverable">
                        <div className="card-stacked">
                            <div className="card-content">
                                <div className="form-group">
                                    <label htmlFor="place" className="text-dark">Lieu de construction souhaitée</label>
                                    <input id="place" className="form-control" name="place"
                                        value={place} onChange={e => setPlace(e.target.value)} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="budget" className="text-dark">Budget maximum total</label>
                                    <input id="budget" className="form-control" name="budget"
                                        value={budget} onChange={e => setBudget(e.target.value)} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstname" className="text-dark">Prénom</label>
                                    <input id="firstname" className="form-control" name="firstname"
                                        value={firstname} onChange={e => setFirstname(e.target.value)} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastname" className="text-dark">Nom</label>
                                    <input id="lastname" className="form-control" name="lastname"
                                        value={lastname} onChange={e => setLastname(e.target.value)} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="text-dark">Email</label>
                                    <input id="email" className="form-control" name="email"
                                        value={email} onChange={e => setEmail(e.target.value)} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="tel" className="text-dark">Téléphone</label>
                                    <input id="tel" className="form-control" name="tel"
                                        value={tel} onChange={e => setTel(e.target.value)} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="desc" className="text-dark">Décrivez votre projet</label>
                                    <textarea id="desc" className="form-control styleArea" name="desc"
                                        value={desc} onChange={e => setDesc(e.target.value)}>
                                    </textarea>

                                </div>
                            </div>
                            <div className="card-action center">
                                <button type="submit" className="btn btn-lg btnLogin">Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default EstimateForm;
