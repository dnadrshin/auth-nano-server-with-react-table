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
            submit={props.submit}
            module="report"
        />
    </div>;

export default compose(
    connect(
        state => ({
            report   : _.get(state, 'rest.report.data', []),
            sorting  : _.get(state, 'table.report.sorting', {}),
        }),

        dispatch => ({
            sync   : (data, cb) => dispatch(rest.actions.report.sync(data, cb)),
        }),
    ),

    withHandlers({
        submit: props => () => props.sync(
            {
                id: localStorage.getItem('id'),
                order  : props.sorting.order,
                orderBy: props.sorting.column,
            },

            (err, data) => {
                if (err) console.log(err);
            },
        )
    }),

    lifecycle({
        componentDidMount() {
            this.props.sync(
                {id: localStorage.getItem('id')},

                (err, data) => {
                    console.log('reports sync', err, data)
                },
            );
        },
    }),
)(Reports);
