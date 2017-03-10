import faker from 'faker';

const SpecHelper = {
  validPublicDocument: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph(),
    ownerId: 1,
    ownerRoleId: 1
  },
  validPublicDocument1: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph(),
    ownerId: 7,
    ownerRoleId: 2
  },
  validPublicDocument2: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph(),
    ownerId: 6,
    ownerRoleId: 2
  },
  validPublicDocument3: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph(),
    ownerId: 5,
    ownerRoleId: 2
  },
  validPrivateDocument: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph(),
    ownerId: 1,
    ownerRoleId: 1
  },
  validPrivateDocument1: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph(),
    ownerId: 6,
    ownerRoleId: 2
  },
  validPrivateDocument2: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph(),
    ownerId: 3,
    ownerRoleId: 2
  },
  validPrivateDocument3: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph(),
    ownerId: 1,
    ownerRoleId: 1
  },
  validRoleDocument: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph(),
    ownerId: 4,
    ownerRoleId: 2
  },
  validRoleDocument1: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph(),
    ownerId: 3,
    ownerRoleId: 2
  },
  validRoleDocument2: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph(),
    ownerId: 1,
    ownerRoleId: 1
  },
  validRoleDocument3: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph(),
    ownerId: 2,
    ownerRoleId: 2
  },
  validAdminUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  validRegularUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser1: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser2: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser3: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser4: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser5: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser6: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser7: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser8: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser9: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularRole: {
    title: 'regular'
  },
  validAdminRole: {
    title: 'admin'
  },
  /**
   * Method to help create a new Model record by extending
   * a base Model record, thereby avoiding mutation
   * @param{Object} baseRecord - base record to extend
   * @param{Object} newAttribute - new attribute to be added to this record
   * @return{Object} - a new Model record
   */
  newRecordFromBase(baseRecord, newAttribute) {
    return Object.assign({}, baseRecord, newAttribute);
  },
  /**
   * Method to generate a random user on the fly
   * with a specific role type (1 for admin and 2 for regular user)
   * @param{Number} roleId - role id for this user
   * @return{Object} - new User
   */
  generateRandomUser(roleId) {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId
    };
  },
  /**
   * Method to generate a random role on the fly
   * @param{Number} roleTitle - title role
   * @return{Object} - new Role
   */
  generateRandomRole(roleTitle) {
    return {
      title: roleTitle
    };
  },
   /**
   * Method to generate a random role on the fly
   * @param{String} accessType - specific access type for this
   * document
   * @return{Object} - new Document
   */
  generateRandomDocument(accessType) {
    return {
      title: faker.company.catchPhrase(),
      access: accessType,
      content: faker.lorem.paragraph()
    };
  }
};

export default SpecHelper;
