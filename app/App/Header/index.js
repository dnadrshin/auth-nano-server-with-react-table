// @flow
import React from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {compose, withHandlers, lifecycle, withState} from 'recompose';
import {Link} from 'react-router';
import classNames from 'classnames';
import Login from 'generic/Login';
import rest from 'generic/Login/rest';
import Navigation from '../Navigation';
import styles from './assets/component.css';

const
    Header = props => <x-header class={classNames(styles.headerMenu, styles.className)}>
        <Navigation />

        {props.hasToken
            ? <button onClick={props.logout}>Logout</button>

            : <x-section>
                <Login afterLogin={props.afterLogin} />
                <Link to="/registration">Registration</Link>
            </x-section>}
    </x-header>;

export default compose(
    connect(
        null,

        dispatch => ({
            pushURL: url => dispatch(push(url)),
        }),
    ),

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
)(Header);
