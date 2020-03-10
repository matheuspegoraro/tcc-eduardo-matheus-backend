const { Model, DataTypes } = require('sequelize');

class Category extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      color: DataTypes.STRING
    }, {
      tableName: 'categories',
      sequelize
    })
  };

  static associate(models){
    this.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });
    this.hasMany(models.Movement, { foreignKey: 'categoryId', as: 'movements' });
    
    //Relacionamento com ela mesma
    this.belongsTo(models.Category, { 
        foreignKey: 'parentId', 
        as: 'parent', 
        useJunctionTable: false });
  };

}

module.exports = Category;