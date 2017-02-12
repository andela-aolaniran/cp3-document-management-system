'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Documents', [
      {
        id: 1,
        title: 'Test Document 1',
        content: 'This is surely a test document',
        ownerId: 1,
        access: 'private',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'Test Document 2',
        content: 'Test Document 2',
        ownerId: 2,
        access: 'role',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: 'Test Document 3',
        content: 'Test Document 3',
        ownerId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title: 'Test Document 4',
        content: 'Test Document 4',
        ownerId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        title: 'Test Document 5',
        content: 'Test Document 5',
        ownerId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        title: 'Test Document 6',
        content: 'Test Document 6',
        ownerId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        title: 'Test Document 7',
        content: 'Test Document 7',
        ownerId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        title: 'Test Document 8',
        content: 'Test Document 8',
        ownerId: 2,
        access: 'role',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        title: 'Test Document 9',
        content: 'Test Document 9',
        ownerId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        title: 'Test Document 10',
        content: 'Test Document 10',
        ownerId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        title: 'Test Document 11',
        content: 'Test Document 11',
        ownerId: 2,
        access: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Documents', null, {});
  }
};
