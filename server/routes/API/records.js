const
    router = require('express').Router(),
    records = {test:1};

router.get('/', (req, res) => {
    res.json(records);
})

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    res.json({test: 1})
})

router.post('/', (req, res) => {
    console.log(req.params.id)
    res.json({test: 1})
})

router.put('/:id', (req, res) => {
    console.log(req.params.id)
    res.json({test: 1})
})

module.exports = router;
