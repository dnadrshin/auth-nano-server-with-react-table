import React from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {compose, lifecycle, withHandlers} from 'recompose';
import Loading from 'generic/Loading';
import Table from 'Table';
import columns from './columns';
import rest from './rest';

const
    Records = props => <div>
        <Table
            data={props.records}
            columns={columns}
            module="records"

            entityActions={{
                edit  : props.pushURL,
                remove: props.removeWithSync,
            }}
        />

        {props.isLoading && <Loading />}

        <button onClick={props.pushURL('new')}>New Record</button>
    </div>;

export default compose(
    connect(
        state => ({
            isLoading: state.rest.records.loading,
            records  : state.rest.records.data,
        }),

        dispatch => ({
            sync   : (data, cb) => dispatch(rest.actions.records.sync(data, cb)),
            pushURL: id => () => dispatch(push(`/records/edit/${id}`)),
            dispatch,
        }),
    ),

    withHandlers({
        removeWithSync: props => id => () => props.dispatch(
            rest.actions.deleteRecord.delete({id}, null, (err, data) => {
                props.sync();
            })),
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
