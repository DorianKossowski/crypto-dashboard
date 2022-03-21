import React, { Component } from 'react';
import { Switch } from "react-router-dom";

import './mainViewContainer.css'
import ZScore from '../components/ZScore';
import ReserveRisk from '../components/ReserveRisk';
import LogoutComponent from '../components/auth/LogoutComponent';
import AuthenticatedRoute from '../helpers/auth/AuthenticatedRoute';

class MainViewContainer extends Component {
    render() {
        return (
            <div className='mainContent mainContainerStyle'>
                    <Switch>
                        <AuthenticatedRoute path='/zscore' component={ ZScore }/>
                        <AuthenticatedRoute path='/reserveRisk' component={ ReserveRisk }/>
                        <AuthenticatedRoute path='/logout' component={ LogoutComponent }/>
                    </Switch>
            </div>
        );
    }
}

export default MainViewContainer;
