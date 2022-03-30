import React, { FunctionComponent, useEffect, useState } from "react";
import Users from "../../models/Users";
import UsersData from "../../models/UsersData";
import { getAllRole,getAllUsers, getOneUsersData, getUserById, updateOneUser, updateOneUserData } from "../../services/usersServices";
import { RouteComponentProps } from "react-router-dom";
import { Role } from "../../models/role";
import { BrowserRouter as Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';

type Params = { id: string };

const UpdateUser: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {

    const user= new Users();
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [login, setLogin] = useState("");
    const [roleId, setRoleId] = useState("");
    const [users, setUsers] = useState<Users[]>([]);
    const [lastnameId, setLastnameId] = useState("");
    const [firstnameId, setFirstNameId] = useState("");
    const [lastLogin , setLastLogin] = useState("");

    const history = useHistory();


    let checkLastname: boolean = false;
    let checkFirstname: boolean = false;
    let checkLogin: boolean = false;

    if (lastname) {
        checkLastname = true;
    }
    if (firstname) {
        checkFirstname = true;
    }
    if (login) {
        checkLogin = true;
    }


    useEffect(() => {
        getUserById(+match.params.id).then(user =>{setLogin(user[0].login); setLastLogin(user[0].login)});
        getUserById(+match.params.id).then(user => setRoleId(user[0].role_id));
    }, [match.params.id]);


    useEffect(() => {
        getOneUsersData(+match.params.id).then((i) => {
            if (i.length !== 0 && i.error === undefined) {
                i.map((data: UsersData) => {
                    switch (data.userData_key) {
                        case 'Nom':
                            setLastname(data.userData_column);
                            setLastnameId(data.userData_id.toString())
                            break;
                        case 'Prénom':
                            setFirstname(data.userData_column);
                            setFirstNameId(data.userData_id.toString())
                            break;
                    }
                    return 0
                })
                
            } else {
                i = [];
            }
        })
    }, [match.params.id]);


    const [role, setRole] = useState<Role[]>([]);
    useEffect(() => {
        getAllRole().then((roles) => setRole(roles));
        getAllUsers().then(user => setUsers(user));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (checkLastname === true && checkFirstname === true && checkLogin === true) {
            
            let updateUser: Users = new Users();
            let userData: UsersData = new UsersData();
            if (login !== lastLogin){
                if (users.filter(e => e.login === login).length > 0) {
                    toast.warn("Username Déjà utilisé !👎", {});
                    return;
                }
            }
            
            
            updateUser.id = parseInt(match.params.id)
            updateUser.login = login;
            updateUser.role_id = parseInt(roleId);
            
            await updateOneUser(updateUser).then();

            userData.userData_userId = parseInt(match.params.id);
            userData.userData_id = parseInt(lastnameId);
            userData.userData_key = "Nom";
            userData.userData_column = lastname;
            await updateOneUserData(userData).then();


            userData.userData_userId = parseInt(match.params.id);
            userData.userData_id = parseInt(firstnameId);
            userData.userData_key = "Prénom";
            userData.userData_column = firstname;
            await updateOneUserData(userData).then();

            toast.success('Utilisateur modifié avec succès👍', {});
            
                setTimeout(function() {
                    history.push(`/profile`);
                }, 5000);
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
                theme="dark"/>
            <div id='heroProfileEnfant'>
                <div className="container mt-5 pt-5 justify-content-center d-flex align-items-center h-100">
                    <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
                        <div className="row">
                            <div className="col m8">
                                <div className="card hoverable"  id="cardGeneral">
                                <h2 className="text-center mb-5 mt-2"> Modifier un utilisateur</h2>
                                    <div className="card-stacked">
                                        <div className="card-content p-0">
                                            <div className="form-group">
                                                <label htmlFor="lastname" className="text-secondary">Nom </label>
                                                <input id="lastname" type="text" className="form-control" name="Nom"
                                                    value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="firstname" className="text-secondary">Prénom</label>
                                                <input id="firstname" type="text" className="form-control" name="Prénom"
                                                    value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="login" className="text-secondary">Login</label>
                                                <input  type="text" className="form-control" name="login"
                                                    value={login} onChange={(e) => setLogin(e.target.value)} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="userRole" className="text-secondary">Rôle</label>
                                                <select id="userRole" value={roleId} name="userRole" onChange={(e) => setRoleId(e.target.value)}>
                                                    {role.map((role) => (
                                                        <option key={role.hc_role_id} value={role.hc_role_id}
                                                            selected={user.role_id === role.hc_role_id}>
                                                            {Role.getStringEnum(role.hc_role_id)}
                                                        </option>
                                                    ))}
                                                </select>
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
                    <Link className="btn-floating btn-large waves-effect waves-light orange lighten-1 z-deepth-3"
                        style={{ position: 'fixed', top: '95px', left: '50px' }}
                        to="/profile">
                        <i className="material-icons">navigate_before</i>
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default UpdateUser;
