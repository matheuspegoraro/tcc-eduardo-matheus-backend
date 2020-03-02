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
        where: { companyId },
        order: [
          ['name', 'ASC'],
        ],
      });

      return res.status(httpStatus.OK).json(creditCards);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar buscar lista de cartões! Por favor, tente mais tarde.' });
    }
  }, 

  async create(req, res) {
    const { companyId: companyId } = req;
    const { bankId, name, closingDay, deadlineDay, limit } = req.body;

    try {
      const creditCardFind = await CreditCard.findOne({ where: { name } });

      if (creditCardFind) 
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar cadastrar o cartão! Cartão já cadastro na base de dados.' });

      const creditCard = await CreditCard.create({ companyId, bankId, name, closingDay, deadlineDay, limit });

      return res.status(httpStatus.OK).json(creditCard);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar cadastrar o cartão! Por favor, tente mais tarde.' });
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
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar buscar cartão! Cartão não existente na base de dados.' });

      return res.json(creditCard);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar buscar cartão! Por favor, tente mais tarde.' });
    }
  }, 

  async edit(req, res) {
    const { creditCardId } = req.params;
    const { bankId, name, closingDay, deadlineDay, limit } = req.body;

    try {
      const creditCard = await CreditCard.findByPk(creditCardId);

      if (creditCard) {
        creditCard.update({
          bankId, name, closingDay, deadlineDay, limit
        })
        .then(() => {
          res.status(httpStatus.OK).json(creditCard);
        })
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar alterar o cartão! Cartão não existente na base de dados.' });
      }
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar alterar o cartão! Por favor, tente mais tarde.' });
    }
  },

  async delete(req, res) {
    const { creditCardId } = req.params;

    try {
      const creditCard = await CreditCard.findByPk(creditCardId);

      if (creditCard) {
        creditCard.destroy()
          .then(() => {
            res.status(httpStatus.OK).json(creditCard);
          })
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar remover o cartão! Cartão não existente na base de dados.' });
      }
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar remover o cartão! Por favor, tente mais tarde.' });
    }
  },
};