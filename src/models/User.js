const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      type: DataTypes.INTEGER,
      passResetToken: DataTypes.STRING,
      passResetExpires: DataTypes.DATE,
    }, {
      tableName: 'users',
      sequelize
    })
  };

  static associate(models){
    this.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });
  };

}

module.exports = User;
