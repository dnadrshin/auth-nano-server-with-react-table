const
    User = require('../../models/User'),
    router = require('express').Router();

router.get('/', (req, res) => {
    User.find({}).exec().then(users => res.json(users));
});


router.get('/details/:id', (req, res) => {
    User.find({_id: req.params.id}).exec().then(records => res.json(records));
});

router.post('/details', (req, res) => {
    const
        record = new User(req.body);

    record.save((err, data) => {
        if (err) return res.json(err);
        console.log('record saved');
        return res.json(data);
    });
});

router.put('/details/:id', (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, req.body, (err, doc) => {
        if (err) return res.json(err);
        return res.json(doc);
    });
});

router.delete('/:id', (req, res) => {
    User.remove({_id: req.params.id}, err => {
        if (err) return res.json(err);
        return res.json({status: 'ok'});
    });
});

module.exports = router;
