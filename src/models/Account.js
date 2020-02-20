const { Model, DataTypes } = require('sequelize');

class Account extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      value: DataTypes.REAL,
      date: DataTypes.DATE,
      done: DataTypes.BOOLEAN
    }, {
      tableName: 'accounts',
      sequelize
    })
  };

  static associate(models){
    this.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });
    this.belongsTo(models.Bill, { foreignKey: 'billId', as: 'bill' });
    this.belongsTo(models.AccountType, { foreignKey: 'accountTypeId', as: 'accountType' });
    this.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
  };

}

module.exports = Account;