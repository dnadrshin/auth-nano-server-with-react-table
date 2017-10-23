// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Control, Form, Field } from 'react-redux-form';
import { compose, withHandlers, lifecycle } from 'recompose';
import SelectField from 'generic/SelectField';
import DateField from 'generic/DateField';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import rest from '../rest';
import { track, actions } from 'react-redux-form';
import {push} from 'react-router-redux';
import Loading from 'generic/Loading'

const
    initForm = {date: moment(), distance: '', time: ''},

    RecordForm = (props: {
        submit: Function,
        record: {}
    }) => <x-edit>
        <Form model="record" onSubmit={props.submit}>
            <DateField
                model="record.date"
            />

            <Control.text model="record.distance" id="record.distance" placeholder="Distance" />
            <Control.text model="record.time" id="record.time" placeholder="Time" />
            <button>Submit!</button>
            {props.isLoading && <Loading />}
        </Form>
    </x-edit>;

export default compose(
    connect(
        state => ({
            isLoading: state.rest.record.loading,
            record   : state.record,
            users    : state.users,
        }),

        (dispatch, props) => ({
            sync   : (params, data, cb) => dispatch(rest.actions.record.get(params, data, cb)),
            pushURL: url => dispatch(push(url)),
            post   : (params, data, cb) => dispatch(rest.actions.record.post(params, data, cb)),
            put    : (params, data, cb) => dispatch(rest.actions.record.put(params, data, cb)),
            change : (model, value) => dispatch(actions.change(model, value)),
            reset  : model => dispatch(actions.reset(model)),
        })
    ),

    lifecycle({
        componentDidMount() {
            if(this.props.params.id !== 'new')
                this.props.sync(
                    {id: this.props.params.id},
                    null,

                    (err, data) => _.map(['distance', 'time', 'surName', 'date'], el => this.props.change(`record.${el}`, data.data[0][el]))
                );
        },
        
        componentWillUnmount() {
            this.props.reset('record')
        }
    }),

    withHandlers({
        submit: props => () => props[props.params.id === 'new' ? 'post' : 'put'](
            props.params.id === 'new' ? null : {id: props.params.id},
            {body: JSON.stringify({...props.record, token: localStorage.getItem('token')})},

            (err, data)=> {
                console.log(err, data);
                props.pushURL('/records');
        })
    })
)(RecordForm);

export {initForm};
