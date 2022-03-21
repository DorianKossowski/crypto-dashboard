import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

import './authStyle.css';

import AuthenticationService from '../../helpers/auth/AuthenticationService';
import ErrorAlert from '../helpers/ErrorAlert';
import handleError from '../../helpers/ErrorHandlingService';

class LoginComponent extends Component {

    state = {
        redirect: false,
        errMsg: ''
    }

    handleSubmit() {
        return (values, actions) => {
            this.setState({ errMsg: '' })
            AuthenticationService.executeAuthentication(values.username, values.password)
            .then((data) => {
                console.log(data);
                AuthenticationService.registerSuccessfulLogin(values.username, data.access_token);
                this.setState({ redirect: true });
            }).catch((error) => {
                this.setState({ errMsg: handleError(error, 'Login failed: ') });
                actions.setSubmitting(false);
            })
        };
    }

    validateFields() {
        return (values) => {
            const errors = {};
            if(!values.username) {
                errors.username = 'Mail is required';
            }
            if(!values.password) {
                errors.password = 'Password is required';
            }
            return errors;
        };
    }

    render() {
        return (
            <div className='authFormStyle'>
                <div className='authFormLogoStyle'>
                    <h1>Crypto Dashboard</h1>
                </div>
                {this.state.redirect ? <Redirect to='/zscore'/> : this.getLoginForm()}
                <div className='dontHaveAccountStyle'>Don't have an account? <Link to='/signup'>Sign up</Link></div>
            </div>
        )
    }

    getLoginForm() {
        return (
            <>
            <ErrorAlert msg={this.state.errMsg}/>
            <div className='authFormContentStyle'>
                <h2>Login</h2>
                <Formik
                    initialErrors={{ username: 'Required', password: 'Required' }}
                    initialValues={{ username: '', password: '' }}
                    validate={this.validateFields()}
                    onSubmit={this.handleSubmit()}
                >
                    {({ isSubmitting }) => (<Form>
                        <div className='formGroupStyle'>
                            <h6>Mail</h6>
                            <Field className='form-control' name="username" type="text" placeholder="mail"/>
                            <ErrorMessage className='errorMsgStyle' name="username" component="div"/>
                        </div>
                        <div className='formGroupStyle'>
                            <h6>Password</h6>
                            <Field className='form-control' name='password' type="password" placeholder="password"/>
                            <ErrorMessage className='errorMsgStyle' name="password" component="div"/>
                        </div>
                        <Button type="submit" disabled={isSubmitting}>Submit</Button>
                    </Form>)}
                </Formik>
            </div>
            </>
        );
    }
}

export default LoginComponent;
