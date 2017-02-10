import faker from 'faker';

const testData = {
  adminUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  adminUser1: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  adminUser2: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  adminUser3: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  adminUser4: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  adminUser5: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  adminUserRole: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  adminUserSearch: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  adminUserForDocumentTest: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  testUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  regularUserForDocumentTest: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  regularUserForDocumentTest2: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  regularUser1: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  regularUserRole: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  regularUser2: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  regularUser3: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  regularUser4: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  regularUser5: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2
  },
  // Note before using thise documents, a ownerId property should be added
  documentRole1: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph()
  },
  documentPrivate1: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph()
  },
  documentPublic1: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph()
  },
  documentRole2: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph()
  },
  documentPrivate2: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph()
  },
  documentPublic2: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph()
  },
  documentRole3: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph()
  },
  documentPrivate3: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph()
  },
  documentPublic3: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph()
  },
  documentRole4: {
    title: faker.company.catchPhrase(),
    access: 'role',
    content: faker.lorem.paragraph()
  },
  documentPrivate4: {
    title: faker.company.catchPhrase(),
    access: 'private',
    content: faker.lorem.paragraph()
  },
  documentInvalid: {
  },
  documentNoAccess: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
  },
  documentPublic4: {
    title: faker.company.catchPhrase(),
    access: 'public',
    content: faker.lorem.paragraph()
  },
  newRole1: {
    title: 'rookie'
  },
  updateRole1: {
    title: 'rookie update'
  },
  duplicateRole1: {
    title: 'rookie'
  },
  newRole2: {
    title: 'amateur'
  },
  newRole3: {
    title: 'professional'
  }
};

export default testData;