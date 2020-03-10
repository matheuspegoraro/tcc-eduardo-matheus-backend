"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("uploadsOfx", "billId", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'bills', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("uploadsOfx", "billId")
    ]);
  }
};
