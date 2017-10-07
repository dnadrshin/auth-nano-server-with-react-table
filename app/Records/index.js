import React from 'react';
import Table from '../Table';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import columns from './columns';

const
    Users = props => <div>
            <Table data={props.records} columns={columns} module="records"/>
        </div>;

export default compose(
    connect(
        state => ({
            records: state.records,
        })
    ),
)(Users);
