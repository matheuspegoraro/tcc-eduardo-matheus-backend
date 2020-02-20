const { Model, DataTypes } = require('sequelize');

class BillType extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
    }, {
      tableName: 'billTypes',
      sequelize
    })
  };

  static associate(models) {
    this.hasMany(models.Bill, { foreignKey: 'billTypeId', as: 'billTypes' });
  }
}

module.exports = BillType;