'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kebudayaans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_regis: {
        allowNull:false,
        autoIncrement:true,
        type: Sequelize.INTEGER
      },
      namaBudaya: {
        allowNull:false,
        type: Sequelize.STRING
      },
      deskripsi: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      tahun: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      gambar: {
        allowNull: true,
        type: Sequelize.STRING
      },
      provinsiId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        references: { model: 'provinsis', key: 'id' },
        type: Sequelize.INTEGER
      },
      jenisKebudayaanId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        references: { model: 'jenisKebudayaans', key: 'id' },
        type: Sequelize.INTEGER
      },
      video: {
        allowNull:true,
        type: Sequelize.STRING
      }
    
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('kebudayaans');
  }
};