'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('provinsis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaProvinsi: {
        allowNull:false,
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
      }
     
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('provinsis');
  }
};