const { Model, DataTypes } = require('sequelize');

class UploadOfx extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            key: DataTypes.STRING,
            size: DataTypes.FLOAT,
        }, {
            freezeTableName: true,
            tableName: 'uploadsOfx',
            sequelize
        })
    };

    static associate(models) {
        this.belongsTo(models.Bill, { foreignKey: 'billId', as: 'bill' });
        this.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });
    };

}

module.exports = UploadOfx;