import React from 'react';
import Table from '../Table';
import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import columns from './columns';
import rest from './rest';
import {push} from 'react-router-redux';

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

            <button onClick={props.pushURL('new')}>New Record</button>
        </div>;

export default compose(
    connect(
        state => ({
            records: state.rest.records.data.data,
        }),

        dispatch => ({
            sync   : (data, cb) => dispatch(rest.actions.records.sync(data, cb)),

            remove : id => () => dispatch(rest.actions.deleteRecord.delete({id}, null, (err, data) => {

            })),

            pushURL: id => () => dispatch(push(`/records/edit/${id}`)),
            dispatch
        })
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
                    console.log('records sync', err, data)
                }
            );
        }
    })
)(Records);
