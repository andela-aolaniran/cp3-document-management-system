'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Documents', [{
      id: 1,
      title: 'Test Document 1',
      content: 'This is surely a test document',
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      title: 'Test Document 2',
      content: 'Test Document 2',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      title: 'Test Document 3',
      content: 'Test Document 3',
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};