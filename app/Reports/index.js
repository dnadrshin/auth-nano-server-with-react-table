import React from 'react';
import Table from 'generic/Table';
import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import columns from './columns';
import rest from './rest';
import {push} from 'react-router-redux';

const
    Reports = props => <div>
        <Table
            data={props.report}
            columns={columns}
            module="report"

            entityActions={{
                edit  : () => {},
                remove: () => {},
            }}
        />

        <button onClick={props.pushURL('new')}>New Record</button>
    </div>;

export default compose(
    connect(
        state => ({
            report: _.get(state, 'rest.report.data', []),
        }),

        dispatch => ({
            sync   : (data, cb) => dispatch(rest.actions.report.sync(data, cb)),
            pushURL: id => () => dispatch(push(`/reports/edit/${id}`)),
            dispatch,
        }),
    ),

    lifecycle({
        componentDidMount() {
            this.props.sync(
                {id: 1},

                (err, data) => {
                    console.log('reports sync', err, data)
                },
            );
        },
    }),
)(Reports);
