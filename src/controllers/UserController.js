const User = require('../models/User');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const authConfig = require('../configs/auth');

module.exports = {

  async allUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: [
          'id',
          'name',
          'email',
          'createdAt',
          'updatedAt', 
        ],
      });

      return res.status(httpStatus.OK).json(users);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 

  async createUser(req, res) {
    const { name, email, password, type, companyId } = req.body;

    try {
      const userFind = await User.findOne({ where: {email} });

      if (userFind){
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'User already exists!' });
      }

      const user = await User.create({ name, email, password, type, companyId });

      const token = jwt.sign({ id: user.id, companyId: companyId, type: user.type }, authConfig.secret, {
        expiresIn: 86400, //expires in one day (in seconds).
      });

      return res.status(httpStatus.OK).json({ user, token });
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 

  async userById(req, res) {
    const { userId } = req.params;

    try {
      const user = await User.findByPk(userId);

      if (!user) 
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'User not found!' });

      return res.json(user);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 
};