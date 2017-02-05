import supertest from 'supertest';
import chai from 'chai';
import app from '../server';
import testData from './helpers/SpecHelper';
import database from '../models';

const expect = chai.expect;

const client = supertest.agent(app);

// delete the user before each post request to avoid 
// voilating database constraints
const deleteUser = (userEmail) => {
  database.User.destroy({
    where: {
      email: userEmail
    }
  });
};

let regularUserToken ;
let adminUserToken;

describe('User Endpoints', () => {
  // Create default roles before running all user
  // related test suites

  describe('Create Regular User', () => {
    it(`Should return http code 201 
      if a Regular User is successfully created`, (done) => {
      client.post('/api/users')
      .send(testData.regularUser1)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        deleteUser(testData.regularUser1.email);
        done();
      });
    });

    it(`Should return a TOKEN 
      if a Regular User is successfully created`, (done) => {
      client.post('/api/users')
      .send(testData.regularUser1)
      .end((error, response) => {
        expect(response.body.user).to.have.property('token');
        deleteUser(testData.regularUser1.email);
        done();
      });
    });

    it(`Should return only necessary
      details of the created Regular User`, (done) => {
      client.post('/api/users')
      .send(testData.regularUser1)
      .end((error, response) => {
        expect(response.body.user).to.have.property('firstName');
        expect(response.body.user).to.have.property('lastName');
        expect(response.body.user).to.have.property('email');
        deleteUser(testData.regularUser1.email);
        done();
      });
    });

    it('Should NOT return sensitive details of the Regular User', (done) => {
      client.post('/api/users')
      .send(testData.regularUser1)
      .end((error, response) => {
        expect(response.body.user).to.not.have.property('password');
        //deleteUser(testData.regularUser1.email);
        done();
      });
    });

    it(`Should make a user role be regular by default if no roleId
      is supplied`, (done) =>{
      expect(testData.testUser.roleId).to.be.undefined;
      client.post('/api/users')
      .send(testData.testUser)
      .end((error, response) => {
        expect(response.body.user.roleId).to.not.be.undefined;
        expect(response.body.user.roleId).to.equal(2);
        deleteUser(testData.testUser.email);
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
        deleteUser(testData.adminUser.email);
        done();
      });
    });


    it(`Should return a TOKEN 
      if an Admin User is successfully created`, (done) => {
      client.post('/api/users')
      .send(testData.adminUser)
      .end((error, response) => {
        expect(response.body.user).to.have.property('token');
        deleteUser(testData.adminUser.email);
        done();
      });
    });

    it(`Should return only necessary
      details of the created Admin user`, (done) => {
      client.post('/api/users')
      .send(testData.adminUser)
      .end((error, response) => {
        expect(response.body.user).to.have.property('firstName');
        expect(response.body.user).to.have.property('lastName');
        expect(response.body.user).to.have.property('email');
        deleteUser(testData.adminUser.email);
        done();
      });
    });

    it('Should NOT return sensitive details of the Admin user', (done) => {
      client.post('/api/users')
      .send(testData.adminUser)
      .end((error, response) => {
        expect(response.body.user).to.not.have.property('password');
        deleteUser(testData.adminUser.email);
        done();
      });
    });

    it('Admin user roleId should be 1', (done) => {
      expect(testData.adminUser.roleId).to.not.be.undefined;
      expect(testData.adminUser.roleId).to.equal(1);
      client.post('/api/users')
      .send(testData.adminUser)
      .end((error, response) => {
        expect(response.body.user.roleId).to.not.be.undefined;
        expect(response.body.user.roleId).to.equal(1);
        // deleteUser(testData.adminUser.email);
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
});