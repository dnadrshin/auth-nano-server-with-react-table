import React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';
import { compose, withHandlers } from 'recompose';

const
    RecordForm = props => <Form
        model="record"
        onSubmit={props.submit}>
        <label>Email</label>
        <Control.text model="record.email" id="record.email" />
        <button>Submit!</button>
    </Form>

export default compose(
    connect(
        store => ({
            record: store.record
        }),
    ),

    withHandlers({
        submit: props => () => console.log(props.record)
    })
)(RecordForm);
