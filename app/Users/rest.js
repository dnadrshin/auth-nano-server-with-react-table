import 'isomorphic-fetch';
import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import {transformGetRequest, transformJSONRequest} from 'generic/helpers';

const
    options = () => ({
        headers: {
            'token'       : localStorage.getItem('token'),
            'Accept'      : 'application/json',
            'Content-Type': 'application/json',
        },
    });

export default reduxApi({
    users: {
        crud       : true,
        url        : '/api/users',
        transformer: (resp, prevData, options) => transformJSONRequest(resp, data => data, options),
        options,
    },

    user: {
        crud       : true,
        url        : '/api/users/details/:id',
        transformer: (resp, prevData, options) => transformGetRequest(resp, data => data, options),
        options,
    },

    deleteUser: {
        crud   : true,
        url    : '/api/users/:id',
        virtual: true,
        options,
    },
}).use('fetch', adapterFetch(fetch));
