const Company = require('../models/Company');
const RelationshipCompany = require('../models/RelationshipCompany');
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
            $eq: 2
          }
        }
      });

      return res.status(httpStatus.OK).json(companies);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 

  async byAdvisory(req, res) {
    const { companyId } = req;

    try {
      const clients = await RelationshipCompany.findAll({
        attributes: [
          'id',
          'createdAt'
        ],
        include: [{
          model: Company,
          as: 'clients',
          attributes: ['id', 'name']
        }],
        where: {
          advisoryId: companyId
        }
      });

      return res.status(httpStatus.OK).json(clients);
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 
};