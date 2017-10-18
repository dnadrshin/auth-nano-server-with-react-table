import _ from 'lodash';

export default (resp, model, options) => {
    const
        data = _.get(resp, 'data');

    if(!resp)
        return [];

    return _.map(resp, data => model(data));
};
