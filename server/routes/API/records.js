const
    router = require('express').Router(),
    Record = require('../../models/Record'),
    {convertToReport} = require('../../helpers/index.js'),
    managerOrAdminOnly = require('./middleware/manager-or-admin.js'),
    adminOnly = require('./middleware/admin-only.js'),

    isOpenToEdit = (res, record) => res.locals.decoded.user === record.userId
        || res.locals.decoded.role === 'admin'
        || res.locals.decoded.role === 'manager',

    sortByDate = (arr, order) => arr.sort((a, b) => order === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );

router.get('/', (req, res) => {
    Record
        .find({userId: res.locals.decoded.user})
        .sort(req.query.order ? {[req.query.orderBy]: req.query.order} : null)
        .exec().then(records => res.json(records));
});

router.get('/all', adminOnly, (req, res) => {
    Record
        .find({})
        .sort(req.query.order ? {[req.query.orderBy]: req.query.order} : null)
        .exec().then(records => res.json(records));
});

router.get('/details/:id', (req, res) => {
    Record
        .find({_id: req.params.id})
        .exec()
        .then(record => isOpenToEdit
            ? res.json(record)
            : res.status(401)
        );
});

router.post('/details', (req, res) => {
    const
        record = new Record(Object.assign(req.body, {userId: res.locals.decoded.user}));

    record.save((err, data) => {
        if (err) return res.json(err);
        console.log('record saved');
        return res.json(data);
    });
});

router.put('/details/:id', (req, res) => {
    Record.findOneAndUpdate({_id: req.params.id}, req.body, (err, doc) => {
        if (err) return res.json(err);
        return res.json(doc);
    });
});

router.delete('/:id', (req, res) => {
    Record.remove({_id: req.params.id}, err => {
        if (err) return res.json(err);
        return res.json({status: 'ok'});
    });
});

router.get('/report/all/', managerOrAdminOnly, (req, res) => {
    Record
        .find({})
        .exec().then(records => res.json(
            req.query.order
                ? sortByDate(convertToReport(records), req.query.order)
                : convertToReport(records)
        ));
});

router.get('/report/:id', (req, res) => {
    Record
        .find({userId: req.params.id})
        .exec()
        .then(records => isOpenToEdit
            ? res.json(req.query.order
                ? sortByDate(convertToReport(records), req.query.order)
                : convertToReport(records))

            : res.status(401)
        );
    // .where('date').gt(new Date(2017, 1, 1)).lt(new Date(2017, 9, 11)) todo: use for pagination
});

module.exports = router;
