'use strict';
const bcrypt = require('bcrypt-nodejs');
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
        email: 'azeez.olaniran@andela.com',
        firstName: 'Azeez',
        lastName: 'Olaniran',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(8)),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        email: 'testuser1@testMail.com',
        firstName: 'test1',
        lastName: 'user1',
        password: bcrypt.hashSync('test password', bcrypt.genSaltSync(8)),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'testuser2@testMail.com',
        firstName: 'test2',
        lastName: 'user2',
        password: bcrypt.hashSync('test password', bcrypt.genSaltSync(8)),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {
      returning: true
    });
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
