const
    passport = require('passport'),
    User = require('../../models/User'),
    router = require('express').Router(),

    records = {test:1};

router.get('/records', (req, res) => {
    res.json(records);
})

router.get('/record/:id', (req, res) => {
    console.log(req.params.id)
    res.json({test: 1})
})

router.post('/record/', (req, res) => {
    console.log(req.params.id)
    res.json({test: 1})
})

router.put('/record/:id', (req, res) => {
    console.log(req.params.id)
    res.json({test: 1})
})

router.get('/users', (req, res) => {
    res.json(records);
})

router.get('/user/:id', (req, res) => {
    console.log(req.params.id)
    res.json({test: 1})
})

router.post('/user', (req, res, next) => {
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

router.put('/user/', (req, res) => {
    console.log(req.params, req.body)
    res.json(req.body)
})

router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

// router.get('/', (req, res) => {
// res.render('index', { user: req.user });
// });

// router.get('/admin', (req, res) => {
// res.render('index', { user: req.user });
// });

// router.get('/restricted', (req, res) => {
// res.render('restricted', {});
// });

// router.get('/register', (req, res) => {
// res.render('register', {});
// });

// router.post('/register', (req, res, next) => {
// Account.register(
//   new Account({ username: req.body.username, created_at: new Date() }),
//   req.body.password,

//   err => {
//     if (err) {
//       console.log('error while user register!', err);
//       return next(err);
//     }
//     console.log('user registered!');
//     res.redirect('/');
//   });
// });

// router.get('/login', (req, res) => {
// res.render('login', { user: req.user });
// });

// router.post('/login', passport.authenticate('local'), (req, res) => {
// res.redirect('/');
// });

// router.get('/logout', (req, res) => {
// req.logout();
// res.redirect('/');
// });

module.exports = router;