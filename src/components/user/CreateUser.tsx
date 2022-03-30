import React, { FunctionComponent, useState } from "react";
import { postOneUser, postDataUser } from "../../services/usersServices";
import Users from "../../models/Users";
import UsersData from "../../models/UsersData";
import { BrowserRouter as Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateUser: FunctionComponent = () => {

    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [login, setLogin] = useState("");
    const [role, setRole] = useState("0");
    const [password, setPassword] = useState("");
    
    
    
    let userId: number;
    let checkLastname: boolean = false;
    let checkFirstname: boolean = false;
    let checkLogin: boolean = false;
    let checkRole: boolean = false;
    let checkPassword: boolean = false;
    

    if (lastname) {
        checkLastname = true;
    }
    if (firstname) {
        checkFirstname = true;
    }
    if (login) {
        checkLogin = true;
    }
    
    if (password) {
        checkPassword = true;
    }
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (role !== "0") {
            checkRole = true;
        }

        if (checkLastname === true && checkFirstname === true && checkLogin === true && checkPassword === true && checkRole === true) {
            let userToPost: Users = new Users();
            let userDataToPost: UsersData = new UsersData();

            
            userToPost.login = login;
            userToPost.role_id = parseInt(role);
            userToPost.password = password;

            await postOneUser(userToPost).then((e) => {
                
                if (e.login === undefined) {
                    userId = e.user.id;
                }else {
                    toast.warn('Pseudo déjà utilisé !', {});
                }
            });

            userDataToPost.userData_userId = userId;
            userDataToPost.userData_key = "Nom";
            userDataToPost.userData_column = lastname;
            await postDataUser(userDataToPost).then(e =>e);

            userDataToPost.userData_userId = userId;
            userDataToPost.userData_key = "Prénom";
            userDataToPost.userData_column = firstname;
            await postDataUser(userDataToPost).then(e => e);

            toast.success('Client crée avec succès👍', {});
            
        } else {
            toast.warn("Le formulaire n'est pas complet !👎", {});
        }
    }
    return (
        <div className="hero-auto">
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

            <div id="heroProfileEnfant">
                <div className="container mt-5 pt-5 d-flex justify-content-center">
                    <form className="mt-5" onSubmit={e => handleSubmit(e)}>
                        <div className="row">
                            <div className="col m8">
                                <div className="card hoverable" id="cardGeneral">
                                <h2 className="text-center mb-5"> Création Utilisateur</h2>
                                    <div className="card-stacked">
                                        <div className="card-content">
                                            <div className="form-group">
                                                <label htmlFor="lastname" className="text-dark ">Nom </label>
                                                <input id="lastname" type="text" className="form-control" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="firstname" className="text-dark ">Prénom</label>
                                                <input id="firstname" type="text" className="form-control" name="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="login" className="text-dark ">Login</label>
                                                <input id="login" type="text" className="form-control" name="login" value={login} onChange={(e) => setLogin(e.target.value)} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="userRole" className="text-dark ">Rôle</label>
                                                <select id="userRole" name="userRole" onChange={(e) => setRole(e.target.value)}>
                                                    <option disabled={true} value="0" selected={true}>Sélectionner le rôle</option>
                                                    <option value='1'>Client</option>
                                                    <option value='2'>Employé</option>
                                                    <option value='3'>directeur</option>
                                                    <option value='4'>Chef de chantier</option>
                                                    
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="password" className="text-dark">Mot de passe</label>
                                                <input id="password" type="password" className="form-control" name="ref" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>

                                            <div className="card-action center">
                                                <button type="submit" className="btn btn-lg btnLogin">Valider</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <Link className="btn-floating btn-large waves-effect waves-light orange lighten-1 z-deepth-3"
                style={{ position: 'fixed', top: '95px', left: '50px' }}
                to="/profile">
                <i className="material-icons">navigate_before</i>
            </Link>
        </div>

    );

}

export default CreateUser;