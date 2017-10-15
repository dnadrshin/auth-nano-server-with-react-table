import React from 'react';
import Table from '../Table';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import columns from './columns';
import rest from './rest';
import {push} from 'react-router-redux';

const
    Records = props => <div>
            <Table data={props.records} columns={columns} module="records"/>
            <button onClick={() => props.pushURL('/records/edit/new')}>New Record</button>
        </div>;

export default compose(
    connect(
        state => ({
            records: state.rest.records.data.data,
        }),

        {
            sync: rest.actions.records.sync,
            delete: rest.actions.records.delete,
            pushURL: push,
        }
    ),

    lifecycle({
        componentDidMount() {
            this.props.sync(
                null,

                (err, data) => {
                    console.log('records sync', err, data)
                }
            );
        }
    })
)(Records);
