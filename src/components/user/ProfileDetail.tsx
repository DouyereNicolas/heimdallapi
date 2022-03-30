import React, { useState, useEffect, FunctionComponent } from 'react';
import Users from '../../models/Users';
import UsersData from '../../models/UsersData';
import Moment from 'moment';
import "../../pages/CheckProfile.css";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { getOneUsersData,deleteOneUser,updateOneUserPassword} from '../../services/usersServices';
import { useHistory } from 'react-router';
import { Modal } from 'react-bootstrap';
import { Role ,GetRole} from '../../models/role';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    user: Users
};

const ProfileDetail: FunctionComponent<Props> = ({ user }) => {
    const [usersData, setUsersData] = useState<UsersData[]>([]);
    useEffect(() => {
        getOneUsersData(user.id).then(usersData => setUsersData(usersData));
    }, [user.id]
    )
    const history = useHistory();
    const updateUser = (id: number) => {
        history.push(`/users/update/${id}`);
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);


    const updatePwd = () => {
        setPassword('');
        setConfirmPassword('');
        setShowUpdate(true);
    }

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'password':
                setPassword(e.target.value)
                break;
            case 'confirmPassword':
                setConfirmPassword(e.target.value);
                break;
        }
    }

    const disableSubmit = () => {
        let disabled: boolean = true;
        if (validatePwd()) {
            if (password === confirmPassword) {
                disabled = false;
            } else {
                disabled = true;
            }
        }
        return disabled;
    }

    const validatePwd = () => {
        return (password && confirmPassword);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (true) {
            user.password = password;
            await updateOneUserPassword(user).then(e => e);
            setShowUpdate(false);
            toast.success('mot de passe modifié avec succès👍', {});
        } else {
            toast.warn("Le formulaire n'est pas complet !👎", {});
        }
    }
    const checkRole = (role: GetRole) => {
        switch (role) {
            case GetRole.DIRECTOR:
            case GetRole.MANAGER:
                return true;
            case GetRole.CUSTOMER:
            case GetRole.EMPLOYEE:
            case GetRole.UNDEFINED:
            default:
                return false;
        }
    }
    function deleteUser(id: number) {
        setShow(true);
    }
    async function confirmDelete(id: number) {
        let responseDelete = null;
        await deleteOneUser(id).then(e => responseDelete = e)
        if (responseDelete !== null) {
        } else {
            toast.warn("Erreur lors de la suppression !👎", {});
            setTimeout(function() {
                window.location.reload();
            }, 5000);
        }
        setShow(false);
        toast.success('Utilisateur supprimé avec succès👍', {});
        setTimeout(function() {
            window.location.reload();
        }, 5000);
        
    }
    if (checkRole(Number(localStorage.getItem('user_role')))){
        return (
            <>
    
                <Modal show={show} onHide={handleClose} className="deleteModal" animation={false}>
                    <div className="text-center"><Modal.Body>Etes-vous sur de vouloir supprimer l'utilisateur  "{user.login}"</Modal.Body>
                        <div className="d-flex justify-content-around">
                            <Button variant="secondary" onClick={handleClose}>Annuler</Button>
                            <Button variant="danger" onClick={() => confirmDelete(user.id)}>Supprimer</Button>
                        </div>
                    </div>
                </Modal>
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
                theme="dark"
                z-index="9999999"
                />
                <Modal show={showUpdate} onHide={handleCloseUpdate} className="deleteModal" animation={false}>
                    <div className="text-center">
                        <Modal.Body>
                            <div className="d-flex justify-content-center">
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <div>
                                        <label className="text-dark">Mot de passe</label>
                                        <input type="password" value={password} name="password" onChange={e => handlePwdChange(e)} />
                                        <label className="text-dark">Confirmer le mot de passe</label>
                                        <input type="password" value={confirmPassword} name="confirmPassword" onChange={e => handlePwdChange(e)} />
                                    </div>
                                    <div className="d-flex justify-content-around">
                                        <Button type="submit" className="btn btn-lg btnLogin" disabled={disableSubmit()}> Valider </Button>
                                        <Button className="btn btn-lg btnLogin" onClick={handleCloseUpdate} > Annuler </Button>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </div>
                </Modal>
    
                <div className="page-content page-container" id="page-content">
                    <div className="padding">
                        <div className="row container d-flex justify-content-center">
                            <div className="col-xl-12 col-md-12">
                                <div className="card user-card-full" id='cardProfil'>
                                    <div className="row mb-3">
                                        <div className="col-sm-4 bg-c-lite-green user-profile">
                                            <div className="card-block text-center text-white">
                                                <div className="m-b-25"> <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile" /> </div>
                                                <h6 className="f-w-600">Profil {user.id}</h6>
                                                {usersData.map(userData => (
                                                <p className="">{userData.userData_key} : {userData.userData_column}</p>
                                                ))}
                                                <Button variant="outline-success" type="submit" className="mt-3 m-3 btn-floating btn-small waves-effect waves-light" onClick={() => updateUser(user.id)}>
                                                <i className="material-icons">border_color</i>
                                                </Button>
                                                <Button variant="outline-danger" type="submit" className="mt-3 m-3 btn-floating btn-small waves-effect waves-light" onClick={() => deleteUser(user.id)}>
                                                    <i className="material-icons">delete</i>
                                                </Button>
                                                <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                            </div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="card-block">
                                                <h6 className="m-b-20 p-b-5 b-b-default f-w-600 textStyle">Information</h6>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Email :</p>
                                                        <h6 className="text-muted f-w-400">contact@heimdall.fr</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Tél :</p>
                                                        <h6 className="text-muted f-w-400">0235350206</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Rôle :</p>
                                                        <h6 className="text-muted f-w-400">
                                                            {Role.getStringEnum(user.role_id)}
                                                        </h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Login :</p>
                                                        <h6 className="text-muted f-w-400">{user.login}</h6>
                                                    </div>
                                                </div>
                                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600 textStyle">Autres</h6>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Crée le :</p>
                                                        <h6 className="text-muted f-w-400">{Moment(user.created_at).format('DD/MM/YYYY')}</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Modifié le :</p>
                                                        <h6 className="text-muted f-w-400">{Moment(user.updated_at).format('DD/MM/YYYY')}</h6>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center text-center align-items-center">
                                                    <h6 className="text-muted f-w-400 text-center">Mot de passe perdu</h6>
                                                    <Button variant="outline-success" type="submit" className="mt-3 m-3 btn-floating btn-small waves-effect waves-light green z-deepth-3" onClick={updatePwd}>
                                                <i className="material-icons">border_color</i> 
                                                </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }else{
        return (
            <>
    
                <Modal show={show} onHide={handleClose} className="deleteModal" animation={false}>
                    <div className="text-center"><Modal.Body>Etes-vous sur de vouloir supprimer l'utilisateur {user.login} </Modal.Body>
                        <div className="d-flex justify-content-around">
                            <Button variant="secondary" onClick={handleClose}>Annuler</Button>
                            <Button variant="danger" onClick={() => confirmDelete(user.id)}>Supprimer</Button>
                        </div>
                    </div>
                </Modal>
    
                <Modal show={showUpdate} onHide={handleCloseUpdate} className="deleteModal" animation={false}>
                    <div className="text-center">
                        <Modal.Body>
                            <div className="d-flex justify-content-center">
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <div>
                                        <label className="text-dark textStyle">Mot de passe</label>
                                        <input type="password" value={password} name="password" onChange={e => handlePwdChange(e)} />
                                        <label className="text-dark textStyle">Confirmer le mot de passe</label>
                                        <input type="password" value={confirmPassword} name="confirmPassword" onChange={e => handlePwdChange(e)} />
                                    </div>
                                    <div className="d-flex justify-content-around">
                                        <Button type="submit" className="btn btn-lg btnLogin" disabled={disableSubmit()}> Valider </Button>
                                        <Button className="btn btn-lg btnLogin" onClick={handleCloseUpdate} > Annuler </Button>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </div>
                </Modal>
    
                <div className="page-content page-container" id="page-content">
                    <div className="padding">
                        <div className="row container d-flex justify-content-center">
                            <div className="col-xl-12 col-md-12">
                                <div className="card user-card-full" id='cardProfil'>
                                    <div className="row mb-3">
                                        <div className="col-sm-4 bg-c-lite-green user-profile">
                                            <div className="card-block text-center text-white">
                                                <div className="m-b-25"> <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-" /> </div>
                                                <h6 className="f-w-600">Profil {user.id}</h6>
                                                
                                            </div>
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="card-block">
                                                <h6 className="m-b-20 p-b-5 b-b-default f-w-600 textStyle">Information</h6>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Email :</p>
                                                        <h6 className="text-muted f-w-400">contact@heimdall.fr</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Tél :</p>
                                                        <h6 className="text-muted f-w-400">0235350206</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Rôle :</p>
                                                        <h6 className="text-muted f-w-400">
                                                            {Role.getStringEnum(user.role_id)}
                                                        </h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Login :</p>
                                                        <h6 className="text-muted f-w-400">{user.login}</h6>
                                                    </div>
                                                </div>
                                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600 textStyle">Autres</h6>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Crée le :</p>
                                                        <h6 className="text-muted f-w-400">{Moment(user.created_at).format('DD/MM/YYYY')}</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Modifié le :</p>
                                                        <h6 className="text-muted f-w-400">{Moment(user.updated_at).format('DD/MM/YYYY')}</h6>
                                                    </div>
                                                </div>
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    
}

export default ProfileDetail;
