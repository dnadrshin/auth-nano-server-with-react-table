import _ from 'lodash';
import "isomorphic-fetch";
import reduxApi, {transformers} from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";
import {transformJSONRequest} from '../generic/helpers';
import moment from 'moment';

const
    recordModel = data => _.extend(data, {transformed: {
        avrSpeed    : (3.6 * _.get(data, 'distance', 0) / _.get(data, 'time', 1)).toFixed(2),
        timeInFormat: moment().startOf('day').seconds(_.get(data, 'time', 1)).format('H:mm:ss'),
    }}),

    options = {
        headers: {
            "token": localStorage.getItem('token'),
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    };

export default reduxApi({
    users: {
        crud       : true,
        url        : '/api/users',
        transformer: (resp, prevData, options) => transformJSONRequest(resp, data => data, options),
        options
    },

    user: {
        crud: true,
        url : '/api/users/details/:id',
        options
    },

    deleteUser:{
        crud   : true,
        url    : '/api/users/:id',
        virtual: true,
        options
    },
}).use("fetch", adapterFetch(fetch));
