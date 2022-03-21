import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

import './authStyle.css';

import api from '../../helpers/Api';
import ErrorAlert from '../helpers/ErrorAlert';
import handleError from '../../helpers/ErrorHandlingService';

class SignUpCompnent extends Component {

    state = {
        redirect: false,
        errMsg: ''
    }

    handleSubmit() {
        return (values, actions) => {
            this.setState({ errMsg: '' })
            api({
                method: 'POST',
                url: 'signup',
                data: { ...values }
            })
            .then(() => {
                this.setState({ redirect: true });
            }).catch((error) => {
                this.setState({ errMsg: handleError(error, 'Sign up failed: ') });
                actions.setSubmitting(false);
            })
        };
    }

    validateFields() {
        return (values) => {
            const errors = {};
            if(!values.mail) {
                errors.mail = 'Mail is required';
            }
            if(!values.password1 || !values.password2) {
                errors.repPassword = 'Passwords are required';
            } else if(values.password1 !== values.password2) {
                errors.password2 = 'Passwords are different';
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
                {this.state.redirect ? <Redirect to='/login'/> : this.getSignupForm()}
                <div className='dontHaveAccountStyle'>Already have an account? <Link to='/login'>Log in</Link></div>
            </div>
        )
    }

    getSignupForm() {
        return (
            <>
            <ErrorAlert msg={this.state.errMsg}/>
            <div className='authFormContentStyle'>
                <h2>Sign up</h2>
                <Formik
                    initialErrors={{ mail: 'Required', password2: 'Required' }}
                    initialValues={{ mail: '', password2: '' }}
                    validate={this.validateFields()}
                    onSubmit={this.handleSubmit()}
                >
                    {({ isSubmitting }) => (<Form>
                        <div className='formGroupStyle'>
                            <h6>Mail</h6>
                            <Field className='form-control' name="mail" type="email" placeholder="mail"/>
                            <ErrorMessage className='errorMsgStyle' name="mail" component="div"/>
                        </div>
                        <div className='formGroupStyle'>
                            <h6>Password</h6>
                            <Field className='form-control' name='password1' type="password" placeholder="password"/>
                        </div>
                        <div className='formGroupStyle'>
                            <h6>Repeat password</h6>
                            <Field className='form-control' name='password2' type="password" placeholder="password"/>
                            <ErrorMessage className='errorMsgStyle' name="password2" component="div"/>
                        </div>
                        <Button type="submit" disabled={isSubmitting}>Submit</Button>
                    </Form>)}
                </Formik>
            </div>
            </>
        );
    }
}

export default SignUpCompnent;
