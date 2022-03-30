import React, { FunctionComponent, useEffect, useState } from 'react';
import ProfileDetail from '../components/user/ProfileDetail';
import './CheckProfile.css'
import Users from '../models/Users';
import { getAllUsers, getUserById } from '../services/usersServices';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useUser } from "../contexts/userContext";
import { GetRole } from "../models/role";

const CheckProfile: FunctionComponent = () => {
    let userId: number;
    let roleId: number|undefined;
    const history = useHistory();
    const userContext = useUser();
    const [users, setUsers] = useState<Users[]>([]);

    if (userContext && userContext!.state.id !== undefined && userContext!.state.role !== null ) {
        userId = userContext!.state.id;
        roleId = userContext!.state.role;
    }else if (localStorage.getItem('user_id') !== null) {
        userId = Number(localStorage.getItem('user_id'));
        roleId = Number(localStorage.getItem('user_role'));
    }else{
        history.push('/login');
    }


    useEffect(() => {
        if (roleId === GetRole.DIRECTOR) {
            getAllUsers().then(user => setUsers(user));
        } else {
            getUserById(userId).then(user => setUsers(user));
        }
    }, [roleId])

    const createUser = () => {
        history.push(`/CreateUser`);
    }
    return (
        <div className="hero-auto">
            <div id="heroProfileEnfant">


                <h3 className="text-center mt-5 p-5 titleStyle text-light">Profils utilisateurs</h3>

                {roleId === GetRole.DIRECTOR ?
                    <div className="d-flex justify-content-center">
                        <Button className="text-lowercase m-1" variant="success" onClick={() => createUser()}>
                            Créer un utilisateur
                        </Button>
                    </div>
                    :
                    <div>
                    </div>
                }
                
                <div className="col-12 d-flex flex-wrap justify-content-center">
                    {users ?
                        users.map((user) => (
                            <ProfileDetail key={user.id} user={user} />
                        )): <h3>No user</h3>
                    }
                </div>
            </div>
        </div>
    );
}

export default CheckProfile;
