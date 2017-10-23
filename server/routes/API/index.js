const
    router = require('express').Router(),
    tokenCheck = require('./middleware/token-check'),
    records = require('./records'),
    users = require('./users'),
    auth = require('./auth');

router.use('/records', tokenCheck, records);

router.use('/users', users);
router.use('/auth', auth);

module.exports = router;
