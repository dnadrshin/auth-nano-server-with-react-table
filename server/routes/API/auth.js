const
    passport = require('passport'),
    User = require('../../models/User'),
    jwt = require('jsonwebtoken'),
    router = require('express').Router();


router.post('/login', (req, res, next) => passport.authenticate('local', (err, user, info) => {
        console.log(err, user, info)

        res.json({
            user: user._id,
            userName: user.name,

            token: jwt.sign({
                user: user._id.toString(),
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
            }, 'tracker_key')});
    })(req, res, next));

router.post('/verify', (req, res, next) => {
    jwt.verify(req.body.token, 'tracker_key', function(err, decoded) {
        err
            ? res.status(401)
            : res.json({token: 'valid'})
    })
});

router.post('/registration', (req, res, next) => {
    User.register(
        new User({
            username: req.body.username,
            firstName: req.body.firstName,
            surName: req.body.surName,
            email: req.body.username,
            role: 'user',
            created_at: new Date()
        }),

        req.body.passwordFirst,

        err => {
            if (err) {
                console.log('error while user register!', err);
                return next(err);
            }

            console.log('user registered!');
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
