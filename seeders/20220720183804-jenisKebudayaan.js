'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('jenisKebudayaans', [
      {
        id: 1,
        tipeKebudayaan: 'Pencatatan',
      },
      {
        id: 2,
        tipeKebudayaan: 'Penetapan'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('jenisKebudayaans', null, {});
    
  }
};
