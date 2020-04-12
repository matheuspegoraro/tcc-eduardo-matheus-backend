const Company = require('../models/Company');
const httpStatus = require('http-status');  

module.exports = {
  async list(req, res) {
    try {
      const companies = await Company.findAll({
        attributes: [
          'id',
          'type',
          'name',
        ],
        where: {
          'type': {
            $eq: 3
          }
        }
      });

      return res.status(httpStatus.OK).json(companies);
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 
};