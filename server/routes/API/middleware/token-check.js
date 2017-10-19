
const
    jwt = require('jsonwebtoken'),

    tokenCheck = (req, res, next) => {
        jwt.verify(req.headers.token, 'tracker_key', (err, decoded) => {
            if(err) return res.status(401);
            res.locals.decoded = decoded;
            next();
        });
    };

module.exports = tokenCheck;
