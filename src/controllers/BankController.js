const Bank = require("../models/Bank");
const fs = require("fs");
const path = require("path");
const httpStatus = require("http-status");
const { Op } = require("sequelize");

module.exports = {
  async listDefaults(req, res) {
    try {
      const banks = await Bank.findAll({
        attributes: ["id", "name", "imgPath", "createdAt"],
        where: {
          defaultBank: 1
        }
      });

      return res.status(httpStatus.OK).json(banks);
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Erro ao listar bancos! Por favor, tente mais tarde." });
    }
  },

  //lista todos os bancos padrões + bancos cadastrados pelos usuario.
  async listAll(req, res) {
    const { companyId } = req;

    try {
      const banks = await Bank.findAll({
        attributes: ["id", "name", "companyId", "imgPath", "createdAt"],
        [Op.or]: [{ companyId }, { companyId: null }]
      });

      return res.status(httpStatus.OK).json(banks);
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Erro ao listar bancos! Por favor, tente mais tarde." });
    }
  },

  //somente para bancos criado pelo usuario.
  async create(req, res) {
    const { name, imgPath } = req.body;
    const { companyId } = req;

    try {
      const bankFind = await Bank.findOne({ where: { name, companyId } });

      if (bankFind)
        return res.status(httpStatus.BAD_REQUEST).json({
          error: "Banco já cadastrado! Por favor, insira um diferente."
        });

      const bank = await Bank.create({ name, imgPath, companyId });

      return res.status(httpStatus.OK).json(bank);
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Erro cadastrar banco! Por favor, tente mais tarde." });
    }
  },

  async byId(req, res) {
    const { bankId } = req.params;

    try {
      const bank = await Bank.findByPk(bankId);

      if (!bank)
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Banco inexistente em nossa base de dados!" });

      return res.json(bank);
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Erro ao listar banco! Por favor, tente mais tarde." });
    }
  },

  async delete(req, res) {
    const { bankId } = req.params;

    try {
      const bank = await Bank.findByPk(bankId);

      if (!bank)
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Banco inexistente em nossa base de dados!" });

      await bank.destroy();

      return res.status(httpStatus.OK).json(bank);
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Não foi possível deletar o banco!" });
    }
  },

  async edit(req, res) {
    const { bankId } = req.params;
    const { name, imgPath } = req.body;

    try {
      const bank = await Bank.findByPk(bankId);

      if (bank) {
        bank.update({
          name
        })
        .then(() => {
          res.status(httpStatus.OK).json(bank);
        })
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar alterar o banco! Não encontramos na base de dados.' });
      }
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Erro ao tentar alterar o banco! Por favor, tente mais tarde.' });
    }
  }
  
};
