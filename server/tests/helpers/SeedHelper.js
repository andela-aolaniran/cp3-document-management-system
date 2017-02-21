import faker from 'faker';
import bcrypt from 'bcrypt-nodejs';
import logger from 'fm-log';
import database from '../../models';

/**
 * SeedData class to populate database with default data
 */
class SeedHelper {

  /**
   * Perform the sequential population of the database
   * in order of associations
   * @return {Void} - Returns Void
   */
  static init() {
    database.sequelize.sync({ force: true })
      .then(() => {
        return SeedHelper.populateRoleTable();
      })
      .then(() => {
        return SeedHelper.populateUserTable();
      })
      .then(() => {
        return SeedHelper.populateDocumentTable();
      })
      .catch((err) => {
        logger.error(err);
      });
  }

  /**
   * Populates database with users
   * @returns {Object} - a Promise object
   */
  static populateUserTable() {
    const users = [
      {
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'azeez.olaniran@andela.com',
        password: SeedHelper.hashPass('code'),
        roleId: 1
      },
      {
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: SeedHelper.hashPass('pass'),
        roleId: 2
      },
      {
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: SeedHelper.hashPass('password'),
        roleId: 2
      },
    ];
    return database.User.bulkCreate(users);
  }

  /**
   * Populates database with default roles
   * @returns {object} - A Promise object
   */
  static populateRoleTable() {
    const roles = [
      {
        title: 'admin',
      },
      {
        title: 'regular'
      },
    ];
    return database.Role.bulkCreate(roles);
  }

  /**
   * Populates database with documents
   * @returns {Object} - A Promise object
   */
  static populateDocumentTable() {
    const documents = [
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'role',
        ownerId: 1
      },
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'private',
        ownerId: 2
      },
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'public',
        ownerId: 3
      },
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'public',
        ownerId: 2

      },
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'public',
        ownerId: 1
      },
      {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'role',
        ownerId: 2
      }
    ];
    return database.Document.bulkCreate(documents);
  }

  /**
  * Generate a hash from plain password string
  * @param {String} password
  * @return {String} hashed password
  */
  static hashPass(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
  }
}

export default SeedHelper.init();
