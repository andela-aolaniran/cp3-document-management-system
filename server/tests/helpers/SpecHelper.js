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
  testUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  regularUser1: {
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
  document1: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
  },
  document2: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
  }
};

export default testData;