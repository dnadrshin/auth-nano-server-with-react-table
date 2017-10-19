import React from 'react';
import {push} from 'react-router-redux';
import { connect } from 'react-redux';
import Loading from 'generic/Loading';
import Table from 'Table';
import { compose, lifecycle, withHandlers } from 'recompose';
import columns from './columns';
import rest from './rest';

const
    Users = props => <div>
            <Table
                data={props.users}
                columns={columns}
                module="users"

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
            isLoading: state.rest.users.loading,
            users    : state.rest.users.data ,
        }),

        dispatch => ({
            sync   : (data, cb) => dispatch(rest.actions.users.sync(data, cb)),
            pushURL: id => () => dispatch(push(`/users/edit/${id}`)),
            dispatch,
        }),
    ),

    withHandlers({
        removeWithSync: props => id => () => props.dispatch(
            rest.actions.deleteUser.delete({id}, null, (err, data) => {
                if(err) return console.log(err);
                return props.sync();
            })),
    }),

    lifecycle({
        componentDidMount() {
            this.props.sync(
                null,

                (err, data) => {
                    if(err) console.log(err);
                }
            );
        }
    })
)(Users);
