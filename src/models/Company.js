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
    this.hasMany(models.Account, { foreignKey: 'companyId', as: 'accounts' });
    this.hasMany(models.Category, { foreignKey: 'companyId', as: 'categories' });
    this.hasMany(models.UploadOfx, { foreignKey: 'companyId', as: 'uploadOfx' });
  }
}

module.exports = Company;