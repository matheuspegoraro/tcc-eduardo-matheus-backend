const Bank = require("../models/Bank");
const fs = require("fs");
const path = require("path");
const httpStatus = require("http-status");

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

  async list(req, res) {
    try {
      const banks = await Bank.findAll({
        attributes: ["id", "name", "imgPath", "createdAt"],
        where: {
          defaultBank: 0
        }
      });

      return res.status(httpStatus.OK).json(banks);
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Erro ao listar bancos! Por favor, tente mais tarde." });
    }
  },

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
      console.log(error);
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

    try {
      const bank = await bank.findByPk(bankId);

      if (!bank)
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Banco inexistente em nossa base de dados!" });

      await bank.update({
        name
      });

      return res.status(httpStatus.OK).json(bank);
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Não foi possível editar o banco!" });
    }
  }
};
