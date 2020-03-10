const { Model, DataTypes } = require('sequelize');

class Company extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      tableName: 'companies',
      sequelize
    });
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: 'companyId', as: 'users' });
    this.hasMany(models.Bill, { foreignKey: 'companyId', as: 'bills' });
    this.hasMany(models.CreditCard, { foreignKey: 'companyId', as: 'creditCards' });
    this.hasMany(models.Movement, { foreignKey: 'companyId', as: 'movements' });
    this.hasMany(models.Category, { foreignKey: 'companyId', as: 'categories' });
    this.hasMany(models.UploadOfx, { foreignKey: 'companyId', as: 'uploadOfx' });
    this.hasMany(models.Bank, { foreignKey: 'companyId', as: 'banks' });
  }
}

module.exports = Company;