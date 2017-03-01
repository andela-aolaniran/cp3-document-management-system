import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../config/server';
import SpecHelper from '../helpers/SpecHelper';
import SeedHelper from '../helpers/SeedHelper';

const client = supertest.agent(app);

describe('Roles:', () => {
  const adminUser = SpecHelper.validAdminUser;
  const regularUser = SpecHelper.generateRandomUser(2);
  before((done) => {
    // lets get our regular and admin user data after clearing the db
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
        // fetch regular user details
        client.post('/api/users')
        .send(regularUser)
        .end((error1, response1) => {
          regularUser.token = response1.body.token;
          regularUser.id = response1.body.id;
          done();
        });
      });
    });
  });

  describe('Create Role', () => {
    const newRole = SpecHelper.generateRandomRole('guest');
    it('should allow an Admin user with VALID token create a Role',
    (done) => {
      client.post('/api/roles')
      .set({ 'x-access-token': adminUser.token })
      .send(newRole)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal(newRole.title);
        done();
      });
    });

    it(`should NOT allow an Admin user with VALID token create a
     DUPLICATE Role`,
    (done) => {
      client.post('/api/roles')
      .set({ 'x-access-token': adminUser.token })
      .send(newRole)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it(`should NOT allow an Admin user with VALID token create an
     Invalid Role`,
    (done) => {
      client.post('/api/roles')
      .set({ 'x-access-token': adminUser.token })
      .send({})
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it(`should NOT allow any User (Admin, Regular...) with an INVALID token
    create a Role`,
    (done) => {
      const testRole = SpecHelper.generateRandomRole('learner');
      client.post('/api/roles')
      .set({ 'x-access-token': 'invalid token' })
      .send(testRole)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it(`should NOT allow a NON-Admin User with a VALID token
    create a Role`,
    (done) => {
      const testRole = SpecHelper.generateRandomRole('new learner');
      client.post('/api/roles')
      .set({ 'x-access-token': regularUser.token })
      .send(testRole)
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });
  });

  describe('Update Role', () => {
    const newRole = SpecHelper.generateRandomRole('update');
    before((done) => {
      client.post('/api/roles')
      .send(newRole)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        // set our new role id
        newRole.id = response.body.id;
        done();
      });
    });
    it('should allow only an Admin user with VALID token UPDATE a Role',
    (done) => {
      const newTitle = 'new title';
      client.put(`/api/roles/${newRole.id}`)
      .set({ 'x-access-token': adminUser.token })
      .send({ title: newTitle })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(newTitle);
        done();
      });
    });

    it(`should NOT allow an Admin user with VALID token UPDATE a
    NON-EXISTENT Role`, (done) => {
      const newTitle = 'new title1';
      client.put(`/api/roles/${newRole.id + 300}`)
      .set({ 'x-access-token': adminUser.token })
      .send({ title: newTitle })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });

    it(`should NOT allow any User (Admin, Regular...) with an INVALID token
    UPDATE a Role`,
    (done) => {
      const newTitle = 'new title2';
      client.put(`/api/roles/${newRole.id}`)
      .set({ 'x-access-token': 'invalid token' })
      .send({ title: newTitle })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it(`should NOT allow a NON-Admin User with a VALID token
    UPDATE a Role`,
    (done) => {
      const newTitle = 'new title3';
      client.put(`/api/roles/${newRole.id}`)
      .set({ 'x-access-token': regularUser.token })
      .send({ title: newTitle })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });
  });

  describe('Get', () => {
    it('should allow an Admin User with VALID token get a specific Role',
    (done) => {
      client.get('/api/roles/2')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.instanceOf(Object);
        done();
      });
    });

    it(`should NOT allow an Admin User with VALID token get a specific Role
    that does NOT exist`,
    (done) => {
      client.get('/api/roles/9000')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });

    it(`should NOT allow a Non Admin User with VALID token
    get a specific Role`,
    (done) => {
      client.get('/api/roles/2')
      .set({ 'x-access-token': regularUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it('should NOT allow any un-authenticated user get a specific Role',
    (done) => {
      client.get('/api/roles/2')
      .set({ 'x-access-token': 'invalid token' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it('should allow an Admin User with VALID token get all Roles',
    (done) => {
      client.get('/api/roles')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.instanceOf(Array);
        done();
      });
    });

    it(`should NOT allow any User (Admin, Regular, ...) with an INVALID
    token to get all Roles`, (done) => {
      client.get('/api/roles')
      .set({ 'x-access-token': 'invalid token' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it('should NOT allow a Non-Admin User with VALID token get all Roles',
    (done) => {
      client.get('/api/roles')
      .set({ 'x-access-token': regularUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });
  });

  describe('Delete Role', () => {
    it('should NOT allow a Non-Admin User with VALID token delete a Role',
    (done) => {
      client.get('/api/roles/3')
      .set({ 'x-access-token': regularUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it('should allow an Admin user with VALID token delete a Role',
    (done) => {
      client.delete('/api/roles/3')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it(`should NOT allow an Admin user with VALID token delete a
    non-existing Role`, (done) => {
      client.delete('/api/roles/100')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });
  });
});
