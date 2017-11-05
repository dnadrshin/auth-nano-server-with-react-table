const
    jwt = require('jsonwebtoken'),

    managerOrAdmin = (req, res, next) => req.headers.token
        ? jwt.verify(req.headers.token, 'tracker_key', (err, decoded) => {
            if (err) return res.status(401);
            if (decoded.role !== 'admin') return res.status(401);
            next();
        })

        : res.status(401);

module.exports = managerOrAdmin;
