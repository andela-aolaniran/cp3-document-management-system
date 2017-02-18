import supertest from 'supertest';
import chai from 'chai';
import app from '../server';
import testData from './helpers/SpecHelper';
import database from '../models';

const expect = chai.expect;

const client = supertest.agent(app);

let regularUserToken;
let adminUserToken;
let regularUserId;

describe('Users:', () => {
  // Create default roles before running all user
  // related test suites

  describe('Create Regular User', () => {
    it(`Should return http code 201 
      if a Regular User is successfully created`, (done) => {
      client.post('/api/users')
      .send(testData.regularUser1)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        done();
      });
    });

    it('Should NOT allow users with Duplicate Email address to be created',
    (done) => {
      client.post('/api/users')
      .send(testData.regularUser1)
      .end((error, response) => {
        expect(response.status).to.equal(500);
        expect(response.body.success).to.equal(false);
        done();
      });
    });

    it(`Should return a TOKEN 
      if a Regular User is successfully created`, (done) => {
      client.post('/api/users')
      .send(testData.regularUser2)
      .end((error, response) => {
        expect(response.body.user).to.have.property('token');
        done();
      });
    });

    it(`Should return only necessary
      details of the created Regular User`, (done) => {
      client.post('/api/users')
      .send(testData.regularUser3)
      .end((error, response) => {
        expect(response.body.user).to.have.property('firstName');
        expect(response.body.user).to.have.property('lastName');
        expect(response.body.user).to.have.property('email');
        done();
      });
    });

    it('Should NOT return sensitive details of the Regular User', (done) => {
      client.post('/api/users')
      .send(testData.regularUser4)
      .end((error, response) => {
        expect(response.body.user).to.not.have.property('password');
        done();
      });
    });

    it(`Should make a user role be regular by default if no roleId
      is supplied`, (done) => {
      expect(testData.testUser.roleId).to.be.undefined;
      client.post('/api/users')
      .send(testData.testUser)
      .end((error, response) => {
        expect(response.body.user.roleId).to.not.be.undefined;
        expect(response.body.user.roleId).to.equal(2);
        done();
      });
    });
  });

  describe('Create an Admin user', () => {
    it(`Should return http code 201 
      if an Admin User is successfully created`, (done) => {
      client.post('/api/users')
      .send(testData.adminUser)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        done();
      });
    });


    it(`Should return a TOKEN 
      if an Admin User is successfully created`, (done) => {
      client.post('/api/users')
      .send(testData.adminUser1)
      .end((error, response) => {
        expect(response.body.user).to.have.property('token');
        done();
      });
    });

    it(`Should return only necessary
      details of the created Admin user`, (done) => {
      client.post('/api/users')
      .send(testData.adminUser2)
      .end((error, response) => {
        expect(response.body.user).to.have.property('firstName');
        expect(response.body.user).to.have.property('lastName');
        expect(response.body.user).to.have.property('email');
        done();
      });
    });

    it('Should NOT return sensitive details of the Admin user', (done) => {
      client.post('/api/users')
      .send(testData.adminUser3)
      .end((error, response) => {
        expect(response.body.user).to.not.have.property('password');
        done();
      });
    });

    it('Admin user roleId should be 1', (done) => {
      expect(testData.adminUser.roleId).to.not.be.undefined;
      expect(testData.adminUser.roleId).to.equal(1);
      client.post('/api/users')
      .send(testData.adminUser4)
      .end((error, response) => {
        expect(response.body.user.roleId).to.not.be.undefined;
        expect(response.body.user.roleId).to.equal(1);
        done();
      });
    });
  });

  describe('Login', () => {
    const regularUser = testData.regularUser1;
    const adminUser = testData.adminUser;

    it('Should allow login for only CORRECT details of an Admin', (done) => {
      client.post('/api/users/login')
      .send({
        email: adminUser.email,
        password: adminUser.password
      })
      .end((error, response) => {
        expect(response.body.success).to.equal(true);
        done();
      });
    });

    it('Should return a TOKEN if Admin Login is successful', (done) => {
      client.post('/api/users/login')
      .send({
        email: adminUser.email,
        password: adminUser.password
      })
      .end((error, response) => {
        expect(response.body.success).to.equal(true);
        expect(response.body).to.have.property('token');
        adminUserToken = response.body.token;
        done();
      });
    });

    it('Should NOT return a TOKEN if Admin Login FAILS', (done) => {
      client.post('/api/users/login')
      .send({
        email: adminUser.email,
        password: 'wrongpassword'
      })
      .end((error, response) => {
        expect(response.body.success).to.equal(false);
        expect(response.body).to.not.have.property('token');
        done();
      });
    });

    it('Should NOT allow login for INCORRECT details of an Admin', (done) => {
      client.post('/api/users/login')
      .send({
        email: adminUser.email,
        password: 'wrong password'
      })
      .end((error, response) => {
        expect(response.body.success).to.equal(false);
        done();
      });
    });

    it('Should return a TOKEN if Regular User Login is successful', (done) => {
      client.post('/api/users/login')
      .send({
        email: regularUser.email,
        password: regularUser.password
      })
      .end((error, response) => {
        expect(response.body.success).to.equal(true);
        expect(response.body).to.have.property('token');
        regularUserToken = response.body.token;
        regularUserId = response.body.id;
        done();
      });
    });

    it('Should NOT return a TOKEN if Regular User Login FAILS', (done) => {
      client.post('/api/users/login')
      .send({
        email: regularUser.email,
        password: 'wrongpassword'
      })
      .end((error, response) => {
        expect(response.body.success).to.equal(false);
        expect(response.body).to.not.have.property('token');
        done();
      });
    });

    it(`Should allow login for only CORRECT details of a 
    Regular User`, (done) => {
      client.post('/api/users/login')
      .send({
        email: regularUser.email,
        password: regularUser.password
      })
      .end((error, response) => {
        expect(response.body.success).to.equal(true);
        done();
      });
    });

    it(`Should NOT allow login for INCORRECT details of a
     Regular User`, (done) => {
      client.post('/api/users/login')
      .send({
        email: regularUser.email,
        password: 'wrongpassword'
      })
      .end((error, response) => {
        expect(response.body.success).to.equal(false);
        done();
      });
    });
  });
  describe('Logout', () => {
    it('should Successfully Logout an Admin User with a valid token',
    (done) => {
      client.post('/api/users/logout')
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.success).to.equal(true);
        done();
      });
    });

    it('should Fail to Logout an Admin User with an Invalid token',
    (done) => {
      client.post('/api/users/logout')
      .set({ 'x-access-token': 'invalidtoken' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.success).to.equal(false);
        done();
      });
    });

    it('should Successfully Logout a Regular User with a valid token',
    (done) => {
      client.post('/api/users/logout')
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.success).to.equal(true);
        done();
      });
    });

    it('should Fail to Logout a Regular User with an Invalid token',
    (done) => {
      client.post('/api/users/logout')
      .set({ 'x-access-token': 'invalidtoken' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.success).to.equal(false);
        done();
      });
    });
  });

  describe('Get Users', () => {
    it('Should NOT allow NON-Admin access to list of users', (done) => {
      client.get('/api/users')
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        expect(response.body.success).to.equal(false);
        done();
      });
    });

    it('Should Allow an Admin User access to list of Users', (done) => {
      client.get('/api/users')
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.instanceOf(Array);
        done();
      });
    });


    it('Should Not Allow Un-Authorized access to list of Users', (done) => {
      client.get('/api/users')
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.success).to.equal(false);
        done();
      });
    });
  });

  describe('Get User', () => {
    it('Should NOT allow NON-Admin access fetch a User', (done) => {
      client.get('/api/users/1')
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        expect(response.body.success).to.equal(false);
        done();
      });
    });

    it('Should Allow an Admin User access to fetch a User', (done) => {
      client.get('/api/users/1')
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.instanceOf(Object);
        done();
      });
    });

    it('Should Not Allow Un-Authorized access to fetch a User', (done) => {
      client.get('/api/users/1')
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.success).to.equal(false);
        done();
      });
    });

    it(`Should Fail to return a User if User with such id doesn't 
    exist`, (done) => {
      client.get('/api/users/10000')
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.success).to.equal(false);
        done();
      });
    });

    it(`Should return Server error code if an invalid ID is used
    to fetch a user`, (done) => {
      client.get('/api/users/ef')
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(500);
        expect(response.body.success).to.equal(false);
        done();
      });
    });
  });

  describe('Update User', () => {
    it('Should NOT allow a User update another Users profile', (done) => {
      client.put(`/api/users/${regularUserId + 1}`)
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        expect(response.body.success).to.equal(false);
        done();
      });
    });

    it('Should Allow a User Update his profile if he has a valid Token',
    (done) => {
      const newFirstName = 'newName';
      client.put(`/api/users/${regularUserId}`)
      .send({
        firstName: newFirstName
      })
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.firstName).to.equal(newFirstName);
        done();
      });
    });

    it('Should NOT allow a User update his profile without a Valid Token',
    (done) => {
      client.put(`/api/users/${regularUserId}`)
      .set({ 'x-access-token': 'invalidToken' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.success).to.equal(false);
        done();
      });
    });
  });

  describe('Delete User', () => {
    it('Should NOT allow a Non-Admin User delete a User',
    (done) => {
      client.delete(`/api/users/${regularUserId}`)
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        expect(response.body.success).to.equal(false);
        done();
      });
    });

    it('Should NOT allow a User with In-Valid Token delete another User',
    (done) => {
      client.delete(`/api/users/${regularUserId}`)
      .set({ 'x-access-token': 'invalidToken' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.success).to.equal(false);
        done();
      });
    });

    it('Should allow an Admin user with Valid Token delete another User',
    (done) => {
      client.delete(`/api/users/${regularUserId}`)
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.success).to.equal(true);
        done();
      });
    });

    it('Should NOT allow an Admin user with InValid Token delete another User',
    (done) => {
      client.delete(`/api/users/${regularUserId}`)
      .set({ 'x-access-token': 'invalid token' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body.success).to.equal(false);
        done();
      });
    });

    it(`Should NOT allow an Admin user with Valid Token delete a User that does 
    not exist`, (done) => {
      client.delete(`/api/users/${regularUserId + 10000}`)
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.success).to.equal(false);
        done();
      });
    });
  });
});
