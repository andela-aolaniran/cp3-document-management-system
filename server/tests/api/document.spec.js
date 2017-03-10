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
        adminUser.id = response.body.id;
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
    it('should create a new Document with a Creation date defined',
    (done) => {
      const publicDocument = SpecHelper.generateRandomDocument('public');
      client.post('/api/documents')
      .send(publicDocument)
      .set({ 'x-access-token': regularUser1.token })
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body.createdAt).to.not.equal(undefined);
        done();
      });
    });

    it(`should return a 400 status code (bad request) if a user tries to create a
    new document with the document ID is specified`,
    (done) => {
      const publicDocument = SpecHelper.generateRandomDocument('public');
      publicDocument.id = 1;
      client.post('/api/documents')
      .send(publicDocument)
      .set({ 'x-access-token': regularUser1.token })
      .end((error, response) => {
        expect(response.status).to.equal(400);
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

    it('should NOT create a document with an invalid access type',
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

    // our duplicate document
    let duplicateDocument;
    it(`should set the newly created Document access to the default access
    ('public') if no access is specified`, (done) => {
      const defaultDocument = SpecHelper.generateRandomDocument();
      duplicateDocument = defaultDocument;
      client.post('/api/documents')
      .send(defaultDocument)
      .set({ 'x-access-token': regularUser1.token })
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body.access).to.equal('public');
        done();
      });
    });

    it(`should not allow creation of duplicate document with respect to the
    document owner, title, and content`, (done) => {
      client.post('/api/documents')
      .send(duplicateDocument)
      .set({ 'x-access-token': regularUser1.token })
      .end((error, response) => {
        expect(response.status).to.equal(409);
        expect(response.body.access).to.equal(undefined);
        done();
      });
    });
  });

  describe('GET Documents', () => {
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

    it(`should allow a authenticated user fetch only documents of another 
    user which he has appropriate access right to`,
    (done) => {
      client.get(`/api/users/${3}/documents`)
      .set({ 'x-access-token': regularUser3.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        response.body.documents.forEach((document) => {
          expect(document.role).to.not.equal('private');
        });
        done();
      });
    });

    it(`should allow should return a 404 status when a user tries
    to fetch documents for a specified non-existing user by id`,
    (done) => {
      client.get(`/api/users/${3000}/documents`)
      .set({ 'x-access-token': regularUser3.token })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });

    it(`should allow a authenticated Admin user fetch all documents of another 
    user regardless of the document access type(public, private, role)`,
    (done) => {
      client.get(`/api/users/${3}/documents`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        response.body.documents.forEach((document) => {
          expect(document.access).to.be.oneOf(['private', 'role', 'public']);
        });
        done();
      });
    });

    it(`should NOT return any documents for a valid User who owns no documents
    but tries to fetch all his/her documents`,
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
          expect(response1.status).to.equal(200);
          expect(response1.body.documents.length).to.be.equal(0);
          done();
        });
      });
    });

    it(`should allow a user request for all documents belonging to another
    specific user excluding the user(owner) private documents`,
    (done) => {
      client.get(`/api/users/${regularUser2.id}/documents`)
      .set({ 'x-access-token': regularUser1.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        response.body.documents.forEach((document) => {
          expect(document.access).to.be.oneOf(['public', 'role']);
        });
        done();
      });
    });

    it(`should allow a document with access set to 'private'
    be accessible by an admin User`, (done) => {
      client.get(`/api/documents/${privateDocument.id}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.title)
          .to.equal(privateDocument.title);
        expect(response.body.content)
          .to.equal(privateDocument.content);
        expect(response.body.access)
          .to.equal('private');
        expect(response.body.ownerId)
          .to.not.equal(adminUser.id);
        done();
      });
    });

    it('should allow specifying offset when fetching documents', (done) => {
      const searchOffset = 3;
      client.get(`/api/documents/?offset=${searchOffset}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.instanceof(Object);
        done();
      });
    });

    it(`should handle invalid offsets specified when fetching users
    and return a 400 (bad request) status code`,
    (done) => {
      const invalidSearchOffset = -1;
      client.get(`/api/documents/?offset=${invalidSearchOffset}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it(`should NOT allow a document with access set to 'private'
    be accessible by other authenticated Non-Admin users`, (done) => {
      // private document is owned by regularUser1
      client.get(`/api/documents/${privateDocument.id}`)
      .set({ 'x-access-token': regularUser3.token })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        expect(response.body.title).to.equal(undefined);
        done();
      });
    });

    it(`should allow a Document with access set to 'role' be accessible
    by other authenticated Users with same role status as the Document owner`,
    (done) => {
      // role document is owned by regularUser3
      client.get(`/api/documents/${roleDocument.id}`)
      .set({ 'x-access-token': regularUser1.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.ownerId).to.not.equal(regularUser1.id);
        expect(response.body.access).to.equal('role');
        done();
      });
    });

    it(`should Return a 404 status code when a User with proper access
    rights tries to fetch a Document that does NOT exist`,
    (done) => {
      // Non-existing document
      client.get(`/api/documents/${3000}`)
      .set({ 'x-access-token': regularUser1.token })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });

    it(`should allow only an Admin User with valid authentication token access
    to all Documents regardless of the Documents access status`, (done) => {
      client.get('/api/documents')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        const data = response.body;
        data.documents.forEach((document) => {
          expect(document.access).to.be.oneOf(['role', 'private', 'public']);
        });
        done();
      });
    });

    it(`should allow a regular User with valid authentication token access to
    only all documents with access set as public, the User role and only the User
    private Documents`,
    (done) => {
      client.get('/api/documents')
      .set({ 'x-access-token': regularUser1.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        const data = response.body;
        data.documents.forEach((document) => {
          expect(document.access).to.be.oneOf(['role', 'private', 'public']);
          // ensure only this user private documents are returned
          if (document.access === 'private') {
            expect(document.ownerId).to.equal(regularUser1.id);
          }
        });
        done();
      });
    });

    it(`should NOT allow any User without valid authentication token
    fetch Documents`, (done) => {
      client.get('/api/documents')
      .set({ 'x-access-token': 'invalid token' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });
  });

  describe('Update Document', () => {
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

    it('should allow the owner of a Document update the Document', (done) => {
      const titleUpdate = 'title Update for this document';
      client.put(`/api/documents/${privateDocument.id}`)
      .set({ 'x-access-token': privateDocument.owner.token })
      .send({ title: titleUpdate })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it(`should NOT allow a regular User update a Document belonging to
    another User`,
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

    it(`should allow admin User update a Document belonging to
    another User`,
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

    it(`should NOT allow Admin user update a document that does
    not exist`,
    (done) => {
      const titleUpdate = 'title Update by an Admin';
      client.put('/api/documents/1000')
      .set({ 'x-access-token': adminUser.token })
      .send({ title: titleUpdate })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });
  });

  describe('Delete Document', () => {
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

    it(`should NOT allow the owner of a Document with INVALID token delete the
    Document`, (done) => {
      client.delete(`/api/documents/${privateDocument.id}`)
      .set({ 'x-access-token': 'invalid token' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it(`should NOT allow User with valid token delete a document belonging
    to another User`,
    (done) => {
      client.delete(`/api/documents/${publicDocument.id}`)
      .set({ 'x-access-token': privateDocument.owner.token })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it(`should allow the owner of a Document with valid token delete the
    Document`, (done) => {
      client.delete(`/api/documents/${roleDocument.id}`)
      .set({ 'x-access-token': roleDocument.owner.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it(`should return status code 404 (NOT Found) when a user with proper
    access rights tries to delete a document that does NOT exist`,
    (done) => {
      client.delete(`/api/documents/${roleDocument.id}`)
      .set({ 'x-access-token': roleDocument.owner.token })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });
  });
});
