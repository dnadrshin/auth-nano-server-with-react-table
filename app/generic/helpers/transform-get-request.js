import _ from 'lodash';

export default (resp, model, options) => {
    const
        data = _.get(resp, 'data');

    if(!data || _.get(options, 'request.params.method') ==='DELETE')
        return {};

    if(!data || _.get(options, 'request.params.method') ==='POST')
        return data;

    return model(data);
};
