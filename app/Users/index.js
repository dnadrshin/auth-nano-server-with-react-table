import React from 'react';
import {push} from 'react-router-redux';
import { connect } from 'react-redux';
import Loading from 'generic/Loading';
import Table from 'generic/Table';
import { compose, lifecycle, withHandlers } from 'recompose';
import columns from './columns';
import rest from './rest';

const
    Users = props => <div>
            <Table
                data={props.users}
                columns={columns}
                module="users"
                
                actionsColumns={[
                    {type: 'edit', title: 'Edit', name: 'mode edit', isServiceField: true, action: props.pushURL}, 
                    {type: 'remove', title: 'Delete', name: 'delete', isServiceField: true, action: props.removeWithSync},
                ]}
            />

            {props.isLoading && <Loading />}

            <button name="new" onClick={props.pushURL('new')}>New User</button>
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
