import React, {FunctionComponent} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {UserProvider} from "./contexts/userContext";
import Header from "./components/header";
import Footer from '../src/components/Footer';

const App: FunctionComponent = () => {

  return (
        <UserProvider>
            <Header />
            <Footer />
        </UserProvider>
    );
}


export default App;
