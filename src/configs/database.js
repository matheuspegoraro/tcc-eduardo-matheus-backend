const { Op } = require('sequelize');

const operatorsAliases = {
  $gt: Op.gt,
  $eq: Op.eq,
}

module.exports = {
  dialect: 'postgres',
  host: 'tuffi.db.elephantsql.com',
  username: 'scbcoxbm',
  password: 'YZoGDj2roAmEdBw57o6z1IHVYUhvgoon',
  database: 'scbcoxbm',
  define: {
    timestamps: true,
    freezeTableName: true
  },
  operatorsAliases
}; 