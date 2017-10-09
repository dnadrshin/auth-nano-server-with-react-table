import React from 'react';
import Table from '../Table';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import columns from './columns';
import rest from './rest'

const
    Records = props => <div>
            <Table data={props.records} columns={columns} module="records"/>
        </div>;

export default compose(
    connect(
        state => ({
            records: state.records,
        }),

        {
            sync: rest.actions.records.sync,
        }
    ),

    lifecycle({
        componentDidMount() {
            console.log(this.props)
            this.props.sync();
        }
    })
)(Records);
