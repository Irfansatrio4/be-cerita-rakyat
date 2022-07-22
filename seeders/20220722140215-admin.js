'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admins', [
      {
        userName: 'admin',
        password: '$2a$10$mmWmcFCvbq41HjgqNpPZz.Hnroi8dqKVWphV3.8zqwJ2y1AW18bgC',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('admins', null, {});
     
  }
};
