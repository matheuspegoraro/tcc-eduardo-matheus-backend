'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("billTypes", "icon")
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("billTypes", "icon", {
        type: Sequelize.STRING,
        allowNull: true
      }),
    ]);
  }
};