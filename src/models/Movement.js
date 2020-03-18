const { Model, DataTypes } = require('sequelize');

class Movement extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      value: DataTypes.REAL,
      date: DataTypes.DATE,
      done: DataTypes.BOOLEAN,
      dischargeDate: DataTypes.DATE,
    }, {
      tableName: 'movements',
      sequelize
    })
  };

  static associate(models){
    this.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });
    this.belongsTo(models.Bill, { foreignKey: 'billId', as: 'bill' });
    this.belongsTo(models.MovementType, { foreignKey: 'movementTypeId', as: 'movementType' });
    this.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
  };

}

module.exports = Movement;