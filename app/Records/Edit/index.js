import React from 'react';
import { connect } from 'react-redux';
import { Control, Form, Field } from 'react-redux-form';
import { compose, withHandlers } from 'recompose';
import SelectField from '../../generic/SelectField';

const
    initForm = {email: '', date: '', distance: '', time: ''},

    RecordForm = props => <Form model="record" onSubmit={props.submit}>
        <SelectField 
            model="record.email"
            listModel="users"
            option="email"
            value="id"
        />

        <Control.text model="record.distance" id="record.distance" />
        <Control.text model="record.time" id="record.time" />
        <button>Submit!</button>
    </Form>;

export default compose(
    connect(
        state => ({
            record: state.record,
            users : state.users,
        }),
    ),

    withHandlers({
        submit: props => () => console.log(props.record)
    })
)(RecordForm);

export {initForm};
