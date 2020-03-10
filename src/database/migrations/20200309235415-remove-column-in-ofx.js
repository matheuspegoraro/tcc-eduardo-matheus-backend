'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("uploadsOfx", "bankId")
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("uploadsOfx", "bankId", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'banks', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  }
};