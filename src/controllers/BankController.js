const Bank = require('../models/Bank');
const fs = require('fs');
const path = require('path');
const httpStatus = require('http-status');

module.exports = {

  async list(req, res) {
    try {
      const banks = await Bank.findAll({
        attributes: [
          'id',
          'name',
          'imgPath'
        ],
      });

      return res.status(httpStatus.OK).json(banks);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao listar bancos! Por favor, tente mais tarde.' });
    }
  }, 

  async create(req, res) {
    const { name, imgPath } = req.body;
   
    try {
      const bankFind = await Bank.findOne({ where: { name } });

      if (bankFind) 
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Banco já cadastrado! Por favor, insira um diferente.' });

      const bank = await Bank.create({ name, imgPath });

      return res.status(httpStatus.OK).json(bank);
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro cadastrar banco! Por favor, tente mais tarde.' });
    }
  },

  async byId(req, res) {
    const { bankId } = req.params;

    try {
      const bank = await Bank.findByPk(bankId);

      if (!bank) 
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Banco inexistente em nossa base de dados!' });

      return res.json(bank);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao listar banco! Por favor, tente mais tarde.' });
    }
  }, 
};