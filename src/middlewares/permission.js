const httpStatus = require('http-status');
const User = require('../models/User');

module.exports = type => async (req, res, next) => {
    const { userId } = req;

    console.log(userId);

    try {
        const user = await User.findByPk(userId);

        if (!user)
            return res.status(httpStatus.BAD_REQUEST).json({ error: 'User not found!' });

        if (user.type != type)
            return res.status(httpStatus.BAD_REQUEST).json({ error: 'No access permission!' });

        return next();

    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
};
