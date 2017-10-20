import _ from 'lodash';
import 'isomorphic-fetch';
import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import {transformJSONRequest} from '../generic/helpers';

const
    options = {
        headers: {
            'token'       : localStorage.getItem('token'),
            'Accept'      : 'application/json',
            'Content-Type': 'application/json',
        },
    };

export default reduxApi({
    report: {
        crud       : true,
        url        : '/api/records/report/:id',
        transformer: resp => transformJSONRequest(resp, data => data, options),
        options,
    },
}).use('fetch', adapterFetch(fetch));
