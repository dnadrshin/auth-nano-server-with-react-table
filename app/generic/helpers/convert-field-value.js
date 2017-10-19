import moment from 'moment';

const
    convertor = {
        date: value => moment(value).format('MM/DD/YYYY'),
    }

export default (value, type) => type
    ? convertor[type](value)
    : value;
