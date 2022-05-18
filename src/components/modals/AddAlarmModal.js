import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap/';
import { Formik,  Field, ErrorMessage } from 'formik';

import api from '../../helpers/Api';
import ErrorAlert from '../helpers/ErrorAlert';
import handleError from '../../helpers/ErrorHandlingService';

class AddAlarmModal extends Component {

    state = {
        show: false,
        errMsg: ''
    }

    handleShow = () => this.setState({ errMsg: '', show: true });
    handleClose = () => this.setState({ show: false });

    render() {
        return (
            <>
            <Button variant="outline-dark" onClick={this.handleShow}>Create new alarm</Button>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add alarm</Modal.Title>
                </Modal.Header>
                { this.getCreationForm() }
            </Modal>
            </>
        );
    }

    getCreationForm() {
        return (
            <>
            <ErrorAlert msg={this.state.errMsg}/>
            <Formik
            initialErrors={{ name: '', value: ''}}
            initialValues={{ name: '', description: '', value: '' }}
            validate={this.validateFields()}
            onSubmit={this.handleSubmit()}
            >
            {({ handleSubmit, errors, isSubmitting, isValid }) => (
                <Form>
                    <Field name='name'>
                    {({ field }) => (
                        <Modal.Body>
                            <Form.Label className='labelStyle'>Name</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Alarm name"
                                value={field.value} onChange={field.onChange}/>
                            <ErrorMessage className='errorMsgStyle' name="name" component="div"/>
                        </Modal.Body>
                    )}
                    </Field>
                    <Field name='description'>
                    {({ field }) => (
                        <Modal.Body>
                            <Form.Label className='labelStyle'>Description</Form.Label>
                            <Form.Control name="description" type="text" placeholder="Alarm description"
                                value={field.description} onChange={field.onChange}/>
                            <ErrorMessage className='errorMsgStyle' name="description" component="div"/>
                        </Modal.Body>
                    )}
                    </Field>
                    <Field name='value'>
                    {({ field }) => (
                        <Modal.Body>
                            <Form.Label className='labelStyle'>Value</Form.Label>
                            <Form.Control name="value" type="text" placeholder="Alarm value"
                                value={field.value} onChange={field.onChange}/>
                            <ErrorMessage className='errorMsgStyle' name="value" component="div"/>
                        </Modal.Body>
                    )}
                    </Field>
                    <Modal.Footer>
                        <Button type='submit' onClick={handleSubmit} disabled={isSubmitting}>Create</Button>
                    </Modal.Footer>
                </Form>
            )}
            </Formik>
            </>
        );
    }

    validateFields() {
        return (values) => {
            const errors = {};
            if(!values.name) {
                errors.name = 'Name is required';
            }
            if(!values.value || /^-{0,1}\d*\.{0,1}\d+$/.test(values.value) === false) {
                errors.value = 'Number value is required';
            }
            return errors;
        };
    }

    handleSubmit() {
        return (values, actions) => {
            this.setState({ errMsg: '' })
            api({
                method: 'POST',
                url: 'alarms',
                data: { ...values, chartType: this.props.chartType.toUpperCase() }
            })
            .then(() => {
                this.handleClose();
                this.props.postAction();
            }).catch((error) => {
                this.setState({ errMsg: handleError(error, 'Creation failed: ') });
                actions.setSubmitting(false);
            })
        };
    }
}

export default AddAlarmModal;
