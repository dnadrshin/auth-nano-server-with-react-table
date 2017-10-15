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

    RecordForm = (props: {
        submit: Function,
        record: {}
    }) => <Form model="record" onSubmit={props.submit}>

        <DateField
            model="record.date"
        />

        <Control.text model="record.distance" id="record.distance" placeholder="Distance" />
        <Control.text model="record.time" id="record.time" placeholder="Time" />
        <button>Submit!</button>
    </Form>;

export default compose(
    connect(
        state => ({
            record: state.record,
            users : state.users,
        }),

        dispatch => ({
            post: (params, data, cb) => dispatch(rest.actions.records.post(params, data, cb))
        })
    ),

    withHandlers({
        submit: props => () => props.post(
            {},
            {body: JSON.stringify({...props.record, token: localStorage.getItem('token')})},

            (err, data)=> {
                console.log(err, data);
        })
    })
)(RecordForm);

export {initForm};
