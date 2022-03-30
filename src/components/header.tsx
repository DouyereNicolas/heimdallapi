import React, {FunctionComponent} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {useUser} from "../contexts/userContext";
import Home from "../pages/Home";
import Login from "../pages/Login";
import EstimateAdd from "../pages/estimate-add";
import TaskList from "./planning/TasksList";
import CheckProfile from "../pages/CheckProfile";
import MaterialDetail from "./material/MaterialDetail";
import SitesList from "./site/Sites-list";
import SiteDetail from "./site/Site-detail";
import SitesAdd from "../pages/sites-add";
import {Container, Nav, Navbar} from "react-bootstrap";
import CheckProblems from "../pages/CheckProblems";
import UpdateProblem from "./problem/UpdateProblem";
import DetailProblem from './problem/DetailProblem';
import CreateMaterial from "./material/CreateMaterial";
import CreateProblem from "./problem/CreateProblem";
import logo from "../assets/img/HeimdallContructionSansFond.png"
import SiteEdit from "./site/site-edit";
import CreateUser from './user/CreateUser';
import UpdateUser from './user/UpdateUser';
import updateMaterial from './material/UpdateMaterial';
import AddTask from './planning/AddTask';
import ContainerModifyTask from './planning/containerModifyTask';
import {GetRole} from "../models/role";
import {TokenValidity} from "../services/auth-service";
import Dashboard from '../pages/dashboard';
import ContainerPlanningChantier from '../pages/ContainerPlanningChantier';


const Header: FunctionComponent = () => {
    const userContext = useUser();
    const onClickLogOut = () => {
        localStorage.clear();
        if (userContext) {
            userContext!.dispatch({type: "setUser", payload: {id: undefined, role: undefined}});
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

    return (
        <Router>
            <div className="">
                <Navbar expand="lg" id="navv">
                    <Container fluid>
                        <Navbar.Brand> <Link to="/"><img src={logo} alt="logo" id="logoNav"/> </Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll"/>
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="me-auto my-2 my-lg-0" id="navbarScroll" navbarScroll>
                                <Nav.Link> <Link to="/">Accueil</Link></Nav.Link>
                                {TokenValidity() ? <Nav.Link> <Link to="/profile" className="">Profil</Link></Nav.Link> : ''}
                                {!TokenValidity() ? <Nav.Link> <Link to="/login" className="">Connexion</Link></Nav.Link> : ''}
                                <Nav.Link> <Link to="/devis">Devis</Link></Nav.Link>
                                {TokenValidity() && checkRole(Number(localStorage.getItem('user_role'))) ? <Nav.Link> <Link to="/Dashboard">Dashbaord</Link></Nav.Link> : ''}
                                {TokenValidity() && checkRole(Number(localStorage.getItem('user_role'))) ? <Nav.Link> <Link to="/material" className="">Matériel</Link></Nav.Link> : ''}
                                {TokenValidity() && checkRole(Number(localStorage.getItem('user_role'))) ? <Nav.Link><Link to="/sites" className="">Chantiers</Link></Nav.Link> : ''}
                                {TokenValidity() ? <Nav.Link><Link to="/planningChantier" className="">Planning</Link></Nav.Link> : ''}
                                {TokenValidity() && checkRole(Number(localStorage.getItem('user_role'))) ? <Nav.Link><Link to="/problems" className="">Ticket</Link></Nav.Link> : ''}
                                {TokenValidity() ? <Nav.Link><Link to="/planning" className="">Agenda</Link></Nav.Link> : ''}

                            </Nav>
                            {TokenValidity() ?
                                <Nav className="d-flex justify-content-end">
                                    <Nav.Link><Link to="/" onClick={() => onClickLogOut()}>Déconnexion</Link></Nav.Link>
                                </Nav>
                                :
                                ''
                            }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                {
                    TokenValidity() ?
                        checkRole(Number(localStorage.getItem('user_role'))) ?
                            <Switch>
                                <Route exact path="/planning" component={TaskList}/>
                                <Route exact path="/planning/add" component={AddTask}/>
                                <Route exact path="/planning/modify/:id" component={ContainerModifyTask}/>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/profile" component={CheckProfile}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/devis" component={EstimateAdd}/>
                                <Route exact path="/material" component={MaterialDetail}/>
                                <Route exact path="/sites" component={SitesList}/>
                                <Route exact path="/problems" component={CheckProblems}/>
                                <Route exact path='/sites/search/:id' component={SiteDetail}/>
                                <Route exact path='/CreateMaterial' component={CreateMaterial}/>
                                <Route exact path='/problems/create/' component={CreateProblem}/>
                                <Route exact path='/problems/update/:id' component={UpdateProblem}/>
                                <Route exact path='/problems/detail/:id' component={DetailProblem}/>
                                <Route exact path='/sites/add' component={SitesAdd}/>
                                <Route exact path='/sites/edit/:id' component={SiteEdit}/>
                                <Route exact path='/CreateUser' component={CreateUser}/>
                                <Route exact path='/users/update/:id' component={UpdateUser}/>
                                <Route exact path='/material/update/:id' component={updateMaterial}/>
                                <Route exact path='/Dashboard' component={Dashboard}/>
                                <Route exact path='/planningChantier' component={ContainerPlanningChantier} />
                            </Switch>
                            :
                            <Switch>
                                <Route exact path="/planning" component={TaskList}/>
                                <Route exact path="/planning/add" component={AddTask}/>
                                <Route exact path="/planning/modify/:id" component={ContainerModifyTask}/>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/profile" component={CheckProfile}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/devis" component={EstimateAdd}/>
                                <Route exact path="/sites" component={SitesList}/>
                                <Route exact path='/sites/search/:id' component={SiteDetail}/>
                                <Route exact path='/sites/add' component={SitesAdd}/>
                                <Route exact path='/sites/edit/:id' component={SiteEdit} />
                                <Route exact path='/CreateUser' component={CreateUser}/>
                                <Route exact path='/users/update/:id' component={UpdateUser}/>
                                <Route exact path='/planningChantier' component={ContainerPlanningChantier} />

                            </Switch>
                        :
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/devis" component={EstimateAdd}/>
                        </Switch>
                }
            </div>
        </Router>
    );

}
export default Header;
