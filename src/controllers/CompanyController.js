const Company = require('../models/Company');
const httpStatus = require('http-status');

module.exports = {
  async list(req, res) {
    try {
      const companies = await Company.findAll({
        attributes: [
          'id',
          'name',
        ],
      });

      return res.status(httpStatus.OK).json(companies);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 

  async create(req, res) {
    const { name } = req.body;

    try {
      const companyFind = await Company.findOne({ where: { name } });

      if (companyFind){
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Company already exists!' });
      }

      const company = await Company.create({ name });

      return res.status(httpStatus.OK).json(company);
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 

  async byId(req, res) {
    const { companyId } = req.params;

    try {
      const company = await Company.findByPk(companyId);

      if (!company) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Company not found!' });
      }

      return res.json(company);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 
};