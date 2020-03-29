"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("movements", "billOutId", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'bills', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("movements", "billOutId"),
    ]);
  }
};
