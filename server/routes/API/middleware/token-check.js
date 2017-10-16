
const
    jwt = require('jsonwebtoken'),

    tokenCheck = (req, res, next) => {
        jwt.verify(req.headers.token, 'tracker_key', function(err, decoded) {
            if(err) return res.json(err);
            res.locals.decoded = decoded;
            next()
        })
    }

module.exports = tokenCheck;
