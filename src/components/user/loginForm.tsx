import React, { FunctionComponent, useState } from "react";
import { useHistory } from 'react-router-dom';
import {  login } from '../../services/usersServices';
import "../../pages/Login.css";
import { useUser } from "../../contexts/userContext";
import logo from "../../assets/img/HeimdallContructionSansFond.png"
import { toast, ToastContainer } from "react-toastify";

type Field = {
    value?: any,
    error?: string,
    isValid?: boolean
};

type Form = {
    login: Field,
    password: Field
}

const LoginForm: FunctionComponent = () => {

    const history = useHistory();
    const handleUserContext = useUser();

    const [form, setForm] = useState<Form>({
        login: { value: '' },
        password: { value: '' },
    });



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue } };

        setForm({ ...form, ...newField });
    }

    const validateForm = () => {

        let newForm: Form = form;

        // Validator username
        if (form.login.value.length < 3) {
            const errorMsg: string = 'Votre login doit faire au moins 3 caractères de long.';
            const newField: Field = { value: form.login.value, error: errorMsg, isValid: false };
            form.login.error = errorMsg    
            newForm = { ...newForm, ...{ username: newField } };
        } else {
            const newField: Field = { value: form.login.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ login: newField } };
        }

        // Validator password
        if (form.password.value.length < 3) {
            const errorMsg: string = 'Votre mot de passe doit faire au moins 3 caractères de long.';
            const newField: Field = { value: form.password.value, error: errorMsg, isValid: false };
            form.password.error = errorMsg   
            newForm = { ...newForm, ...{ password: newField } };
        } else {
            const newField: Field = { value: form.password.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ password: newField } };
        }

        setForm(newForm);

        return newForm.login.isValid && newForm.password.isValid;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {

            var loginTest = form.login.value;
            var passwordTest = form.password.value;

            login(loginTest, passwordTest).then(isAuthenticated => {
                if (!isAuthenticated) {
                    toast.error("🔐 Identifiant ou mot de passe incorrect.");
                    return;
                }
                handleUserContext!.dispatch({type: "setUser", payload: { id: isAuthenticated.id, role: isAuthenticated.role_id}});
                history.push('/');
            });
        }
    }
    return (
        <>
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
            <div className="d-flex align-items-stretch auth auth-img-bg h-100">
                <div className="row flex-grow w-100 m-0">
                    <div className="col-lg-6 d-flex align-items-center justify-content-center">
                        <div className="auth-form-transparent text-left p-3">
                            <div className="brand-logo text-center">
                                <img src={logo} alt="logo" />
                            </div>
                            <h4 className="text-center">Welcome!</h4>
                            <h6 className="font-weight-light text-center">Happy to see you again!</h6>
                            <div className="d-flex justify-content-center">
                            <form onSubmit={(e) => handleSubmit(e)} className="pt-3 w-80 text-center" id="fromLogin">
                                <div className="card hoverable">
                                    <div className="card-stacked">
                                        <div className="card-content">
                                            <div className="form-group">
                                                <label htmlFor="login" className="text-dark">Identifiant</label>
                                                <div className="input-group">
                                                    <div className="d-flex w-100">
                                                        <i className="material-icons" id="iconFrom">person</i>
                                                        <input id="login" name="login" type="text" className="form-control form-control-lg border-left-0" placeholder="" value={form.login.value}
                                                            onChange={e => handleInputChange(e)} />
                                                    </div>
                                                    <div>
                                                        {form.login.error ?
                                                            <p className="text-danger">{form.login.error}</p>
                                                            :
                                                            ''
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="text-dark">Mot de passe</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend bg-transparent">
                                                    </div>
                                                    <div className="d-flex w-100">
                                                        <i className="material-icons" id="iconFrom">vpn_key</i>
                                                        <input type="password" name="password" className="form-control form-control-lg border-left-0" id="password" placeholder="" value={form.password.value} onChange={e => handleInputChange(e)} />
                                                    </div>
                                                    <div>
                                                        {form.password.error ?
                                                            <p className="text-danger">{form.password.error}</p>
                                                            :
                                                            ''
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-action">
                                            <button type="submit" className="btn btn-lg btnLogin">Valider</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 login-half-bg d-flex flex-row">
                    </div>
                </div>
            </div>
        </>
    )
};

export default LoginForm;

