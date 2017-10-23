const
    _ = require('lodash'),
    convertToReport = require('../convert-to-report'),

    reports = [
        {'_id': '59e7cc800274fb13f403c161', 'date': '2017-10-18T21:49:41.971Z', 'distance': 12, 'time': '12', 'userId': '59e7c8fdab003f1079b035cf', '__v': 0},
        {'_id': '59e7cc8e0274fb13f403c163', 'date': '2017-10-18T21:49:41.971Z', 'distance': 11, 'time': '111', 'userId': '59e7c8fdab003f1079b035cf', '__v': 0},
        {'_id': '59e85f5b0274fb13f403c165', 'date': '2017-10-01T07:37:28.000Z', 'distance': 1, 'time': '1', 'userId': '59e7c8fdab003f1079b035cf', '__v': 0},
        {'_id': '59e85f630274fb13f403c166', 'date': '2017-10-10T07:37:28.000Z', 'distance': 1, 'time': '2', 'userId': '59e7c8fdab003f1079b035cf', '__v': 0},
    ],

    result = [
        {date: 'Mon Oct 16 2017 00:00:00 GMT+0200', distance: 23, speed: '0.01'},
        {date: 'Mon Sep 25 2017 00:00:00 GMT+0200', distance: 1, speed: '3.60'},
        {date: 'Mon Oct 09 2017 00:00:00 GMT+0200', distance: 1, speed: '1.80'},
    ];

describe('Server helpers', () => {
    it('converter Records to Report', () => {
        expect(_.isEqual(convertToReport(reports), result)).toBeTruthy();
    });
});
