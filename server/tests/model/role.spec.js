import { expect } from 'chai';
import database from '../../models';
import SpecHelper from '../helpers/SpecHelper';

const roleDB = database.Role;

describe('Role Model', () => {
  // clean our database before running the tests
  before((done) => {
    database.sequelize.sync({ force: true })
    .then(() => {
      done();
    });
  });

  after((done) => {
    database.sequelize.sync({ force: true })
    .then(() => {
      done();
    });
  });

  describe('Create Role', () => {
    it('should allow creation of a new valid role', (done) => {
      const role = SpecHelper.validAdminRole;
      roleDB.create(role)
      .then((createdRole) => {
        expect(createdRole).to.be.instanceof(Object);
        expect(createdRole.title).to.equal(role.title);
        done();
      });
    });

    it('should throw an error when trying to create an Invalid role',
    (done) => {
      const role = {};
      roleDB.create(role)
      .catch((error) => {
        expect(error).to.be.instanceof(Object);
        expect(error.errors).to.be.instanceOf(Array);
        done();
      });
    });

    it('should throw an error when trying to create Role with duplicate title',
    (done) => {
      const role = SpecHelper.validAdminRole;
      roleDB.create(role)
      .catch((error) => {
        expect(error).to.be.instanceof(Object);
        expect(error.errors).to.be.instanceOf(Array);
        done();
      });
    });
  });

  describe('Update Role', () => {
    // insert a valid role to get a valid
    let testRole;
    before((done) => {
      roleDB.create(SpecHelper.validRegularRole)
      .then((createdRole) => {
        testRole = createdRole;
        done();
      });
    });

    it('should allow update of a non-duplicate role title',
    (done) => {
      const roleUpdate = SpecHelper.newRecordFromBase(
        {},
        { title: 'guest' }
      );
      roleDB.update(roleUpdate, {
        where: { id: testRole.id }
      })
      .then(() => {
        roleDB.findById(testRole.id)
        .then((foundRole) => {
          expect(foundRole.title).to.equal(roleUpdate.title);
          done();
        });
      });
    });

    it('should NOT allow update resulting in duplicate role title',
    (done) => {
      const roleUpdate = SpecHelper.validAdminRole;
      roleDB.update(roleUpdate, {
        where: { id: testRole.id }
      })
      .catch((error) => {
        expect(error).to.be.instanceof(Object);
        expect(error.errors).to.be.instanceof(Array);
        done();
      });
    });
  });

  describe('Read Role', () => {
    // insert a valid role to get a valid
    let testRole;
    before((done) => {
      const newRole = SpecHelper.newRecordFromBase(
        SpecHelper.validRegularRole,
        { title: 'readrole' }
      );
      roleDB.create(newRole)
      .then((createdRole) => {
        testRole = createdRole;
        done();
      });
    });

    it('should return all Roles as an array', (done) => {
      roleDB.findAll()
      .then((foundRoles) => {
        expect(foundRoles).to.be.instanceOf(Array);
        done();
      });
    });

    it('should return a Role specified by id', (done) => {
      roleDB.findById(testRole.id)
      .then((foundRole) => {
        expect(foundRole).to.be.instanceOf(Object);
        expect(foundRole.title).to.equal(testRole.title);
        done();
      });
    });
  });

  describe('Delete Role', () => {
    let testRole;
    before((done) => {
      const role = SpecHelper.newRecordFromBase(
        SpecHelper.validRegularRole,
        { title: 'deleteuserrole' }
      );
      roleDB.create(role)
      .then((createdRole) => {
        testRole = createdRole;
        done();
      });
    });

    it('should allow deletion of an existing role', (done) => {
      roleDB.destroy({
        where: { id: testRole.id }
      })
      .then((rowsDeleted) => {
        expect(rowsDeleted).to.equal(1);
        done();
      });
    });

    it('should NOT allow deletion of a Non-existing role', (done) => {
      roleDB.destroy({
        where: { id: 100 }
      })
      .then((rowsDeleted) => {
        expect(rowsDeleted).to.be.equal(0);
        done();
      });
    });
  });
});
