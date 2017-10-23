// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Control, Form, Field } from 'react-redux-form';
import { compose, withHandlers, lifecycle } from 'recompose';
import classNames from 'classnames';
import rest from './rest';
import styles from './assets/component.css';

const
    initForm = {email: '', password: ''},

    LoginForm = (props: {
        submit: Function,
    }) => <x-login class={classNames(styles.login, styles.className)}>
        <Form model="login" onSubmit={props.submit}>
            <Control.text model="login.username" id="login.username" />
            <Control.text type="password" model="login.password" id="login.password" />
            <button>Log In</button>
        </Form>
    </x-login>;

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
                localStorage.setItem('id', data.user);
                localStorage.setItem('name', data.userName);
                props.afterLogin();
        })
    }),

    lifecycle({
        componentDidMount() {
            
        }
    })
)(LoginForm);

export {initForm};
