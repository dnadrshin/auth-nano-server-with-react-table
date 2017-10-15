const
    passport = require('passport'),
    User = require('../../models/User'),
    router = require('express').Router();


router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

router.post('/registration, (req, res, next) => {
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
