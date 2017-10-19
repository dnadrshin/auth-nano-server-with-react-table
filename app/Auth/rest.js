import 'isomorphic-fetch';
import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

export default entity => reduxApi({
    user: {
        crud: true,
        url : `/API/${entity}`,

        options: {
            headers: {
                'Accept'      : 'application/json',
                'Content-Type': 'application/json',
            },
        },
    },
}).use('fetch', adapterFetch(fetch));
