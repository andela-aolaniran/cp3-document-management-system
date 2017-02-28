import faker from 'faker';

const SpecHelper = {
  validPublicDocument: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph(),
    ownerId: 1
  },
  validPublicDocument1: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph(),
    ownerId: 7
  },
  validPublicDocument2: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph(),
    ownerId: 6
  },
  validPublicDocument3: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph(),
    ownerId: 5
  },
  validPrivateDocument: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph(),
    ownerId: 1
  },
  validPrivateDocument1: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph(),
    ownerId: 6
  },
  validPrivateDocument2: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph(),
    ownerId: 3
  },
  validPrivateDocument3: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph(),
    ownerId: 1
  },
  validRoleDocument: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph(),
    ownerId: 4
  },
  validRoleDocument1: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph(),
    ownerId: 3
  },
  validRoleDocument2: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph(),
    ownerId: 1
  },
  validRoleDocument3: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph(),
    ownerId: 2
  },
  validAdminUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  validRegularUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser1: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser2: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser3: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser4: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser5: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser6: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser7: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser8: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  validRegularUser9: {
    username: faker.internet.userName(),
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
      username: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId
    };
  }
};

export default SpecHelper;

// const testData = {
//   adminUser: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     roleId: 1
//   },
//   adminUser1: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     roleId: 1
//   },
//   adminUser2: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     roleId: 1
//   },
//   userInvalid: {
//     firstName: 'user with',
//     lastName: 'no password or email'
//   },
//   adminUser3: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     roleId: 1
//   },
//   adminUser4: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     roleId: 1
//   },
//   adminUser5: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     roleId: 1
//   },
//   adminUserRole: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     roleId: 1
//   },
//   adminUserSearch: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     roleId: 1
//   },
//   adminUserForDocumentTest: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     roleId: 1
//   },
//   testUser: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password()
//   },
//   regularUserForDocumentTest: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     roleId: 2
//   },
//   regularUserForDocumentTest2: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     roleId: 2
//   },
//   regularUser1: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     roleId: 2
//   },
//   regularUserRole: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     roleId: 2
//   },
//   regularUser2: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     roleId: 2
//   },
//   regularUser3: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     roleId: 2
//   },
//   regularUser4: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     roleId: 2
//   },
//   regularUser5: {
//     username: faker.internet.userName(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//     roleId: 2
//   },
//   // Note before using thise documents, a ownerId property should be added
//   documentRole1: {
//     title: faker.company.catchPhrase(),
//     access: 'role',
//     content: faker.lorem.paragraph()
//   },
//   documentPrivate1: {
//     title: faker.company.catchPhrase(),
//     access: 'private',
//     content: faker.lorem.paragraph()
//   },
//   documentPublic1: {
//     title: faker.company.catchPhrase(),
//     access: 'public',
//     content: faker.lorem.paragraph()
//   },
//   documentRole2: {
//     title: faker.company.catchPhrase(),
//     access: 'role',
//     content: faker.lorem.paragraph()
//   },
//   documentPrivate2: {
//     title: faker.company.catchPhrase(),
//     access: 'private',
//     content: faker.lorem.paragraph()
//   },
//   documentPublic2: {
//     title: faker.company.catchPhrase(),
//     access: 'public',
//     content: faker.lorem.paragraph()
//   },
//   documentRole3: {
//     title: faker.company.catchPhrase(),
//     access: 'role',
//     content: faker.lorem.paragraph()
//   },
//   documentPrivate3: {
//     title: faker.company.catchPhrase(),
//     access: 'private',
//     content: faker.lorem.paragraph()
//   },
//   documentPublic3: {
//     title: faker.company.catchPhrase(),
//     access: 'public',
//     content: faker.lorem.paragraph()
//   },
//   documentRole4: {
//     title: faker.company.catchPhrase(),
//     access: 'role',
//     content: faker.lorem.paragraph()
//   },
//   documentPrivate4: {
//     title: faker.company.catchPhrase(),
//     access: 'private',
//     content: faker.lorem.paragraph()
//   },
//   documentInvalid: {
//   },
//   documentNoAccess: {
//     title: faker.company.catchPhrase(),
//     content: faker.lorem.paragraph()
//   },
//   documentPublic4: {
//     title: faker.company.catchPhrase(),
//     access: 'public',
//     content: faker.lorem.paragraph()
//   },
//   newRole1: {
//     title: 'rookie'
//   },
//   updateRole1: {
//     title: 'rookie update'
//   },
//   newRole2: {
//     title: 'amateur'
//   },
//   newRole3: {
//     title: 'professional'
//   },
//   invalidRole: {
//     id: 'professional'
//   }
// };

// export default testData;
