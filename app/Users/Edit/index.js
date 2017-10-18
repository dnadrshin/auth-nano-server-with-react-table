// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Control, Form, Field } from 'react-redux-form';
import { compose, withHandlers, lifecycle } from 'recompose';
import SelectField from 'generic/SelectField';
import DateField from 'generic/DateField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import rest from '../rest';
import { track, actions } from 'react-redux-form';
import {push} from 'react-router-redux';
import Loading from 'generic/Loading'

const
    initForm = {username: '', firstName: '', date: moment(), lastName: '', password: '', role: ''},

    RecordForm = (props: {
        submit: Function,
        user: {}
    }) => <Form model="user" onSubmit={props.submit}>
        <Control.text model="user.username" id="user.email" placeholder="Email" />
        <Control.text model="user.firstName" id="user.firstName" placeholder="First Name" />
        <Control.text model="user.lastName" id="user.lastName" placeholder="Last Name" />
        <Control.text model="user.password" id="user.password" placeholder="Password" />
        
        <SelectField
            list={[
                {value: 'user', option: 'User'},
                {value: 'admin', option: 'Admin'},
            ]}
            model="user.role"
            option="option"
            value="value"
        />
        <button>Submit!</button>
        {props.isLoading && <Loading />}
    </Form>;

export default compose(
    connect(
        state => ({
            isLoading: state.rest.user.loading,
            user     : state.rest.user.data,
            users    : state.users,
        }),

        (dispatch, props) => ({
            sync   : (params, data, cb) => dispatch(rest.actions.user.get(params, data, cb)),
            pushURL: url => dispatch(push(url)),
            post   : (params, data, cb) => dispatch(rest.actions.user.post(params, data, cb)),
            put    : (params, data, cb) => dispatch(rest.actions.user.put(params, data, cb)),
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

                    (err, data) => {
                        this.props.change('user.username', data.username);
                        this.props.change('user.firstName', data.firstName);
                        this.props.change('user.lastName', data.lastName);
                        this.props.change('user.role', data.role);
                    }
                );
        },
        
        componentWillUnmount() {
            this.props.reset('user')
        }
    }),

    withHandlers({
        submit: props => () => props[props.params.id === 'new' ? 'post' : 'put'](
            props.params.id === 'new' ? null : {id: props.params.id},
            {body: JSON.stringify({...props.user, token: localStorage.getItem('token')})},

            (err, data)=> {
                console.log(err, data);
                props.pushURL('/users');
        })
    })
)(RecordForm);

export {initForm};
