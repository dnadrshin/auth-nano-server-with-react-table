// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Control, Form, Field } from 'react-redux-form';
import { compose, withHandlers, lifecycle } from 'recompose';
import rest from './rest'

const
    initForm = {email: '', password: ''},

    LoginForm = (props: {
        submit: Function,
    }) => <Form model="login" onSubmit={props.submit}>
        <Control.text model="login.username" id="login.username" />
        <Control.text type="password" model="login.password" id="login.password" />
        <button>Log In</button>
    </Form>;

export default compose(
    connect(
        state => ({
            login : state.login,
        }),

        dispatch => ({
            post: (params, data, cb) => dispatch(rest('login').actions.login.post(params, data, cb))
        })
    ),

    withHandlers({
        submit: props => () => props.post(
            {},
            {body: JSON.stringify(props.login)},

            (err, data)=> {
                localStorage.setItem('token', data.token);
                props.afterLogin();
                console.log(err, data);
        })
    }),

    lifecycle({
        componentDidMount() {
            
        }
    })
)(LoginForm);

export {initForm};
