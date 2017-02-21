import supertest from 'supertest';
import chai from 'chai';
import app from '../server';
import testData from './helpers/SpecHelper';
import database from '../models';

const expect = chai.expect;
const client = supertest.agent(app);

const adminUser = testData.adminUserForDocumentTest;
const regularUser = testData.regularUserForDocumentTest;
const regularUser2 = testData.regularUserForDocumentTest2;

const privateDocumentData = {};
const publicDocumentData = {};
const roleDocumentData = {};
const fetchLimit = 10;

describe('Documents:', () => {
  // lets create neccessary users for these tests and get their details
  let regularUserToken, regularUserId, adminUserToken, adminUserId,
    regularUser2Id, regularUser2Token;
  before((done) => {
    client.post('/api/users')
    .send(adminUser)
    .end((error, response) => {
      adminUserToken = response.body.user.token;
      adminUserId = response.body.user.id;
      client.post('/api/users')
      .send(regularUser)
      .end((error1, response1) => {
        regularUserToken = response1.body.user.token;
        regularUserId = response1.body.user.id;
        client.post('/api/users')
        .send(regularUser2)
        .end((error2, response2) => {
          regularUser2Token = response2.body.user.token;
          regularUser2Id = response2.body.user.id;
          done();
        });
      });
    });
  });

  describe('Post', () => {
    it('should create a new document with a Creation date defined',
    (done) => {
      const document = testData.documentPublic1;
      client.post('/api/documents')
      .send(document)
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.body.success).to.equal(true);
        expect(response.body.document.createdAt).to.not.be.undefined;
        done();
      });
    });

    it(`should allow only a user with valid authentication token create a new 
    document`, (done) => {
      const document = testData.documentRole1;
      client.post('/api/documents')
      .send(document)
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.body.success).to.equal(true);
        expect(response.status).to.equal(201);
        done();
      });
    });

    it(`should NOT allow a user with Invalid authentication token create a new 
    document`, (done) => {
      const document = testData.documentRole1;
      client.post('/api/documents')
      .send(document)
      .set({ 'x-access-token': 'invalid token' })
      .end((error, response) => {
        expect(response.body.success).to.equal(false);
        expect(response.status).to.equal(401);
        done();
      });
    });

    it(`should NOT allow creation of a Document if required attributes
    are missing`, (done) => {
      client.post('/api/documents')
      .send(testData.documentInvalid)
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.body.success).to.equal(false);
        expect(response.status).to.equal(400);
        done();
      });
    });

    it(`should set the newly created Document access to the default access
    ('public') if no access is specified`, (done) => {
      client.post('/api/documents')
      .send(testData.documentNoAccess)
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        if (error) {
          return done();
        }
        expect(response.body.success).to.equal(true);
        expect(response.body.document.access).to.equal('public');
        done();
      });
    });

    it('should create a new document with a UPDATE date defined', (done) => {
      const document = testData.documentPublic1;
      client.post('/api/documents')
      .send(document)
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.body.document.updatedAt).to.not.be.undefined;
        done();
      });
    });
  });

  describe('GET', () => {
    before((done) => {
      privateDocumentData.document = testData.documentPrivate1;
      privateDocumentData.ownerToken = regularUserToken;
      // fetch data for documents
      client.post('/api/documents')
      .send(privateDocumentData.document)
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        // private document
        privateDocumentData.id = response.body.document.id;
        // public document
        publicDocumentData.document = testData.documentPublic1;
        publicDocumentData.ownerToken = regularUserToken;
        client.post('/api/documents')
        .send(publicDocumentData.document)
        .set({ 'x-access-token': regularUserToken })
        .end((error1, response1) => {
          roleDocumentData.id = response1.body.document.id;
          // role document
          roleDocumentData.document = testData.documentRole1;
          roleDocumentData.ownerToken = regularUserToken;
          client.post('/api/documents')
          .send(roleDocumentData.document)
          .set({ 'x-access-token': regularUserToken })
          .end((error2, response2) => {
            roleDocumentData.id = response2.body.document.id;
            done();
          });
        });
      });
    });

    it(`should allow the creator of a private document access to the
      document`, (done) => {
      client.get(`/api/documents/${privateDocumentData.id}`)
      .set({ 'x-access-token': privateDocumentData.ownerToken })
      .end((error, response) => {
        expect(response.body.success).to.equal(true);
        expect(response.status).to.equal(200);
        expect(response.body.document).to.not.be.undefined;
        expect(response.body.document.title)
          .to.equal(privateDocumentData.document.title);
        expect(response.body.document.content)
          .to.equal(privateDocumentData.document.content);
        done();
      });
    });
    it(`should allow a document with access set to 'private'
    be accessible by Admin users`, (done) => {
      client.get(`/api/documents/${privateDocumentData.id}`)
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.body.success).to.equal(true);
        expect(response.status).to.equal(200);
        expect(response.body.document).to.not.be.undefined;
        expect(response.body.document.title)
          .to.equal(privateDocumentData.document.title);
        expect(response.body.document.content)
          .to.equal(privateDocumentData.document.content);
        done();
      });
    });

    it(`should NOT allow a document with access set to 'private'
    be accessible by other Non-Admin users`, (done) => {
      client.get(`/api/documents/${privateDocumentData.id}`)
      .set({ 'x-access-token': regularUser2Token })
      .end((error, response) => {
        expect(response.body.success).to.equal(false);
        expect(response.status).to.equal(403);
        done();
      });
    });

    it(`should allow a document with access set to 'role' be accessible
    by other authenticated users with same role status as the document owner`,
    (done) => {
      client.get(`/api/documents/${roleDocumentData.id}`)
      .set({ 'x-access-token': regularUser2Token })
      .end((error, response) => {
        expect(response.body.success).to.equal(true);
        expect(response.status).to.equal(200);
        expect(response.body.document).to.not.be.undefined;
        expect(response.body.document.title)
          .to.equal(roleDocumentData.document.title);
        expect(response.body.document.content)
          .to.equal(roleDocumentData.document.content);
        done();
      });
    });

    it(`should allow only an Admin User with valid authentication token access
    to all documents regardless of the document access status`, (done) => {
      client.get('/api/documents')
      .set({ 'x-access-token': adminUserToken })
      .end((error, response) => {
        expect(response.body.success).to.equal(true);
        expect(response.status).to.equal(200);
        const documents = response.body.documents;
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
      .set({ 'x-access-token': regularUserToken })
      .end((error, response) => {
        expect(response.body.success).to.equal(true);
        expect(response.status).to.equal(200);
        const documents = response.body.documents;
        documents.forEach((document) => {
          expect(document.access).to.be.oneOf(['role', 'private', 'public']);
          // ensure only this user private documents are returned
          if (document.access === 'private') {
            expect(document.ownerId).to.equal(regularUserId);
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
        expect(response.body.success).to.equal(false);
        expect(response.status).to.equal(401);
        expect(response.body.documents).to.be.undefined;
        done();
      });
    });
  });

  describe('Put', () => {
    it('should allow the owner of a document update the document', (done) => {
      const titleUpdate = 'title Update for this document';
      client.put(`/api/documents/${privateDocumentData.id}`)
      .set({'x-access-token': privateDocumentData.ownerToken})
      .send({title: titleUpdate})
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.success).to.equal(true);
        done();
      });
    });

    it('should NOT allow update of a document belonging to another user',
    (done) => {
      const titleUpdate = 'title Update for this document again';
      client.put(`/api/documents/${privateDocumentData.id}`)
      .set({'x-access-token': regularUser2Token})
      .send({title: titleUpdate})
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.success).to.equal(false);
        done();
      });
    });
    
  });
});

