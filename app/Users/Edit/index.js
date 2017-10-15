// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Control, Form, Field } from 'react-redux-form';
import { compose, withHandlers } from 'recompose';
import SelectField from '../../generic/SelectField';
import DateField from '../../generic/DateField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import rest from '../rest'

const
    initForm = {email: '', date: moment(), distance: '', time: ''},

    UsersForm = (props: {
        submit: Function,
        record: {}
    }) => <Form model="record" onSubmit={props.submit}>
        <SelectField 
            model="record.email"
            listModel="users"
            option="email"
            value="id"
        />

        <DateField
            model="record.date"
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

        {
            post: rest.actions.users.post,
        }
    ),

    withHandlers({
        submit: props => () => props.post()
    })
)(UsersForm);

export {initForm};
