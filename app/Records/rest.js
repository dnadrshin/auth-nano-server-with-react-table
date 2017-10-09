import "isomorphic-fetch";
import reduxApi, {transformers} from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";

export default reduxApi({
    records: {
        url: `/api/records`,
        transformer: transformers.array,
        
        options: {
            headers: {
                "Accept": "application/json"
            }
        }
    },

    record: '/api/record/:id',
}).use("fetch", adapterFetch(fetch));
