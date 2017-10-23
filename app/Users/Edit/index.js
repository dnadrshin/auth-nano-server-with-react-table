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
    initForm = {username: '', firstName: '', surName: '', role: '', password: ''},

    RecordForm = (props: {
        submit: Function,
        user: {}
    }) => <x-edit>
            <Form model="user" onSubmit={props.submit}>
            <Control.text model="user.username" id="user.email" placeholder="Email" />
            <Control.text model="user.firstName" id="user.firstName" placeholder="First Name" />
            <Control.text model="user.surName" id="user.surName" placeholder="Last Name" />
            {props.params.id === 'new' && <Control.text model="user.password" id="user.password" placeholder="Password" />}
            
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
        </Form>
    </x-edit>;

export default compose(
    connect(
        state => ({
            isLoading: state.rest.user.loading,
            user     : state.user,
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

                    (err, data) => _.map(['username', 'firstName', 'surName', 'role'], el => this.props.change(`user.${el}`, data[el]))
                );
        },
        
        componentWillUnmount() {
            this.props.reset('user')
        }
    }),

    withHandlers({
        submit: props => () => props[props.params.id === 'new' ? 'post' : 'put'](
            props.params.id === 'new' ? null : {id: props.params.id},
            {body: JSON.stringify(props.params.id === 'new' ? props.user : _.omit(props.user, 'password'))},

            (err, data)=> {
                console.log(err, data);
                props.pushURL('/users');
        })
    })
)(RecordForm);

export {initForm};
