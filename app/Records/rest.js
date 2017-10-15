import _ from 'lodash';
import "isomorphic-fetch";
import reduxApi, {transformers} from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";

const
    options = {
        headers: {
            "token": localStorage.getItem('token'),
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    };

export default reduxApi({
    records: {
        crud: true,
        url: '/api/records',
        options
    },

    record: {
        crud: true,
        url: '/api/records/details/:id',
        options
    },

    deleteRecord:{
        crud: true,
        url: '/api/records/:id',
        virtual: true,
        options
    },
}).use("fetch", adapterFetch(fetch));
