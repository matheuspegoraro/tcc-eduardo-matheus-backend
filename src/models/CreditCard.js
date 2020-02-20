const { Model, DataTypes } = require('sequelize');

class CreditCard extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      closingDay: DataTypes.INTEGER,
      deadlineDay: DataTypes.INTEGER,
      limit: DataTypes.REAL,
    }, {
      tableName: 'creditCards',
      sequelize
    })
  };

  static associate(models){
    this.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });
    this.belongsTo(models.Bank, { foreignKey: 'bankId', as: 'bank' });
  };

}

module.exports = CreditCard;