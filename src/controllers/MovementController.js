const Movement = require('../models/Movement');
const Company = require('../models/Company');
const Bill = require('../models/Bill');
const MovementType = require('../models/MovementType');
const Category = require('../models/Category');
const httpStatus = require('http-status');

module.exports = {
  async list(req, res) {
    const { companyId: companyId } = req;

    try { 
      const movements = await Movement.findAll({
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
          model: MovementType,
          as: 'MovementType',
          attributes: ['id', 'name', 'icon']
        }, {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'color']
        }],
        where: { companyId }
      });

      return res.status(httpStatus.OK).json(movements);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problema ao listar contas! Por favor, tente mais tarde.' });
    }
  }, 

  async create(req, res) {
    const { companyId: companyId } = req;
    const { billId, movementTypeId, categoryId, name, value, date, done } = req.body;

    try {
      const movement = await Movement.create({ companyId, billId, movementTypeId, categoryId, name, value, date, done });

      return res.status(httpStatus.OK).json(movement);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problemas ao criar conta! Por favor, tente mais tarde.' });
    }
  },

  async update(req, res) {
    const { companyId: companyId } = req;
    const { movementId } = req.params;
    const { billId, movementTypeId, categoryId, name, value, date, done } = req.body;

    try {
      const movement = await Movement.findByPk(movementId);

      movement.update({ companyId, billId, movementTypeId, categoryId, name, value, date, done });

      return res.status(httpStatus.OK).json(movement);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problemas ao atualizar conta! Por favor, tente mais tarde.' });
    }
  },

  async byId(req, res) {
    const { movementId } = req.params;

    try {
      const movement = await Movement.findByPk(movementId, {
        include: [{
          model: Company,
          as: 'company',
          attributes: ['id', 'name']
        }, {
          model: Bill,
          as: 'bill',
          attributes: ['id', 'name', 'currentValue']
        }, {
          model: MovementType,
          as: 'movementType',
          attributes: ['id', 'name', 'icon']
        }, {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'color']
        }]
      });

      if (!movement) 
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'A conta informada não existe!' });

      return res.json(movement);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problema ao encontrar a conta informada! Por favor, tente mais tarde.' });
    }
  }, 
};