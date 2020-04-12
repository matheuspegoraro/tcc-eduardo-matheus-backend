const { Model } = require('sequelize');

class RelationshipCompany extends Model {
  static init(sequelize) {
    super.init({ }, {
      tableName: 'relationshipCompanies',
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: 'advisoryId', as: 'advisories' });
    this.belongsTo(models.Company, { foreignKey: 'clientId', as: 'clients' });
  }
}

module.exports = RelationshipCompany;