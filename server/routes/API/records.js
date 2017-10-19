const
    router = require('express').Router(),
    Record = require('../../models/Record');

router.get('/', (req, res) => {
    Record.find({userId: res.locals.decoded.user}).exec().then(records => res.json(records));
});

router.get('/details/:id', (req, res) => {
    Record.find({_id: req.params.id}).exec().then(records => res.json(records));
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

module.exports = router;
