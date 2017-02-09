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

    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        email: 'azeez.olaniran@andela.com',
        firstName: 'Azeez',
        lastName: 'Olaniran',
        password: 'password',
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 2,
        email: 'testuser1@testMail.com',
        firstName: 'test1',
        lastName: 'user1',
        password: 'testpassword',
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        email: 'testuser2@testMail.com',
        firstName: 'test2',
        lastName: 'user2',
        password: 'testpassword',
        roleId: 2,
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
    queryInterface.bulkDelete('Users', null, {});
  }
};
