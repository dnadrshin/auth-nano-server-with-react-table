// @flow
import React from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {compose, withHandlers, lifecycle, withState} from 'recompose';
import {Link} from 'react-router';
import Login from '../Login';
import rest from '../Login/rest';

const
    Header = props => <x-section>
        <Link to="/records">Records</Link>
        <Link to="/users">Users</Link>
        <Link to="/">Main</Link>

        {props.hasToken
            ? <button onClick={props.logout}>Logout</button>

            : <x-section>
                <Login afterLogin={props.afterLogin} />
                <Link to="/registration">Registration</Link>
            </x-section>}

        {(props.hasToken || props.location.pathname === '/registration') && props.children}
    </x-section>;

export default compose(
    connect(
        state => ({
            login: state.login,
        }),

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
)(Header);
