import _ from 'lodash';
import "isomorphic-fetch";
import reduxApi, {transformers} from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";

export default reduxApi({
    records: {
        crud: true,
        url: '/api/records',
        
        options: {
            headers: {
                "token": localStorage.getItem('token'),
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }
    },


    record: '/api/record/:id',
}).use("fetch", adapterFetch(fetch));
