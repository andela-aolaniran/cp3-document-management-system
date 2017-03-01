import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../config/server';
import SpecHelper from '../helpers/SpecHelper';
import SeedHelper from '../helpers/SeedHelper';

const client = supertest.agent(app);
const regularUser = SpecHelper.generateRandomUser(2);
let regularUserToken;
let adminUserToken;
let regularUserId;

describe('Users:', () => {
  // Clear and populate the database first
  before((done) => {
    SeedHelper.init()
    .then(() => {
      // fetch regular user token and id for further tests
      client.post('/api/users')
      .send(regularUser)
      .end((error, response) => {
        // set regular user token and id for other tests below
        regularUserToken = response.body.token;
        regularUserId = response.body.id;
        done();
      });
    });
  });

  describe('Create Regular User', () => {
    const newRegularUser = SpecHelper.generateRandomUser(2);
    it(`Should return http code 201
      if a Regular User is successfully created`, (done) => {
      client.post('/api/users')
      .send(newRegularUser)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        done();
      });
    });

    it('Should NOT allow users with Duplicate Email address to be created',
    (done) => {
      client.post('/api/users')
      .send(newRegularUser)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it(`Should return a TOKEN
      if a Regular User is successfully created`, (done) => {
      client.post('/api/users')
      .send(SpecHelper.generateRandomUser(2))
      .end((error, response) => {
        expect(response.body).to.have.property('token');
        done();
      });
    });

    it(`Should return only necessary
      details of the created Regular User`, (done) => {
      client.post('/api/users')
      .send(SpecHelper.generateRandomUser(2))
      .end((error, response) => {
        expect(response.body).to.have.property('firstName');
        expect(response.body).to.have.property('lastName');
        expect(response.body).to.have.property('email');
        done();
      });
    });

    it('Should NOT return sensitive details of the Regular User', (done) => {
      client.post('/api/users')
      .send(SpecHelper.generateRandomUser(2))
      .end((error, response) => {
        expect(response.body).to.not.have.property('password');
        done();
      });
    });

    it('Should NOT create a User if Required fields/attributes are missing',
    (done) => {
      const invalidUser = {};
      client.post('/api/users')
      .send(invalidUser)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it(`Should make a user role be regular by default if no roleId
      is supplied`, (done) => {
      client.post('/api/users')
      .send(SpecHelper.generateRandomUser())
      .end((error, response) => {
        expect(response.body.roleId).to.equal(2);
        done();
      });
    });
  });

  describe('Login', () => {
    it('Should allow login for only CORRECT details of an Admin', (done) => {
      client.post('/api/users/login')
      .send({
        email: SpecHelper.validAdminUser.email,
        password: SpecHelper.validAdminUser.password
      })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it('Should return a TOKEN if Admin Login is successful', (done) => {
      client.post('/api/users/login')
      .send({
        email: SpecHelper.validAdminUser.email,
        password: SpecHelper.validAdminUser.password
      })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
        // set the admin user token for other tests
        adminUserToken = response.body.token;
        done();
      });
    });

    it('Should NOT return a TOKEN if Admin Login FAILS', (done) => {
      client.post('/api/users/login')
      .send({
        email: SpecHelper.validAdminUser.email,
        password: 'wrongpassword'
      })
      .end((error, response) => {
        expect(response.body).to.not.have.property('token');
        done();
      });
    });

    it('Should NOT allow login for INCORRECT details of an Admin', (done) => {
      client.post('/api/users/login')
      .send({
        email: SpecHelper.validAdminUser.email,
        password: 'wrong password'
      })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it('Should return a TOKEN if Regular User Login is successful', (done) => {
      client.post('/api/users/login')
      .send({
        email: SpecHelper.validRegularUser.email,
        password: SpecHelper.validRegularUser.password
      })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
        done();
      });
    });

    it('Should NOT return a TOKEN if Regular User Login FAILS', (done) => {
      client.post('/api/users/login')
      .send({
        email: SpecHelper.validRegularUser.email,
        password: 'wrongpassword'
      })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body).to.not.have.property('token');
        done();
      });
    });

    it(`Should allow login for only CORRECT details of a
    Regular User`, (done) => {
      client.post('/api/users/login')
      .send({
        email: SpecHelper.validRegularUser.email,
        password: SpecHelper.validRegularUser.password
      })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
        done();
      });
    });

    it(`Should NOT allow login for INCORRECT details of a
     Regular User`, (done) => {
      client.post('/api/users/login')
      .send({
        email: SpecHelper.validRegularUser1.email,
        password: 'wrongpassword'
      })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(response.body).to.not.have.property('token');
        done();
      });
    });

    it('Should NOT allow login for a user that does NOT exist',
    (done) => {
      const nonRegisteredUser = SpecHelper.generateRandomUser(2);
      client.post('/api/users/login')
      .send({
        email: nonRegisteredUser.email,
        password: nonRegisteredUser.password
      })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body).to.not.have.property('token');
        done();
      });
    });

    it('Should NOT allow login if email is not provided',
    (done) => {
      client.post('/api/users/login')
      .send({
        password: SpecHelper.validRegularUser.password
      })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.not.have.property('token');
        done();
      });
    });

    it('Should NOT allow login if password is not provided',
    (done) => {
      client.post('/api/users/login')
      .send({
        email: SpecHelper.validRegularUser.email
      })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.not.have.property('token');
        done();
      });
    });
  });

  describe('Get Users', () => {
    it('Should NOT allow NON-Admin with a valid token access to list of users',
    (done) => {
      client.get('/api/users')
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(403);
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
        done();
      });
    });
  });

  describe('Get User', () => {
    it('Should NOT allow NON-Admin  user with valid token fetch another User',
    (done) => {
      client.get(`/api/users/${regularUserId + 1}`)
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it('Should Allow an Admin User with valid token fetch a User',
    (done) => {
      client.get(`/api/users/${regularUserId}`)
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.instanceOf(Object);
        done();
      });
    });

    it('Should Not Allow Un-Authorized fetch of a User', (done) => {
      client.get('/api/users/1')
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it(`Should NOT return a User if User with specified id doesn't
    exist`, (done) => {
      client.get('/api/users/10000')
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });
  });

  describe('Update User', () => {
    it('Should NOT allow a User update another User profile', (done) => {
      client.put(`/api/users/${regularUserId + 1}`)
      .set({ 'x-access-token': regularUserToken })
      .send({ password: 'new password' })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it(`Should NOT Allow a User with a Valid token Update his password with a
    password that is less than the minimum password length`,
    (done) => {
      const shortPassword = '123';
      client.put(`/api/users/${regularUserId}`)
      .send({
        password: shortPassword
      })
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it(`Should NOT Allow a User with a Valid token Update his password with a
    password that is more than the maximum password length`,
    (done) => {
      const longPassword = `sdfcgvbhnmdzghjbnmdfcghjndghjndmcxfghgggbjknmdcghjn
      gggmdcghvjn dsghvbjndsfghvbjdncsghbjdsghvbjdghvbjdc`;
      client.put(`/api/users/${regularUserId}`)
      .send({
        password: longPassword
      })
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it('Should Allow a User Update his password if a valid Token is provided',
    (done) => {
      // add the new password to the regular userObject
      regularUser.newPassword = 'new password';
      client.put(`/api/users/${regularUserId}`)
      .send({
        password: regularUser.newPassword
      })
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it('Should Allow a User Login with the updated password',
    (done) => {
      client.post('/api/users/login')
      .send({
        email: regularUser.email,
        password: regularUser.newPassword
      })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it('Should NOT Allow a User Login with the old password',
    (done) => {
      client.post('/api/users/login')
      .send({
        email: regularUser.email,
        password: regularUser.password
      })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it(`Should Allow an Admin with a valid token update a regular
    user password`,
    (done) => {
      // add the admin set password to the regular user Object
      regularUser.adminSetPassword = 'admin set password';
      client.put(`/api/users/${regularUserId}`)
      .send({
        password: regularUser.adminSetPassword
      })
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it(`Should NOT allow a User Login with the old password already
    updated by an Admin`,
    (done) => {
      client.post('/api/users/login')
      .send({
        email: regularUser.email,
        password: regularUser.newPassword
      })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it('Should Allow a User Login with the new password updated by an Admin',
    (done) => {
      client.post('/api/users/login')
      .send({
        email: regularUser.email,
        password: regularUser.adminSetPassword
      })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        // update the user token as a new token is always
        // generated on every login
        regularUserToken = response.body.token;
        done();
      });
    });

    it('Should NOT allow a User update his profile without a Valid Token',
    (done) => {
      client.put(`/api/users/${regularUserId}`)
      .set({ 'x-access-token': 'invalidToken' })
      .send({ firstName: 'newMan' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });
  });

  describe('Logout', () => {
    const newRegularUser = SpecHelper.generateRandomUser(2);
    before((done) => {
      client.post('/api/users')
      .send(newRegularUser)
      .end((error, response) => {
        newRegularUser.token = response.body.token;
        newRegularUser.id = response.body.id;
        done();
      });
    });

    it('should Successfully Logout an Admin User with a valid token',
    (done) => {
      client.post('/api/users/logout')
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it('should Fail to Logout an Admin User with an Invalid token',
    (done) => {
      client.post('/api/users/logout')
      .set({ 'x-access-token': 'invalidtoken' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it('should Successfully Logout a Regular User with a valid token',
    (done) => {
      client.post('/api/users/logout')
      .set({ 'x-access-token': newRegularUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it('should Fail to Logout a Regular User with an Invalid token',
    (done) => {
      client.post('/api/users/logout')
      .set({ 'x-access-token': 'invalidtoken' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });
  });

  describe('Delete User', () => {
    const currentAdminUser = SpecHelper.validAdminUser;
    before((done) => {
      client.post('/api/users/login')
      .send(currentAdminUser)
      .end((error, response) => {
        currentAdminUser.token = response.body.token;
        currentAdminUser.id = response.body.id;
        done();
      });
    });

    it(`Should NOT allow a Non-Admin User with a valid token delete
    another User`,
    (done) => {
      client.delete(`/api/users/${regularUserId + 1}`)
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it('Should NOT allow a User with an invalid Token delete another User',
    (done) => {
      client.delete(`/api/users/${regularUserId + 1}`)
      .set({ 'x-access-token': 'invalidToken' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it('Should allow an Admin user with Valid Token delete another User',
    (done) => {
      client.delete(`/api/users/${regularUserId}`)
      .set({ 'x-access-token': currentAdminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it('Should NOT allow an Admin user with InValid Token delete another User',
    (done) => {
      client.delete(`/api/users/${regularUserId}`)
      .set({ 'x-access-token': 'invalid token' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it(`Should NOT allow an Admin user with Valid Token delete a User that does
    not exist`, (done) => {
      client.delete(`/api/users/${regularUserId + 10000}`)
      .set({ 'x-access-token': currentAdminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });
  });
});
