const
    router = require('express').Router(),
    Record = require('../../models/Record'),
    jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    Record.find({userId: res.locals.decoded.user}).exec().then(records => res.json(records));
})

router.get('/details/:id', (req, res) => {
    Record.find({_id: req.params.id}).exec().then( records => res.json(records));
})

router.post('/', (req, res) => {
        let record = new Record(Object.assign(req.body, {userId: res.locals.decoded.user}));

        record.save( err => {
            err
                ? console.log(err)
                : () => {console.log('record saved'); res.json({})}
        })
})

router.put('/details/:id', (req, res) => {
    Record.findOneAndUpdate({_id: req.params.id}, req.body, (err, doc) => {
        if(err) return res.json(err)
        res.json(doc)
    })
})

router.delete('/:id', (req, res) => {
    Record.remove({_id: req.params.id}, err => {
        if(err) return res.json(err)
        res.json({status: 'ok'})
    })
})

module.exports = router;
