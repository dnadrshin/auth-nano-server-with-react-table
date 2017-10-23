const
    _ = require('lodash'),
    passport = require('passport'),
    User = require('../../models/User'),
    jwt = require('jsonwebtoken'),
    router = require('express').Router();


router.post('/login', (req, res, next) => passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(401);
    if (!user) return res.status(401);

    res.json({
        user    : user._id,
        userName: user.username,

        token: jwt.sign({
            user    : user._id.toString(),
            userName: user.username,
            exp     : Math.floor(Date.now() / 1000) + (24 * 60 * 60)
        }, 'tracker_key')});
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
            role      : 'user',
            created_at: new Date(),
        }),

        req.body.passwordFirst,

        (err, user) => {
            if (err) {
                console.log('error while user register!', err);
                return res.status(401);
            }

            return res.json({
                user    : user._id,
                userName: user.username,
        
                token: jwt.sign({
                    user    : user._id.toString(),
                    userName: user.username,
                    exp     : Math.floor(Date.now() / 1000) + (24 * 60 * 60)
                }, 'tracker_key')});
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
