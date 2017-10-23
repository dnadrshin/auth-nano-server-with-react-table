// @flow
import React from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {compose, withHandlers, lifecycle, withState} from 'recompose';
import {Link} from 'react-router';
import classNames from 'classnames';
import rest from 'generic/Login/rest';
import Header from './Header';
import styles from './assets/component.css';

const
    App = props => <x-section class={classNames(styles.app)}>
       <Header
            hasToken={props.hasToken}
            toggleHasToken={props.toggleHasToken}
        />

        <x-content>
            {(props.hasToken || props.location.pathname === '/registration') && props.children}
        </x-content>
    </x-section>;

export default compose(
    connect(
        null,

        dispatch => ({
            post   : (params, data, cb) => dispatch(rest('verify').actions.verify.post(params, data, cb)),
            pushURL: url => dispatch(push(url)),
        }),
    ),

    withState('hasToken', 'toggleHasToken', false),

    withHandlers({
        afterLogin: props => () => {
            props.toggleHasToken(true);
            props.pushURL('/records');
        },

        logout: props => () => {
            localStorage.removeItem('token');
            props.toggleHasToken(false);
        },
    }),

    withHandlers({
        checkToken: props => () => props.post(
            {},
            {body: JSON.stringify({token: localStorage.getItem('token')})},

            (err, data)=> {
                console.log(err, data);

                err
                    ? props.logout()
                    : props.toggleHasToken(true)
        })
    }),

    lifecycle({
        componentDidMount() {
            if(localStorage.getItem('token'))
                this.props.checkToken();
        }
    })
)(App);
