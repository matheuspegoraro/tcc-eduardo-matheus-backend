'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('movements', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'companies', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      billId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'bills', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      },
      movementTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'movementTypes', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },      
      value: {
        type: Sequelize.REAL,
        allowNull: false,
        defaultValue: 0
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      done: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('movements');
  }
};
