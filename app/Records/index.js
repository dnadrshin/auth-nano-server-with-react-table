import React from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {compose, lifecycle, withHandlers} from 'recompose';
import Loading from 'generic/Loading';
import Table from 'generic/Table';
import columns from './columns';
import rest from './rest';

const
    Records = props => <div>
        <Table
            data={props.records}
            columns={columns}
            module="records"
            submit={props.submit}

            actionsColumns={[
                {type: 'edit', title: 'Edit', name: 'mode edit', isServiceField: true, action: props.pushURL}, 
                {type: 'remove', title: 'Delete', name: 'delete', isServiceField: true, action: props.removeWithSync},
            ]}
        />

        <button name="new" onClick={props.pushURL('new')}>New Record</button>
        {props.isLoading && <Loading />}
    </div>;

export default compose(
    connect(
        state => ({
            isLoading: state.rest.records.loading,
            records  : state.rest.records.data,
            sorting  : _.get(state, 'table.records.sorting', {}),
        }),

        dispatch => ({
            sync   : (data, cb) => dispatch(rest.actions.records.sync(data, cb)),
            pushURL: id => () => dispatch(push(`/records/edit/${id}`)),
            removeRecord: (id, cb) => dispatch(rest.actions.deleteRecord.delete({id}, cb)),
            dispatch,
        }),
    ),

    withHandlers({
        removeWithSync: props => id => () => {
            props.removeRecord(id, () => {
                props.sync(
                    null,
    
                    (err, data) => {
                        if (err) console.log(err);
                    },
                );
            });
        },

        submit: props => () => props.sync(
            {
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
                null,

                (err, data) => {
                    if (err) console.log(err);
                },
            );
        },
    }),
)(Records);
