const CreditCard = require('../models/CreditCard');
const Company = require('../models/Company');
const Bank = require('../models/Bank');
const httpStatus = require('http-status');

module.exports = {
  async list(req, res) {
    const { companyId: companyId } = req;

    try {
      const creditCards = await CreditCard.findAll({
        attributes: ['id', 'name', 'closingDay', 'deadlineDay', 'limit', 'createdAt', 'updatedAt'],
        include: [{
          model: Company,
          as: 'company',
          attributes: ['id', 'name']
        }, {
          model: Bank,
          as: 'bank',
          attributes: ['id', 'name', 'imgPath']
        }],
        where: { companyId }
      });

      return res.status(httpStatus.OK).json(creditCards);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 

  async create(req, res) {
    const { companyId: companyId } = req;
    const { bankId, name, closingDay, deadlineDay, limit } = req.body;

    try {
      const creditCardFind = await CreditCard.findOne({ where: { name } });

      if (creditCardFind) 
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Credit card already exists!' });

      const creditCard = await CreditCard.create({ companyId, bankId, name, closingDay, deadlineDay, limit });

      return res.status(httpStatus.OK).json(creditCard);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  },

  async byId(req, res) {
    const { creditCardId } = req.params;

    try {
      const creditCard = await CreditCard.findByPk({
        include: [{
          model: Company,
          as: 'company'
        }, {
          model: Bank,
          as: 'bank'
        }],
        where: { creditCardId }
      });

      if (!creditCard) 
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Credit card not found!' });

      return res.json(creditCard);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 
};