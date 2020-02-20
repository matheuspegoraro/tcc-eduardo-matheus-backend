const BillType = require('../models/BillType');
const httpStatus = require('http-status');

module.exports = {

  async list(req, res) {
    try {
      const billTypes = await BillType.findAll({
        attributes: [
          'id',
          'name',
          'icon'
        ],
      });

      return res.status(httpStatus.OK).json(billTypes);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Problems requesting route!' });
    }
  }, 

  async create(req, res) {
    const { name, icon } = req.body;

    try {
      const billTypeFind = await BillType.findOne({ where: { icon } });

      if (billTypeFind) 
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Bill type already exists!' });

      const billType = await BillType.create({ name, icon });

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
};