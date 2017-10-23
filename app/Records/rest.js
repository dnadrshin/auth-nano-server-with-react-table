import _ from 'lodash';
import 'isomorphic-fetch';
import moment from 'moment';
import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import {transformJSONRequest} from '../generic/helpers';

const
    recordModel = data => _.extend(data, {transformed: {
        avrSpeed    : (3.6 * _.get(data, 'distance', 0) / _.get(data, 'time', 1)).toFixed(2),
        timeInFormat: moment().startOf('day').seconds(_.get(data, 'time', 1)).format('H:mm:ss'),
    }}),

    options = () => ({
        headers: {
            'token'       : localStorage.getItem('token'),
            'Accept'      : 'application/json',
            'Content-Type': 'application/json',
        },
    });

export default reduxApi({
    records: {
        crud       : true,
        url        : '/api/records',
        transformer: (resp, prevData, options) => transformJSONRequest(resp, data => recordModel(data), options),
        options,
    },

    record: {
        crud: true,
        url : '/api/records/details/:id',
        options,
    },

    deleteRecord: {
        crud   : true,
        url    : '/api/records/:id',
        virtual: true,
        options,
    },
}).use('fetch', adapterFetch(fetch));
