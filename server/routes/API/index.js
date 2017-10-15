const
    router = require('express').Router(),
    records = require('./records'),
    users = require('./users'),
    auth = require('./auth');

router.use('/records', records);
router.use('/users', users);
router.use('/auth', auth);

module.exports = router;