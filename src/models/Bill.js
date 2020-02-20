const { Model, DataTypes } = require('sequelize');

class Bill extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      current_value: DataTypes.REAL,
    }, {
      tableName: 'bills',
      sequelize
    })
  };

  static associate(models){
    this.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });
    this.belongsTo(models.Bank, { foreignKey: 'bankId', as: 'bank' });
    this.belongsTo(models.BillType, { foreignKey: 'billTypeId', as: 'billType' });
  };

}

module.exports = Bill;