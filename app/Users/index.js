import React from 'react';
import Table from '../Table';
import { compose } from 'recompose';
import { connect } from 'react-redux';

const
    Users = props => <div>
            <Table users={props.users}/>
        </div>;

export default compose(
    connect(
        state => ({
            users: state.users,
        })
    ),
)(Users);
