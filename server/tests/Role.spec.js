import supertest from 'supertest';
import chai from 'chai';
import app from '../server';
import testData from './helpers/SpecHelper';
import database from '../models';

const expect = chai.expect;

const client = supertest.agent(app);


describe('Roles:', () => {
  let adminToken, adminId, regularUserToken,
    regularUserId, newRoleId, newRoleTitle;
  before((done) => {
    client.post('/api/users')
    .send(testData.adminUserRole)
    .end((error, response) => {
      adminToken = response.body.user.token;
      adminId = response.body.user.roleId;
      client.post('/api/users')
      .send(testData.regularUserRole)
      .end((error1, response2) => {
        regularUserToken = response2.body.user.token;
        regularUserId = response2.body.user.roleId;
        done();
      });
    });
  });

  describe('Create Role', () => {
    it('should allow an Admin user with VALID token create a Role',
    (done) => {
      client.post('/api/roles')
      .set({ 'x-access-token': adminToken })
      .send(testData.newRole1)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        newRoleId = response.body.id;
        newRoleTitle = response.body.title;
        expect(newRoleTitle).to.equal(testData.newRole1.title);
        done();
      });
    });

    it(`should NOT allow an Admin user with VALID token create a
     DUPLICATE Role`,
    (done) => {
      client.post('/api/roles')
      .set({ 'x-access-token': adminToken })
      .send(testData.duplicateRole1)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        done();
      });
    });

    it(`should NOT allow any User (Admin, Regular...) with an INVALID token 
    create a Role`,
    (done) => {
      client.post('/api/roles')
      .set({ 'x-access-token': 'invalid token' })
      .send(testData.newRole2)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it(`should NOT allow a NON-Admin User with a VALID token 
    create a Role`,
    (done) => {
      client.post('/api/roles')
      .set({ 'x-access-token': regularUserToken })
      .send(testData.newRole3)
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });
  });

  describe('Update Role', () => {
    it('should allow only an Admin user with VALID token UPDATE a Role',
    (done) => {
      client.put(`/api/roles/${newRoleId}`)
      .set({ 'x-access-token': adminToken })
      .send(testData.updateRole1)
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(testData.updateRole1.title);
        done();
      });
    });

    it(`should NOT allow an Admin user with VALID token UPDATE a 
    NON-EXISTENT Role`, (done) => {
      client.put(`/api/roles/${newRoleId + 300}`)
      .set({ 'x-access-token': adminToken })
      .send(testData.updateRole1)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.success).to.equal(false);
        done();
      });
    });

    it(`should NOT allow any User (Admin, Regular...) with an INVALID token 
    UPDATE a Role`,
    (done) => {
      client.put(`/api/roles/${newRoleId}`)
      .set({ 'x-access-token': 'invalid token' })
      .send(testData.updateRole1)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.success).to.equal(false);
        done();
      });
    });

    it(`should NOT allow a NON-Admin User with a VALID token 
    UPDATE a Role`,
    (done) => {
      client.put(`/api/roles/${newRoleId}`)
      .set({ 'x-access-token': regularUserToken })
      .send(testData.updateRole1)
      .end((error, response) => {
        expect(response.status).to.equal(403);
        expect(response.body.success).to.equal(false);
        done();
      });
    });
  });

  describe('Get', () => {
    it('should allow an Admin User with VALID token get all Roles',
    (done) => {
      client.get('/api/roles')
      .set({ 'x-access-token': adminToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.instanceOf(Array);
        done();
      });
    });

    it('should validate that atleast "regular" and "admin" roles exist',
    (done) => {
      client.get('/api/roles')
      .set({ 'x-access-token': adminToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body[0].id).to.equal(1);
        expect(response.body[0].title).to.equal('admin');
        expect(response.body[1].id).to.equal(2);
        expect(response.body[1].title).to.equal('regular');
        done();
      });
    });

    it(`should NOT allow any User (Admin, Regular, ...) with an INVALID 
    token to get all Roles`, (done) => {
      client.get('/api/roles')
      .set({ 'x-access-token': 'invalid token'})
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.success).to.equal(false);
        done();
      });
    });

    it('should NOT allow an Non-Admin User with VALID token get all Roles',
    (done) => {
      client.get('/api/roles')
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        expect(response.body.success).to.equal(false);
        done();
      });
    });
  });
});
