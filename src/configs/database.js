const { Op } = require('sequelize');

const operatorsAliases = {
  $gt: Op.gt,
  $eq: Op.eq,
}

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'admin',
  database: 'dbadministrai',
  define: {
    timestamps: true,
    freezeTableName: true
  },
  operatorsAliases
}; 