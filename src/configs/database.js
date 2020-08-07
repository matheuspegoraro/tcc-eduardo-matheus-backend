const { Op } = require('sequelize');

const operatorsAliases = {
  $gt: Op.gt,
  $eq: Op.eq,
  $gte: Op.gte,
  $lt: Op.lt
}

module.exports = {
  dialect: 'postgres',
  host: 'tuffi.db.elephantsql.com',
  username: 'ychmdtly',
  password: '3zPo326iIrAgyYpPLKfwBQWDvvqToVEA',
  database: 'ychmdtly',
  define: {
    timestamps: true,
    freezeTableName: true
  },
  operatorsAliases
}; 