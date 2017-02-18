import supertest from 'supertest';
import chai from 'chai';
import app from '../server';
import testData from './helpers/SpecHelper';
import database from '../models';

const expect = chai.expect;
const client = supertest.agent(app);

let adminUserToken, adminUserId;
const testDocument = testData.documentPublic1;
describe('Search', () => {
  const adminUser = testData.adminUserSearch;
  before((done) => {
    client.post('/api/users')
    .send(adminUser)
    .end((error, response) => {
      adminUserToken = response.body.user.token;
      adminUserId = response.body.user.id;
      client.post('/api/documents')
      .set({ 'x-access-token': adminUserToken })
      .send(testDocument)
      .end(() => {
        done();
      });
    });
  });

  it('should return documents limited by a specified number', (done) => {
    const searchLimit = 3;
    client.get(`/api/documents/?limit=${searchLimit}`)
    .set({ 'x-access-token': adminUserToken })
    .end((error, response) => {
      expect(response.status).to.equal(200);
      expect(response.body.documents.length).to.equal(searchLimit);
      done();
    });
  });

  it('should return documents ordered by published date in descending order',
  (done) => {
    client.get('/api/documents/')
    .set({ 'x-access-token': adminUserToken })
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

  it('should return only documents that match a specific query', (done) => {
    const searchText = testDocument.title.split(/\s/)[0];
    client.get(`/api/documents/?search=${searchText}`)
    .set({ 'x-access-token': adminUserToken })
    .end((error, response) => {
      expect(response.status).to.equal(200);
      response.body.documents.forEach((document) => {
        expect(document.title).to.contain(searchText) ||
        expect(document.content).to.contain(searchText);
      });
      done();
    });
  });
});
