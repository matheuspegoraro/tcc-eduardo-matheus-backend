const Account = require('../models/Account');
const Company = require('../models/Company');
const Bill = require('../models/Bill');
const AccountType = require('../models/AccountType');
const Category = require('../models/Category');
const httpStatus = require('http-status');

module.exports = {
  async list(req, res) {
    const { companyId: companyId } = req;

    try {
      const accounts = await Account.findAll({
        attributes: ['id', 'name', 'value', 'date', 'done', 'createdAt', 'updatedAt'],
        include: [{
          model: Company,
          as: 'company',
          attributes: ['id', 'name']
        }, {
          model: Bill,
          as: 'bill',
          attributes: ['id', 'name', 'currentValue']
        }, {
          model: AccountType,
          as: 'accountType',
          attributes: ['id', 'name', 'icon']
        }, {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'color']
        }],
        where: { companyId }
      });

      return res.status(httpStatus.OK).json(accounts);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problema ao listar contas! Por favor, tente mais tarde.' });
    }
  }, 

  async create(req, res) {
    const { companyId: companyId } = req;
    const { billId, accountTypeId, categoryId, name, value, date, done } = req.body;

    try {
      const account = await Account.create({ companyId, billId, accountTypeId, categoryId, name, value, date, done });

      return res.status(httpStatus.OK).json(account);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problemas ao criar conta! Por favor, tente mais tarde.' });
    }
  },

  async update(req, res) {
    const { companyId: companyId } = req;
    const { accountId } = req.params;
    const { billId, accountTypeId, categoryId, name, value, date, done } = req.body;

    try {
      const account = await Account.findByPk(accountId);

      account.update({ companyId, billId, accountTypeId, categoryId, name, value, date, done });

      return res.status(httpStatus.OK).json(account);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problemas ao atualizar conta! Por favor, tente mais tarde.' });
    }
  },

  async byId(req, res) {
    const { accountId } = req.params;

    try {
      const account = await Account.findByPk(accountId, {
        include: [{
          model: Company,
          as: 'company',
          attributes: ['id', 'name']
        }, {
          model: Bill,
          as: 'bill',
          attributes: ['id', 'name', 'currentValue']
        }, {
          model: AccountType,
          as: 'accountType',
          attributes: ['id', 'name', 'icon']
        }, {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'color']
        }]
      });

      if (!account) 
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'A conta informada não existe!' });

      return res.json(account);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problema ao encontrar a conta informada! Por favor, tente mais tarde.' });
    }
  }, 
};