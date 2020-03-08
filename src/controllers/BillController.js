const Bill = require('../models/Bill');
const Company = require('../models/Company');
const Bank = require('../models/Bank');
const BillType = require('../models/BillType');
const httpStatus = require('http-status');

module.exports = {
  async list(req, res) {
    const { companyId } = req;

    try {
      const bills = await Bill.findAll({
        attributes: ['id', 'name', 'currentValue', 'createdAt', 'updatedAt'],
        include: [{
          model: Company,
          as: 'company',
          attributes: ['id', 'name']
        }, {
          model: Bank,
          as: 'bank',
          attributes: ['id', 'name', 'imgPath']
        }, {
          model: BillType,
          as: 'billType',
          attributes: ['id', 'name']
        }],
        where: { companyId }
      });

      return res.status(httpStatus.OK).json(bills);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 

  async create(req, res) {
    const { companyId } = req;
    const { bankId, billTypeId, name, currentValue } = req.body;

    try {
      const bill = await Bill.create({ companyId, bankId, billTypeId, name, currentValue });

      return res.status(httpStatus.OK).json(bill);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  },

  async byId(req, res) {
    const { billId } = req.params;

    try {
      const bill = await Bill.findByPk(billId, {
        include: [{
          model: Company,
          as: 'company',
          attributes: ['id', 'name']
        }, {
          model: Bank,
          as: 'bank',
          attributes: ['id', 'name', 'imgPath']
        }, {
          model: BillType,
          as: 'billType',
          attributes: ['id', 'name', 'icon']
        }]
      });

      if (!bill) 
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Bill not found!' });

      return res.json(bill);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  },

  async delete(req, res) {
    const { billId } = req.params;

    try {
      const bill = await Bill.findByPk(billId);

      if (!bill)
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Conta inexistente em nossa base de dados!" });

      await bill.destroy();

      return res.status(httpStatus.OK).json(bill);
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Não foi possível deletar a conta!" });
    }
  },

  async edit(req, res) {
    const { billId } = req.params;
    const { bankId, billTypeId, name, currentValue } = req.body;

    try {
      const bill = await Bill.findByPk(billId);

      if (!bill)
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Conta inexistente em nossa base de dados!" });

      await bill.update({
        bankId, 
        billTypeId, 
        name, 
        currentValue
      });

      return res.status(httpStatus.OK).json(bill);
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Não foi possível editar a conta!" });
    }
  }
};