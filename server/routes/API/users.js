const
    passport = require('passport'),
    User = require('../../models/User'),
    router = require('express').Router();

router.get('/', (req, res) => {
    res.json({test:1});
})

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    res.json({test: 1})
})

router.put('/:id', (req, res) => {
    console.log(req.params, req.body)
    res.json(req.body)
})

module.exports = router;
