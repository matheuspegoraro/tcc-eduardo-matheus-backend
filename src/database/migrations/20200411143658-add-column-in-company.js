"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("companies", "type", {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("companies", "type"),
    ]);
  }
};
