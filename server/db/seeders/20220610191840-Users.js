'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      { firstName:'Victor', middleName:'Karungaru', lastName:'Mithamo', email:'vickarungaru@gmail.com', hash:'$2b$10$KAmNYm99JiTQ7lXThzV8BOfewnR.Wy38GPPk8hQjl5VlSNxKmpI/K', role:'1', terms:'1', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
