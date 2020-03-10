const { Model, DataTypes } = require('sequelize');

class Bank extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      imgPath: DataTypes.STRING,
    }, {
      tableName: 'banks',
      sequelize
    })
  };

  static associate(models) {
    this.hasMany(models.Bill, { foreignKey: 'bankId', as: 'bills' });
    this.hasMany(models.CreditCard, { foreignKey: 'bankId', as: 'creditCards' });
    this.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });
  }
}

module.exports = Bank;