import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap/';
import { Formik,  Field, ErrorMessage } from 'formik';
import { FaEdit } from 'react-icons/fa';

import api from '../../helpers/Api';
import ErrorAlert from '../helpers/ErrorAlert';
import handleError from '../../helpers/ErrorHandlingService';


class ManageAlarmModal extends Component {

    state = {
        show: false,
        errMsg: ''
    }

    handleShow = () => this.setState({ errMsg: '', show: true });
    handleClose = () => this.setState({ show: false });

    render() {
        return (
            <>
            <Button variant="outline-dark" onClick={this.handleShow}><FaEdit/> Manage</Button>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Manage</Modal.Title>
                </Modal.Header>
                { this.getManageForm() }
            </Modal>
            </>
        );
    }

    getManageForm() {
        return (
            <>
            <ErrorAlert msg={this.state.errMsg}/>
            <Formik
            initialErrors={{ name: '', value: ''}}
            initialValues={{ name: this.props.singleElement.name, description: this.props.singleElement.description, value: this.props.singleElement.value}}
            validate={this.validateFields()}
            onSubmit={this.handleSubmit()}
            >
            {({ handleSubmit, isSubmitting }) => (
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
                            value={field.value} onChange={field.onChange}/>
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
                        <Button variant='danger' onClick={this.handleDelete} disabled={isSubmitting}>Delete</Button>
                        <Button type='submit' onClick={handleSubmit} disabled={isSubmitting}>Modify</Button>
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
        return (values, { setSubmitting }) => {
            this.setState({ errMsg: '' })
            api({
                method: 'PUT',
                url: `/alarms/${ this.props.singleElement.id }`,
                data: { ...values, chartType: this.props.chartType.toUpperCase() }
            })
            .then(() => {
                this.handleClose();
                this.props.postAction();
            }).catch((error) => {
                this.setState({ errMsg: handleError(error, 'Modification failed: ') });
                setSubmitting(false);
            })
        };
    }

    handleDelete = () => {
      this.setState({ errMsg: '' })
      api({
          method: 'DELETE',
          url: `/alarms/${ this.props.singleElement.id }`,
      })
      .then(() => {
          this.handleClose();
          this.props.postAction();
      }).catch((error) => {
          this.setState({ errMsg: handleError(error, 'Deletion failed: ') });
      })
    }
}

export default ManageAlarmModal;
