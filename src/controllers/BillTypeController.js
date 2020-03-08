const BillType = require('../models/BillType');
const httpStatus = require('http-status');

module.exports = {

  async list(req, res) {
    try {
      const billTypes = await BillType.findAll({
        attributes: [
          'id',
          'name'
        ],
      });

      return res.status(httpStatus.OK).json(billTypes);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 

  async create(req, res) {
    const { name } = req.body;

    try {
      const billTypeFind = await BillType.findOne({ where: { name } });

      if (billTypeFind) 
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Bill type already exists!' });

      const billType = await BillType.create({ name });

      return res.status(httpStatus.OK).json(billType);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  },

  async byId(req, res) {
    const { billTypeId } = req.params;

    try {
      const billType = await BillType.findByPk(billTypeId);

      if (!billType) 
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Bill type not found!' });

      return res.json(billType);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  },

  async delete(req, res) {
    const { billTypeId } = req.params;

    try {
      const billType = await BillType.findByPk(billTypeId);

      if (!billType)
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Tipo de conta inexistente em nossa base de dados!" });

      await billType.destroy();

      return res.status(httpStatus.OK).json(billType);
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Não foi possível deletar o tipo de conta!" });
    }
  },

  async edit(req, res) {
    const { billTypeId } = req.params;
    const { name } = req.body;

    try {
      const billType = await BillType.findByPk(billTypeId);

      if (!billType)
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Tipo de conta inexistente em nossa base de dados!" });

      await billType.update({
        name
      });

      return res.status(httpStatus.OK).json(billType);
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Não foi possível editar o tipo de conta!" });
    }
  }
};