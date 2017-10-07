import React from 'react';
import Table from '../Table';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import columns from './columns';

const
    Users = props => <div>
            <Table data={props.users} columns={columns} module="users"/>
        </div>;

export default compose(
    connect(
        state => ({
            users: state.users,
        })
    ),
)(Users);
