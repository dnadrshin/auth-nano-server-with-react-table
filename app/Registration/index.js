// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Control, Form, Field } from 'react-redux-form';
import { compose, withHandlers } from 'recompose';
import rest from '../Rest'

const
    initForm = {username: '', firstName: '', surName: '', passwordFirst: '', passwordSecond: ''},

    RegistartionForm = (props: {
        submit: Function,
        record: {}
    }) => <Form model="registration" onSubmit={props.submit}>
        <Control.text model="registration.firstName" placeholder="First Name" id="registration.firstName" />
        <Control.text model="registration.surName" placeholder="Surame" id="registration.surName" />
        <Control.text model="registration.username" placeholder="Email" id="registration.username" />
        <Control.text type="password" model="registration.passwordFirst" placeholder="Password" id="registration.passwordFirst" />
        <Control.text type="password" model="registration.passwordSecond" placeholder="Repeat password" id="registration.passwordSecond" />
        <button>Submit!</button>
    </Form>;

export default compose(
    connect(
        state => ({
            registration: state.registration,
        }),

        dispatch => ({
            post: (params, data, cb) => dispatch(rest('user').actions.user.post(params, data, cb)),
        })
    ),

    withHandlers({
        submit: props => () => props.post(
            {},
            {body: JSON.stringify(props.registration)},

            (err, data)=> {
                console.log(err, data)
        })
    })
)(RegistartionForm);

export {initForm};
