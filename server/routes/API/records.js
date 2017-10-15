const
    router = require('express').Router(),
    Record = require('../../models/Record'),
    jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    jwt.verify(req.headers.token, 'tracker_key', function(err, decoded) {
        if(err) return res.json(err)
        Record.find({userId: decoded.user}).exec().then( records => res.json(records));
    })
})

router.get('/details/:id', (req, res) => {
    jwt.verify(req.headers.token, 'tracker_key', function(err, decoded) {
        if(err) return res.json(err)
        Record.find({_id: req.params.id}).exec().then( records => res.json(records));
    })
})

router.post('/', (req, res) => {
    jwt.verify(req.body.token, 'tracker_key', function(err, decoded) {
        if(err) return res.json(err)
        let record = new Record(Object.assign(req.body, {userId: decoded.user}));
        console.log(decoded)

        record.save( err => {
            err
                ? console.log(err)
                : () => {console.log('record saved'); res.json({})}

        })
    })
})

router.put('/:id', (req, res) => {
    console.log(req.params.id)
    res.json({test: 1})
})

router.delete('/:id', (req, res) => {
    jwt.verify(req.headers.token, 'tracker_key', function(err, decoded) {
        if(err) return res.json(err)
        Record.remove({_id: req.params.id}, err => {
            if(err) return res.json(err)
            res.json({status: 'ok'})
        })
    })
})

module.exports = router;