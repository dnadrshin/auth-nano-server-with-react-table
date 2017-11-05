const
    _ = require('lodash'),
    passport = require('passport'),
    User = require('../../models/User'),
    jwt = require('jsonwebtoken'),
    router = require('express').Router(),

    jsonUser = user => ({
        user    : user._id,
        userName: user.username,
        role    : user.role,

        token: jwt.sign({
            user    : user._id.toString(),
            userName: user.username,
            role    : user.role,
            exp     : Math.floor(Date.now() / 1000) + (24 * 60 * 60)
        }, 'tracker_key')
    });

router.post('/login', (req, res, next) => passport.authenticate('local', (err, user, info) => {
    console.log(err, user, info)
    if (err) return res.status(401);
    if (!user) return res.status(401);

    res.json(jsonUser(user));
})(req, res, next));

router.post('/verify', (req, res) => {
    jwt.verify(req.body.token, 'tracker_key', (err, decoded) => err
        ? res.status(401)
        : res.json({id: decoded.user, name: decoded.userName}),
    );
});

router.post('/registration', (req, res) => {
    User.register(
        new User({
            username  : req.body.username,
            firstName : req.body.firstName,
            surName   : req.body.surName,
            email     : req.body.username,

            // hardcoded amin role
            role      : req.body.username === 'admin' ? 'admin' : 'user',
            created_at: new Date(),
        }),

        req.body.passwordFirst,

        (err, user) => {
            if (err) {
                console.log('error while user register!', err);
                return res.status(401);
            }

            return res.json(jsonUser(user));
        });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/restricted', (req, res) => {
    res.render('restricted', {});
});

module.exports = router;
