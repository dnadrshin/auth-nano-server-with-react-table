const
    _ = require('lodash'),
    moment = require('moment'),
    calculateSpeed = val => (3.6 * _.get(val, 'distance', 0) / _.get(val, 'time', 1)).toFixed(2);

const
    groupRecords = records => _.groupBy(records, record => moment(record.date).startOf('isoWeek')),

    calculateDistanceAndSpeed = val => val.length > 1
        ? val.reduce((b, c) => ({
            distance: (b.distance + c.distance),
            speed   : (3.6 * (b.distance + c.distance) / (b.time + c.time)).toFixed(2),
        }))

        : {distance: val[0].distance, speed: calculateSpeed(val[0])},

    closedReportArray = records => _.mapValues(groupRecords(records), calculateDistanceAndSpeed);

module.exports = records => _(closedReportArray(records)).keys().map(k => ({date: k, ...closedReportArray(records)[k]})).value();
