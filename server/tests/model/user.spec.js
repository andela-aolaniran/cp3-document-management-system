import { expect } from 'chai';
import database from '../../models';
import SeedHelper from '../helpers/SeedHelper';
import SpecHelper from '../helpers/SpecHelper';

const userDB = database.User;

describe('User Model: ', () => {
  // clear our DB and insert our default roles and user constraints
  before((done) => {
    database.sequelize.sync({ force: true })
    .then(() => {
      SeedHelper.populateRoleTable();
    })
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

  describe('Create User', () => {
    it('should allow proper creation of a valid Regular User',
    (done) => {
      const user = SpecHelper.validRegularUser1;
      userDB.create(user)
      .then((createdUser) => {
        expect(user.firstName).to.equal(createdUser.firstName);
        expect(user.lastName).to.equal(createdUser.lastName);
        expect(user.email).to.equal(createdUser.email);
        expect(user.roleId).to.equal(createdUser.roleId);
        done();
      });
    });

    it('should throw validation error for a user without a valid firstName',
    (done) => {
      const user = SpecHelper.newRecordFromBase(
        SpecHelper.validRegularUser2,
        { firstName: null }
      );
      userDB.create(user)
      .catch((error) => {
        expect(error).to.be.instanceOf(Object);
        expect(error.errors).to.be.instanceOf(Array);
        done();
      });
    });

    it('should throw validation error for a user without a valid lastName',
    (done) => {
      const user = Object.assign({},
        SpecHelper.validRegularUser3,
        { lastName: null });
      userDB.create(user)
      .catch((error) => {
        expect(error).to.be.instanceOf(Object);
        expect(error.errors).to.be.instanceOf(Array);
        done();
      });
    });

    it('should throw validation error for a user without a valid roleId',
    (done) => {
      const user = Object.assign({},
        SpecHelper.validRegularUser5,
        { roleId: null });
      userDB.create(user)
      .catch((error) => {
        expect(error).to.be.instanceOf(Object);
        expect(error.errors).to.be.instanceOf(Array);
        done();
      });
    });

    it('should throw validation error for a user with an invalid email',
    (done) => {
      const user = Object.assign({},
        SpecHelper.validRegularUser3,
        { email: 'guest.blabla' });
      userDB.create(user)
      .catch((error) => {
        expect(error).to.be.instanceOf(Object);
        expect(error.errors).to.be.instanceOf(Array);
        done();
      });
    });

    it('should allow proper creation of a valid Admin user',
    (done) => {
      const user = SpecHelper.validAdminUser;
      userDB.create(user)
      .then((createdUser) => {
        expect(createdUser.email).to.equal(user.email);
        expect(createdUser.firstName).to.equal(user.firstName);
        expect(createdUser.lastName).to.equal(user.lastName);
        expect(createdUser.roleId).to.equal(user.roleId);
        done();
      });
    });
  });

  describe('Update User', () => {
    // we need to get a valid user id by inserting a new user
    let testUser;
    before((done) => {
      const user = SpecHelper.newRecordFromBase(
        SpecHelper.validRegularUser1,
        { email: 'updateuser@gmail.com' }
      );
      userDB.create(user)
      .then((createdUser) => {
        testUser = createdUser;
        done();
      });
    });

    it('should allow update of a user firstName attribute', (done) => {
      const userUpdate = SpecHelper.newRecordFromBase(
        {},
        { firstName: 'newname' }
      );
      userDB.update(userUpdate, {
        where: { id: testUser.id }
      })
      .then(() => {
        userDB.findById(testUser.id)
        .then((foundUser) => {
          expect(foundUser.firstName).to.equal(userUpdate.firstName);
          done();
        });
      });
    });

    it('should allow update of a user lastName attribute', (done) => {
      const userUpdate = SpecHelper.newRecordFromBase(
        {},
        { lastName: 'new LastName' }
      );

      userDB.update(userUpdate, {
        where: { id: testUser.id }
      })
      .then(() => {
        userDB.findById(testUser.id)
        .then((foundUser) => {
          expect(foundUser.lastName).to.equal(userUpdate.lastName);
          done();
        });
      });
    });

    it('should allow update of a user email attribute to a valid email',
    (done) => {
      const userUpdate = SpecHelper.newRecordFromBase(
        {},
        { email: 'newemail@andela.com' }
      );

      userDB.update(userUpdate, {
        where: { id: testUser.id }
      })
      .then(() => {
        userDB.findById(testUser.id)
        .then((foundUser) => {
          expect(foundUser.email).to.equal(userUpdate.email);
          done();
        });
      });
    });
  });

  describe('Delete User', () => {
    let testUser;
    before((done) => {
      const user = SpecHelper.newRecordFromBase(
        SpecHelper.validRegularUser3,
        { email: 'deleteuser@andela.com' }
      );
      userDB.create(user)
      .then((createdUser) => {
        testUser = createdUser;
        done();
      });
    });

    it('should allow deletion of an existing user', (done) => {
      userDB.destroy({
        where: { id: testUser.id }
      })
      .then((rowsDeleted) => {
        expect(rowsDeleted).to.be.equal(1);
        done();
      });
    });

    it('should NOT allow deletion of a Non-existing user', (done) => {
      userDB.destroy({
        where: { id: 100 }
      })
      .then((rowsDeleted) => {
        expect(rowsDeleted).to.be.equal(0);
        done();
      });
    });
  });

  describe('Read Users', () => {
    let testUser;
    before((done) => {
      const user = SpecHelper.newRecordFromBase(
        SpecHelper.validRegularUser7,
        { email: 'readuser@andela.com' }
      );
      userDB.create(user)
      .then((createdUser) => {
        testUser = createdUser;
        done();
      });
    });

    it('should return all users as an array', (done) => {
      userDB.findAll()
      .then((users) => {
        expect(users).to.be.instanceOf(Array);
        done();
      });
    });

    it('should return a user specified by id', (done) => {
      userDB.findById(testUser.id)
      .then((user) => {
        expect(user).to.be.instanceOf(Object);
        expect(user.firstName).to.equal(testUser.firstName);
        expect(user.lastName).to.equal(testUser.lastName);
        expect(user.email).to.equal(testUser.email);
        done();
      });
    });

    it('should NOT return a user if the specified id does not exist',
    (done) => {
      userDB.findById(1000)
      .then((user) => {
        expect(user).to.equal(null);
        done();
      });
    });
  });
});
