import database from '../../models';
import SpecHelper from './SpecHelper';

/**
 * SeedData class to populate database with default data
 */
class SeedHelper {

  /**
   * Perform the sequential population of the database
   * in order of associations
   * @return {Object} - Returns a Promise Object
   */
  static init() {
    return database.sequelize.sync({ force: true })
      .then(() => SeedHelper.populateRoleTable())
      .then(() => SeedHelper.populateUserTable())
      .then(() => SeedHelper.populateDocumentTable());
  }

  /**
   * Populates database with test users
   * @returns {Object} - a Promise object
   */
  static populateUserTable() {
    const users = [
      SpecHelper.validAdminUser,
      SpecHelper.validRegularUser,
      SpecHelper.validRegularUser1,
      SpecHelper.validRegularUser2,
      SpecHelper.validRegularUser3,
      SpecHelper.validRegularUser4,
      SpecHelper.validRegularUser5,
      SpecHelper.validRegularUser6,
      SpecHelper.validRegularUser7,
      SpecHelper.validRegularUser8,
      SpecHelper.validRegularUser9
    ];
    return database.User.bulkCreate(users, { individualHooks: true });
  }

  /**
   * Populates database with default roles
   * @returns {object} - A Promise object
   */
  static populateRoleTable() {
    const roles = [
      SpecHelper.validAdminRole,
      SpecHelper.validRegularRole,
      SpecHelper.generateRandomRole('random')
    ];
    return database.Role.bulkCreate(roles, { individualHooks: true });
  }

  /**
   * Populates database with documents
   * @returns {Object} - A Promise object
   */
  static populateDocumentTable() {
    const documents = [
      SpecHelper.validPrivateDocument,
      SpecHelper.validPrivateDocument1,
      SpecHelper.validPrivateDocument2,
      SpecHelper.validPrivateDocument3,
      SpecHelper.validPublicDocument,
      SpecHelper.validPublicDocument1,
      SpecHelper.validPublicDocument2,
      SpecHelper.validPublicDocument3,
      SpecHelper.validRoleDocument,
      SpecHelper.validRoleDocument1,
      SpecHelper.validRoleDocument2,
      SpecHelper.validRoleDocument3
    ];
    return database.Document.bulkCreate(documents, { individualHooks: true });
  }
}

export default SeedHelper;
