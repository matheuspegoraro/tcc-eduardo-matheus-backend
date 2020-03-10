const { Model, DataTypes } = require('sequelize');

class MovementType extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
    }, {
      tableName: 'movementTypes',
      sequelize
    })
  };

  static associate(models) {
    this.hasMany(models.Movement, { foreignKey: 'movementTypeId', as: 'movementTypes' });
  }
}

module.exports = MovementType;