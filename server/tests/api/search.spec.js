import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../config/server';
import SpecHelper from '../helpers/SpecHelper';
import SeedHelper from '../helpers/SeedHelper';

const client = supertest.agent(app);

describe('Search', () => {
  const adminUser = SpecHelper.validAdminUser;
  before((done) => {
    // lets get our regular and admin user data after clearing the db
    // and inserting default data
    SeedHelper.init()
    .then(() => {
      // login admin user
      client.post('/api/users/login')
      .send({
        email: adminUser.email,
        password: adminUser.password
      })
      .end((error, response) => {
        // set admin user token
        adminUser.token = response.body.token;
        // fetch regularUser1 details
        client.post('/api/users');
        done();
      });
    });
  });

  describe('Search Documents', () => {
    it(`should return a 400 (bad request) status code if an invalid
    limit is specified`,
    (done) => {
      const searchLimit = -1;
      client.get(`/api/documents/?limit=${searchLimit}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('should return Documents ordered by createdAt date in descending order',
    (done) => {
      client.get('/api/documents/')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        let oldestDate = Date.now();
        response.body.documents.forEach((document) => {
          const createdDate = Date.parse(document.createdAt);
          expect(createdDate).to.be.lte(oldestDate);
          oldestDate = createdDate;
        });
        done();
      });
    });

    it('should return only Documents that match a specific query', (done) => {
      const searchText = SpecHelper.validPrivateDocument1.title.split(/\s/)[0];
      client.get(`/api/documents/?search=${searchText}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        response.body.documents.forEach(document =>
          expect(document.title).to.contain(searchText) ||
          expect(document.content).to.contain(searchText)
        );
        done();
      });
    });
  });

  describe('Users', () => {
    it('should return Users limited by a specified number', (done) => {
      const searchLimit = 3;
      client.get(`/api/users/?limit=${searchLimit}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.users.length).to.equal(searchLimit);
        done();
      });
    });

    it('should return a 400 status code if an invalid limit is specified',
    (done) => {
      const searchLimit = -1;
      client.get(`/api/users/?limit=${searchLimit}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('should return Users ordered by creation date in descending order',
    (done) => {
      client.get('/api/users/')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        let oldestDate = Date.now();
        response.body.users.forEach((user) => {
          const createdDate = Date.parse(user.createdAt);
          expect(createdDate).to.be.lte(oldestDate);
          oldestDate = createdDate;
        });
        done();
      });
    });

    it('should return only users that match a specific query', (done) => {
      const searchText = adminUser.firstName;
      client.get(`/api/users/?search=${searchText}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        response.body.users.forEach(user =>
          expect(user.firstName).to.contain(searchText) ||
          expect(user.lastName).to.contain(searchText) ||
          expect(user.email).to.contain(searchText)
        );
        done();
      });
    });
  });

  describe('Roles', () => {
    it('should return Roles limited by a specified number', (done) => {
      const searchLimit = 2;
      client.get(`/api/roles/?limit=${searchLimit}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.roles.length).to.equal(searchLimit);
        done();
      });
    });

    it('should return a 400 status code if an invalid limit is specified',
    (done) => {
      const searchLimit = -1;
      client.get(`/api/roles/?limit=${searchLimit}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('should return Roles ordered by creation date in descending order',
    (done) => {
      client.get('/api/roles/')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        let oldestDate = Date.now();
        response.body.roles.forEach((role) => {
          const createdDate = Date.parse(role.createdAt);
          expect(createdDate).to.be.lte(oldestDate);
          oldestDate = createdDate;
        });
        done();
      });
    });

    it('should return only Roles that match a specific query', (done) => {
      const searchText = 'regular';
      client.get(`/api/roles/?search=${searchText}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        response.body.roles.forEach(role =>
          expect(role.title).to.contain(searchText)
        );
        done();
      });
    });
  });
});
