const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const authConfig = require('../configs/auth');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(httpStatus.UNAUTHORIZED).json({ error: 'No token provided!' });
    
    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Token error!' });

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme)) 
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Token malformatted!' });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err)
            return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Token invalid!' });

        req.userId    = decoded.id;
        req.companyId = decoded.companyId;
        req.type      = decoded.type;

        console.log('req.userId: ' + req.userId);

        return next();
    });
};
