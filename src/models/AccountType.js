const { Model, DataTypes } = require('sequelize');

class AccountType extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
    }, {
      tableName: 'accountTypes',
      sequelize
    })
  };

  static associate(models) {
    this.hasMany(models.Account, { foreignKey: 'accountTypeId', as: 'accountTypes' });
  }
}

module.exports = AccountType;