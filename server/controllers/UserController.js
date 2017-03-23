import database from '../models';
import ResponseHandler from '../helpers/ResponseHandler';
import Authenticator from '../middlewares/Authenticator';
import ErrorHandler from '../helpers/ErrorHandler';
// declare the usersDB
const userDB = database.User;

/**
 * Class for the UsersController
 * to handle connections to our database
 */
class UserController {

  /**
   * Method to fetch save fields from a user object
   * @param {Object} user - User object
   * @param {String} token - token to be added to the User
   * Object sent (Optional)
   * @return {Object} - new User object containing fields
   * consider safe for public view
   */
  static getSafeUserFields(user, token) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      token
    };
  }

  /**
   * Method to create a new User (POST)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{undefined} - returns undefined
   */
  static createUser(request, response) {
    const newUser = request.body;
    newUser.roleId = newUser.roleId || 2;
    userDB.create(newUser)
    .then((user) => {
      const token = Authenticator.generateToken(user);
      Authenticator.setUserActiveToken(user, token)
      .then(() => {
        ResponseHandler.sendResponse(
          response,
          201,
          Object.assign(
            {},
            UserController.getSafeUserFields(user, token),
            { roleId: user.roleId }
          )
        );
      });
    })
    .catch((error) => {
      ErrorHandler.handleRequestError(response, error);
    });
  }

  /**
   * Method to delete a specific user (DELETE)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{undefined} - returns undefined
   */
  static deleteUser(request, response) {
    const deleteId = Number(request.params.id);
    userDB.destroy({
      where: {
        id: deleteId
      }
    }).then((rowDeleted) => {
      if (rowDeleted === 1) {
        ResponseHandler.sendResponse(
          response,
          200,
          { message: 'User Deleted' }
        );
      } else {
        ResponseHandler.send404(response);
      }
    });
  }

  /**
   * Method to update a specific user (PUT)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{undefined} - returns undefined
   */
  static updateUser(request, response) {
    userDB.findById(request.params.id)
    .then((user) => {
      if (user) {
        user.update(request.body)
        .then((updatedUser) => {
          ResponseHandler.sendResponse(
            response,
            200,
            UserController.getSafeUserFields(updatedUser)
          );
        })
        .catch((error) => {
          ErrorHandler.handleRequestError(response, error);
        });
      } else {
        ResponseHandler.send404(response);
      }
    });
  }

  /**
   * Method to fetch a specific user (GET)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{undefined} - returns undefined
   */
  static fetchUser(request, response) {
    const searchId = Number(request.params.id);
    userDB.findById(searchId)
    .then((user) => {
      if (user) {
        ResponseHandler.sendResponse(
          response,
          200,
          UserController.getSafeUserFields(user)
        );
      } else {
        ResponseHandler.send404(response);
      }
    })
    .catch((error) => {
      ErrorHandler.handleRequestError(
        response,
        error
      );
    });
  }

  /**
   * Method to fetch all users (GET)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{undefined} - returns undefined
   */
  static fetchUsers(request, response) {
    const search = request.query.search;
    const limit = request.query.limit;
    const offset = request.query.offset;
    const page = request.query.page;
    const queryBuilder = {
      order: '"createdAt" DESC'
    };
    if (limit) {
      queryBuilder.limit = limit;
    }
    if (offset) {
      queryBuilder.offset = offset;
    }
    if (page) {
      // override offset if a page is specified, and default limit is 10
      const pageLimit = limit || 10;
      queryBuilder.offset = (page * pageLimit) - pageLimit;
      queryBuilder.limit = pageLimit;
    }
    if (search) {
      const searchList = search.split(/\s+/);
      queryBuilder.where = {
        $or: [{ firstName: { $iLike: { $any: searchList } } },
        { lastName: { $iLike: { $any: searchList } } },
        { email: { $iLike: { $any: searchList } } }]
      };
    }
    userDB.findAndCountAll(queryBuilder)
    .then((users) => {
      if (users.rows.length > 0) {
        ResponseHandler.sendResponse(
          response,
          200,
          {
            users: users.rows
              .map(user => UserController.getSafeUserFields(user)),
            total: users.count
          }
        );
      } else {
        ResponseHandler.send404(response);
      }
    });
  }

  /**
   * Method to login a specific user (POST)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{undefined} - returns undefined
   */
  static loginUser(request, response) {
    if (request.body.email && request.body.password) {
      userDB.findOne({
        where: {
          email: request.body.email
        }
      })
      .then((user) => {
        if (user) {
          if (user.verifyPassword(request.body.password)) {
            const token = Authenticator.generateToken(user);
            // update user activeToken
            user.update({ activeToken: token })
            .then(() => {
              // send the token here
              response.status(200).json({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roleId: user.roleId,
                id: user.id,
                createdAt: user.createdAt,
                token
              });
            });
          } else {
            ResponseHandler.send401(
              response,
              { message: 'Wrong Password' }
            );
          }
        } else {
          ResponseHandler.send404(response);
        }
      });
    } else {
      ResponseHandler.send400(
        response,
        { message: 'Missing Login Credentials' }
      );
    }
  }

  /**
   * Method to logout a specific user (POST)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{undefined} - returns undefined
   */
  static logoutUser(request, response) {
    const id = request.decoded.userId;
    userDB.findById(id)
    .then((user) => {
      user.update({ activeToken: null })
      .then(() => {
        ResponseHandler.sendResponse(
          response,
          200,
          { message: 'Logout Successful' }
        );
      });
    });
  }

  /**
   * Method to fetch all documents of a specific user
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
   */
  static fetchUserDocuments(request, response) {
    const id = Number(request.params.id);
    const requesterRoleId = request.decoded.roleId;
    const requesterId = request.decoded.userId;
    userDB.findById(id, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'roleId'],
      include: {
        model: database.Document,
        attributes: ['id', 'access', 'title', 'content', 'ownerId', 'createdAt']
      }
    })
    .then((user) => {
      if (user) {
        const documents = user.Documents.filter((document) => {
          if (Authenticator.verifyAdmin(requesterRoleId)) {
            return true;
          // for other users, ensure they have appropriate access rights
          } else if (
            (document.access === 'public' ||
            requesterRoleId === user.roleId)
            && document.access !== 'private') {
            return true;
          } else if (document.access === 'private'
            && document.ownerId === requesterId) {
            return true;
          }
          return false;
        });
        const safeUser = Object.assign(
          {},
          UserController.getSafeUserFields(user),
          { documents });
        ResponseHandler.sendResponse(
          response,
          200,
          safeUser
        );
      } else {
        ResponseHandler.send404(response);
      }
    });
  }
}

export default UserController;
