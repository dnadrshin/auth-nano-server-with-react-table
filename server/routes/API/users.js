const
    User = require('../../models/User'),
    adminOnly = require('./middleware/admin-only.js'),
    managerOrAdminOnly = require('./middleware/manager-or-admin.js'),
    router = require('express').Router();

router.get('/', adminOnly, (req, res) => {
    User.find({}).exec().then(users => res.json(users));
});


router.get('/details/:id', (req, res) => {
    User.find({_id: req.params.id}).exec().then(records => res.json(records));
});

router.post('/details', managerOrAdminOnly, (req, res) => {
    const
        record = new User(req.body);

    record.save((err, data) => {
        if (err) return res.json(err);
        console.log('record saved');
        return res.json(data);
    });

    User.register(
        new User({
            username  : req.body.username,
            firstName : req.body.firstName,
            surName   : req.body.surName,
            email     : req.body.username,
            role      : req.body.role,
            created_at: new Date(),
        }),

        req.body.password,

        (err, user) => {
            if (err) {
                console.log('error while user register!', err);
                return res.status(401);
            }

            return res.status(200);
        });
});

router.put('/details/:id', managerOrAdminOnly, (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, req.body, (err, doc) => {
        if (err) return res.json(err);
        return res.json(doc);
    });
});

router.delete('/:id', adminOnly, (req, res) => {
    User.remove({_id: req.params.id}, err => {
        if (err) return res.json(err);
        return res.json({status: 'ok'});
    });
});

module.exports = router;
