const { Model, DataTypes } = require('sequelize');

class Message extends Model {
  static init(sequelize) {
    super.init({ 
      message: DataTypes.STRING,
     }, {
      tableName: 'messages',
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: 'receiveId', as: 'receives' });
    this.belongsTo(models.Company, { foreignKey: 'senderId', as: 'senders' });
  }
}

module.exports = Message;