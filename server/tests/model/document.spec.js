import { expect } from 'chai';
import database from '../../models';
import SeedHelper from '../helpers/SeedHelper';
import SpecHelper from '../helpers/SpecHelper';

const documentDB = database.Document;

describe('Document Model: ', () => {
  // clear our DB and insert our default roles and user constraints
  before((done) => {
    database.sequelize.sync({ force: true })
    .then(() => SeedHelper.populateRoleTable())
    .then(() => {
      SeedHelper.populateUserTable();
      done();
    });
  });

  after((done) => {
    database.sequelize.sync({ force: true })
    .then(() => {
      done();
    });
  });

  describe('Create Document', () => {
    it('should allow proper creation of a valid public access document',
    (done) => {
      const document = SpecHelper.validPublicDocument;
      documentDB.create(document)
      .then((createdDocument) => {
        expect(createdDocument.title).to.equal(document.title);
        expect(createdDocument.ownerId).to.equal(document.ownerId);
        expect(createdDocument.content).to.equal(document.content);
        expect(createdDocument.access).to.equal(document.access);
        done();
      });
    });

    it('should throw validation error for a document without a valid title',
    (done) => {
      const document = SpecHelper.newRecordFromBase(
        SpecHelper.validPublicDocument,
        { title: null }
      );
      documentDB.create(document)
      .catch((error) => {
        expect(error).to.be.instanceOf(Object);
        expect(error.errors).to.be.instanceOf(Array);
        done();
      });
    });

    it('should throw validation error for a document without a valid content',
    (done) => {
      const document = Object.assign({},
        SpecHelper.validPublicDocument,
        { content: null });
      documentDB.create(document)
      .catch((error) => {
        expect(error).to.be.instanceOf(Object);
        expect(error.errors).to.be.instanceOf(Array);
        done();
      });
    });

    it('should throw validation error for a document without a valid access',
    (done) => {
      const document = Object.assign({},
        SpecHelper.validPublicDocument,
        { access: null });
      documentDB.create(document)
      .catch((error) => {
        expect(error).to.be.instanceOf(Object);
        expect(error.errors).to.be.instanceOf(Array);
        done();
      });
    });

    it('should throw validation error for a document set to an UNKNOWN access',
    (done) => {
      const document = Object.assign({},
        SpecHelper.validPublicDocument,
        { access: 'guest' });
      documentDB.create(document)
      .catch((error) => {
        expect(error).to.be.instanceOf(Object);
        expect(error.errors).to.be.instanceOf(Array);
        done();
      });
    });

    it('should allow proper creation of a valid private access document',
    (done) => {
      const document = SpecHelper.validPrivateDocument;
      documentDB.create(document)
      .then((createdDocument) => {
        expect(createdDocument.title).to.equal(document.title);
        expect(createdDocument.ownerId).to.equal(document.ownerId);
        expect(createdDocument.content).to.equal(document.content);
        expect(createdDocument.access).to.equal(document.access);
        done();
      });
    });

    it('should allow proper creation of a valid role access document',
    (done) => {
      const document = SpecHelper.validRoleDocument;
      documentDB.create(document)
      .then((createdDocument) => {
        expect(createdDocument.title).to.equal(document.title);
        expect(createdDocument.ownerId).to.equal(document.ownerId);
        expect(createdDocument.content).to.equal(document.content);
        expect(createdDocument.access).to.equal(document.access);
        done();
      });
    });
  });

  describe('Update Document', () => {
    // we need to get a valid document id by inserting a new document
    let testDocument;
    before((done) => {
      const document = SpecHelper.newRecordFromBase(
        SpecHelper.validPublicDocument3,
        { title: 'Update Test Document' }
      );
      documentDB.create(document)
      .then((createdDocument) => {
        testDocument = createdDocument;
        done();
      });
    });

    it('should allow update of a document title attribute', (done) => {
      const baseDocument = SpecHelper.validPublicDocument3;
      const documentUpdate = SpecHelper.newRecordFromBase(
        baseDocument,
        { title: 'new Title' }
      );

      documentDB.update(documentUpdate, {
        where: { id: testDocument.id }
      })
      .then(() => {
        documentDB.findById(testDocument.id)
        .then((foundDocument) => {
          expect(foundDocument.title).to.equal(documentUpdate.title);
          done();
        });
      });
    });

    it('should allow update of a document content attribute', (done) => {
      const baseDocument = SpecHelper.validPublicDocument3;
      const documentUpdate = SpecHelper.newRecordFromBase(
        baseDocument,
        { content: 'new content' }
      );

      documentDB.update(documentUpdate, {
        where: { id: testDocument.id }
      })
      .then(() => {
        documentDB.findById(testDocument.id)
        .then((foundDocument) => {
          expect(foundDocument.content).to.equal(documentUpdate.content);
          done();
        });
      });
    });

    it('should allow update of a document access attribute to a valid access',
    (done) => {
      const baseDocument = SpecHelper.validPublicDocument3;
      const documentUpdate = SpecHelper.newRecordFromBase(
        baseDocument,
        { content: 'private' }
      );

      documentDB.update(documentUpdate, {
        where: { id: testDocument.id }
      })
      .then(() => {
        documentDB.findById(testDocument.id)
        .then((foundDocument) => {
          expect(foundDocument.access).to.equal(documentUpdate.access);
          done();
        });
      });
    });
  });

  describe('Delete Document', () => {
    let testDocument;
    before((done) => {
      const document = SpecHelper.newRecordFromBase(
        SpecHelper.validPublicDocument2,
        { title: 'Delete Test Document' }
      );
      documentDB.create(document)
      .then((createdDocument) => {
        testDocument = createdDocument;
        done();
      });
    });

    it('should allow deletion of an existing document', (done) => {
      documentDB.destroy({
        where: { id: testDocument.id }
      })
      .then((rowsDeleted) => {
        expect(rowsDeleted).to.be.gt(0);
        done();
      });
    });

    it('should NOT allow deletion of a Non-existing document', (done) => {
      documentDB.destroy({
        where: { id: 100 }
      })
      .then((rowsDeleted) => {
        expect(rowsDeleted).to.be.equal(0);
        done();
      });
    });
  });

  describe('Read Documents', () => {
    let testDocument;
    before((done) => {
      const document = SpecHelper.newRecordFromBase(
        SpecHelper.validPublicDocument1,
        { title: 'Read Test Document' }
      );
      documentDB.create(document)
      .then((createdDocument) => {
        testDocument = createdDocument;
        done();
      });
    });

    it('should return all documents as an array', (done) => {
      documentDB.findAll()
      .then((documents) => {
        expect(documents).to.be.instanceOf(Array);
        done();
      });
    });

    it('should return a document specified by id', (done) => {
      documentDB.findById(testDocument.id)
      .then((document) => {
        expect(document).to.be.instanceOf(Object);
        expect(document.title).to.equal(testDocument.title);
        expect(document.content).to.equal(testDocument.content);
        expect(document.access).to.equal(testDocument.access);
        done();
      });
    });

    it('should NOT return a document if the specified id does not exist',
    (done) => {
      documentDB.findById(1000)
      .then((document) => {
        expect(document).to.equal(null);
        done();
      });
    });
  });
});
