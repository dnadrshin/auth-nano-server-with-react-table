import "isomorphic-fetch";
import reduxApi, {transformers} from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";

export default entity => reduxApi({
    [entity]: {
        crud: true,
        url: `/API/${entity}`,

        options: {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        },
    },
}).use("fetch", adapterFetch(fetch));
