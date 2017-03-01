import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../config/server';
import SpecHelper from '../helpers/SpecHelper';
import SeedHelper from '../helpers/SeedHelper';

const client = supertest.agent(app);

describe('Documents:', () => {
  const adminUser = SpecHelper.validAdminUser;
  const regularUser1 = SpecHelper.generateRandomUser(2);
  const regularUser2 = SpecHelper.generateRandomUser(2);
  const regularUser3 = SpecHelper.generateRandomUser(2);
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
        // fetch regularUser1 details
        client.post('/api/users')
        .send(regularUser1)
        .end((error1, response1) => {
          regularUser1.token = response1.body.token;
          regularUser1.id = response1.body.id;
          // fetch regularUser2 details
          client.post('/api/users')
          .send(regularUser2)
          .end((error2, response2) => {
            regularUser2.token = response2.body.token;
            regularUser2.id = response2.body.id;
            client.post('/api/users')
            .send(regularUser3)
            .end((error3, response3) => {
              regularUser3.token = response3.body.token;
              regularUser3.id = response3.body.id;
              done();
            });
          });
        });
      });
    });
  });

  describe('Post', () => {
    it('should create a new document with a Creation date defined',
    (done) => {
      const publicDocument = SpecHelper.generateRandomDocument('public');
      client.post('/api/documents')
      .send(publicDocument)
      .set({ 'x-access-token': regularUser1.token })
      .end((error, response) => {
        expect(response.status).to.equal(201);
        done();
      });
    });

    it(`should allow only a user with valid authentication token create a new
    document`, (done) => {
      const roleDocument = SpecHelper.generateRandomDocument('role');
      client.post('/api/documents')
      .send(roleDocument)
      .set({ 'x-access-token': regularUser1.token })
      .end((error, response) => {
        expect(response.status).to.equal(201);
        done();
      });
    });

    it('should NOT create a document with an invalid access status',
    (done) => {
      const roleDocument = SpecHelper.generateRandomDocument('role');
      roleDocument.access = 'privatee';
      client.post('/api/documents')
      .send(roleDocument)
      .set({ 'x-access-token': regularUser1.token })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it(`should NOT allow a user with Invalid authentication token create a new
    document`, (done) => {
      const publicDocument = SpecHelper.generateRandomDocument('public');
      client.post('/api/documents')
      .send(publicDocument)
      .set({ 'x-access-token': 'invalid token' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it(`should NOT allow creation of a Document if required attributes
    are missing`, (done) => {
      client.post('/api/documents')
      .send({})
      .set({ 'x-access-token': regularUser1.token })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it(`should set the newly created Document access to the default access
    ('public') if no access is specified`, (done) => {
      const defaultDocument = SpecHelper.generateRandomDocument();
      client.post('/api/documents')
      .send(defaultDocument)
      .set({ 'x-access-token': regularUser1.token })
      .end((error, response) => {
        expect(response.body.access).to.equal('public');
        done();
      });
    });
  });

  describe('GET', () => {
    // initialize documents neeeded of this test suite
    const privateDocument = SpecHelper.generateRandomDocument('private');
    const publicDocument = SpecHelper.generateRandomDocument('public');
    const roleDocument = SpecHelper.generateRandomDocument('role');
    // set documents data needed from the server
    before((done) => {
      privateDocument.owner = regularUser1;
      // fetch data for private document
      client.post('/api/documents')
      .send(privateDocument)
      .set({ 'x-access-token': privateDocument.owner.token })
      .end((error, response) => {
        privateDocument.id = response.body.id;
        // fetch data for public document
        publicDocument.owner = regularUser2;
        client.post('/api/documents')
        .send(publicDocument)
        .set({ 'x-access-token': publicDocument.owner.token })
        .end((error1, response1) => {
          publicDocument.id = response1.body.id;
          // fetch data for role document
          roleDocument.owner = regularUser3;
          client.post('/api/documents')
          .send(roleDocument)
          .set({ 'x-access-token': roleDocument.owner.token })
          .end((error2, response2) => {
            roleDocument.id = response2.body.id;
            done();
          });
        });
      });
    });

    it(`should allow the creator of a private document access to the
      document`, (done) => {
      client.get(`/api/documents/${privateDocument.id}`)
      .set({ 'x-access-token': privateDocument.owner.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.title)
          .to.equal(privateDocument.title);
        expect(response.body.content)
          .to.equal(privateDocument.content);
        done();
      });
    });

    it('should allow a authenticated user fetch only All his/her documents',
    (done) => {
      client.get(`/api/users/${regularUser3.id}/documents`)
      .set({ 'x-access-token': regularUser3.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        response.body.forEach((document) => {
          expect(document.ownerId).to.equal(regularUser3.id);
        });
        done();
      });
    });

    it(`should NOT return any documents for a user who owns no documents
    but tries to fetch all his documents`,
    (done) => {
      // lets create a user without any document
      const noDocumentsUser = SpecHelper.generateRandomUser();
      client.post('/api/users')
      .send(noDocumentsUser)
      .end((error, response) => {
        noDocumentsUser.id = response.body.id;
        noDocumentsUser.token = response.body.token;
        // check the test now
        client.get(`/api/users/${noDocumentsUser.id}/documents`)
        .set({ 'x-access-token': noDocumentsUser.token })
        .end((error1, response1) => {
          expect(response1.status).to.equal(404);
          done();
        });
      });
    });

    it(`should NOT allow a user request for all documents belonging to a
    specific user`,
    (done) => {
      client.get(`/api/users/${regularUser2.id}/documents`)
      .set({ 'x-access-token': regularUser1.token })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it(`should allow a document with access set to 'private'
    be accessible by Admin users`, (done) => {
      client.get(`/api/documents/${privateDocument.id}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.title)
          .to.equal(privateDocument.title);
        expect(response.body.content)
          .to.equal(privateDocument.content);
        done();
      });
    });

    it(`should NOT allow a document with access set to 'private'
    be accessible by other Non-Admin users`, (done) => {
      // private document is owned by regularUser1
      client.get(`/api/documents/${privateDocument.id}`)
      .set({ 'x-access-token': regularUser3.token })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it(`should allow a document with access set to 'role' be accessible
    by other authenticated users with same role status as the document owner`,
    (done) => {
      // role document is owned by regularUser3
      client.get(`/api/documents/${roleDocument.id}`)
      .set({ 'x-access-token': regularUser1.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.title)
          .to.equal(roleDocument.title);
        expect(response.body.content)
          .to.equal(roleDocument.content);
        done();
      });
    });

    it(`should allow only an Admin User with valid authentication token access
    to all documents regardless of the document access status`, (done) => {
      client.get('/api/documents')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        const documents = response.body;
        documents.forEach((document) => {
          expect(document.access).to.be.oneOf(['role', 'private', 'public']);
        });
        done();
      });
    });

    it(`should allow a regular User with valid authentication token access to
    only all documents with roles set as public, his current role and only his
    private documents`,
    (done) => {
      client.get('/api/documents')
      .set({ 'x-access-token': regularUser1.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        const documents = response.body;
        documents.forEach((document) => {
          expect(document.access).to.be.oneOf(['role', 'private', 'public']);
          // ensure only this user private documents are returned
          if (document.access === 'private') {
            expect(document.ownerId).to.equal(regularUser1.id);
          }
        });
        done();
      });
    });

    it(`should NOT allow any user without valid authentication token
    fetch documents`, (done) => {
      client.get('/api/documents')
      .set({ 'x-access-token': 'invalid token' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });
  });

  describe('Put', () => {
    // initialize documents neeeded of this test suite
    const privateDocument = SpecHelper.generateRandomDocument('private');
    const publicDocument = SpecHelper.generateRandomDocument('public');
    const roleDocument = SpecHelper.generateRandomDocument('role');
    // set documents data needed from the server
    before((done) => {
      privateDocument.owner = regularUser1;
      // fetch data for private document
      client.post('/api/documents')
      .send(privateDocument)
      .set({ 'x-access-token': privateDocument.owner.token })
      .end((error, response) => {
        privateDocument.id = response.body.id;
        // fetch data for public document
        publicDocument.owner = regularUser2;
        client.post('/api/documents')
        .send(publicDocument)
        .set({ 'x-access-token': publicDocument.owner.token })
        .end((error1, response1) => {
          publicDocument.id = response1.body.id;
          // fetch data for role document
          roleDocument.owner = regularUser3;
          client.post('/api/documents')
          .send(roleDocument)
          .set({ 'x-access-token': roleDocument.owner.token })
          .end((error2, response2) => {
            roleDocument.id = response2.body.id;
            done();
          });
        });
      });
    });

    it('should allow the owner of a document update the document', (done) => {
      const titleUpdate = 'title Update for this document';
      client.put(`/api/documents/${privateDocument.id}`)
      .set({ 'x-access-token': privateDocument.owner.token })
      .send({ title: titleUpdate })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it(`should NOT allow regular user update a document belonging to
    another user`,
    (done) => {
      const titleUpdate = 'title Update for this document again';
      client.put(`/api/documents/${publicDocument.id}`)
      .set({ 'x-access-token': roleDocument.owner.token })
      .send({ title: titleUpdate })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it(`should allow Admin user update a document belonging to
    another user`,
    (done) => {
      const titleUpdate = 'title Update by an Admin';
      client.put(`/api/documents/${publicDocument.id}`)
      .set({ 'x-access-token': adminUser.token })
      .send({ title: titleUpdate })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });
  });

  describe('Delete', () => {
    // initialize documents neeeded of this test suite
    const privateDocument = SpecHelper.generateRandomDocument('private');
    const publicDocument = SpecHelper.generateRandomDocument('public');
    const roleDocument = SpecHelper.generateRandomDocument('role');
    // set documents data needed from the server
    before((done) => {
      privateDocument.owner = regularUser1;
      // fetch data for private document
      client.post('/api/documents')
      .send(privateDocument)
      .set({ 'x-access-token': privateDocument.owner.token })
      .end((error, response) => {
        privateDocument.id = response.body.id;
        // fetch data for public document
        publicDocument.owner = regularUser2;
        client.post('/api/documents')
        .send(publicDocument)
        .set({ 'x-access-token': publicDocument.owner.token })
        .end((error1, response1) => {
          publicDocument.id = response1.body.id;
          // fetch data for role document
          roleDocument.owner = regularUser3;
          client.post('/api/documents')
          .send(roleDocument)
          .set({ 'x-access-token': roleDocument.owner.token })
          .end((error2, response2) => {
            roleDocument.id = response2.body.id;
            done();
          });
        });
      });
    });

    it(`should NOT allow the owner of a document with INVALID token delete the
    document`, (done) => {
      client.delete(`/api/documents/${privateDocument.id}`)
      .set({ 'x-access-token': 'invalid token' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it(`should NOT allow user with valid token delete a document belonging
    to another user`,
    (done) => {
      client.delete(`/api/documents/${publicDocument.id}`)
      .set({ 'x-access-token': privateDocument.owner.token })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it(`should allow the owner of a document with valid token delete the
    document`, (done) => {
      client.delete(`/api/documents/${roleDocument.id}`)
      .set({ 'x-access-token': roleDocument.owner.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });
  });
});
