import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap/';
import { LinkContainer } from "react-router-bootstrap";

import './mainViewContainer.css'

import AuthenticationService from '../helpers/auth/AuthenticationService';
import MainViewContainer from './MainViewContainer';

class AuthorizedViewContainer extends Component {
    render() {
        return (
            <>
                <Navbar variant='dark' bg='dark' expand="lg">
                    <Navbar.Brand>
                    <Navbar>Crypto Dashboard</Navbar>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='mr-auto'>
                        <LinkContainer to='/zscore'><Nav.Link>MVRV Z-Score</Nav.Link></LinkContainer>
                        <LinkContainer to='/reserveRisk'><Nav.Link>Reserve Risk</Nav.Link></LinkContainer>
                    </Nav>
                    <Nav>
                        <NavDropdown title={"Hello " + AuthenticationService.getAuthenticatedUser()}  id="basic-nav-dropdown">
                        <LinkContainer to='/logout'><NavDropdown.Item>Log out</NavDropdown.Item></LinkContainer>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <MainViewContainer/>
            </>
        );
    }
}

export default AuthorizedViewContainer;
