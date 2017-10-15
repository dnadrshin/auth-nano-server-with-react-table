// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Control, Form, Field } from 'react-redux-form';
import { compose, withHandlers, lifecycle } from 'recompose';
import SelectField from '../../generic/SelectField';
import DateField from '../../generic/DateField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import rest from '../rest';
import { track, actions } from 'react-redux-form';

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

        (dispatch, props) => ({
            sync  : (params, data, cb) => dispatch(rest.actions.record.get(params, data, cb)),
            post  : (params, data, cb) => dispatch(rest.actions.records.post(params, data, cb)),
            change: (model, value) => dispatch(actions.change(model, value)),
        })
    ),

    lifecycle({
        componentDidMount() {
            if(this.props.params.id !== 'new')
                this.props.sync(
                    {id: this.props.params.id},
                    null,

                    (err, data) => {
                        console.log('record sync', err, data)
                        this.props.change('record.distance', data.data[0].distance);
                        this.props.change('record.time', data.data[0].time);
                        this.props.change('record.date', data.data[0].date);
                    }
                );
        }
    }),

    withHandlers({
        submit: props => () => props.sync(
            {},
            {body: JSON.stringify({...props.record, token: localStorage.getItem('token')})},

            (err, data)=> {
                console.log(err, data);
        })
    })
)(RecordForm);

export {initForm};
