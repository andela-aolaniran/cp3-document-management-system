import database from '../models';
import Authenticator from '../middlewares/Authenticator';

// declare the usersDB
const userDB = database.User;

/**
 * Class for the UsersController
 * to handle connections to our database
 */
class UserController {

  /**
   * Method to check that the post request contains required Fields
   * @param{Object} request - post request object
   * @return{Boolean} - True if request contains all required fields,
   * otherwise false
   */
  static validateCreateRequest(request) {
    return (request.body &&
      request.body.email &&
      request.body.firstName &&
      request.body.password &&
      request.body.lastName
    );
  }

  /**
   * Method to verify if a user is an admin
   * @param{Number} roleId - id number for user. Admin roleId is 1
   * @return{Boolean} - True if user roleId corresponds to admin,
   * otherwise false
   */
  static isAdmin(roleId) {
    return roleId === 1;
  }

  /**
   * Method to create a new User (POST)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{undefined} - returns undefined
   */
  static createUser(request, response) {
    const newUser = request.body;
    if (UserController.validateCreateRequest(request) &&
     !Authenticator.verifyAdmin(newUser.roleId)) {
      // set roleId to default of 2
      newUser.roleId = newUser.roleId || 2;
      userDB.create(newUser)
      .then((user) => {
        const token = Authenticator.generateToken(user);
        user.update({ activeToken: token })
        .then(() => {
          response.status(201).json({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roleId: user.roleId,
            id: user.id,
            token
          });
        });
      })
      .catch((error) => {
        response.status(400).json({
          message: error.errors
        });
      });
    } else if (request.body.roleId === 1) {
      response.status(403).json({
        message: 'Cannot create Admin user'
      });
    } else {
      response.status(400).json({
        message: 'Required fields are missing'
      });
    }
  }

  /**
   * Method to delete a specific user (DELETE)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{undefined} - returns undefined
   */
  static deleteUser(request, response) {
    const requesterId = request.decoded.roleId;
    const deleteId = Number(request.params.id);
    if (Authenticator.verifyAdmin(requesterId) &&
     deleteId !== requesterId) {
      userDB.destroy({
        where: {
          id: deleteId
        }
      }).then((rowDeleted) => {
        if (rowDeleted === 1) {
          response.status(200).json({
            message: 'User deleted'
          });
        } else {
          response.status(404).json({
            message: 'User not found'
          });
        }
      });
    } else if (!Authenticator.verifyAdmin(requesterId)) {
      response.status(403).json({
        message: 'Only admin can delete a user'
      });
    } else {
      response.status(403).json({
        message: 'Admin user cannot be deleted'
      });
    }
  }

  /**
   * Method to update a specific user (PUT)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{undefined} - returns undefined
   */
  static updateUser(request, response) {
    // users should not be allowed to update other users profile
    // except for admins
    const updateId = Number(request.params.id);
    if (request.decoded.userId === updateId ||
        Authenticator.verifyAdmin(request.decoded.roleId)) {
      userDB.findById(updateId)
      .then((user) => {
        if (user) {
          user.update(request.body)
          .then((updatedUser) => {
            response.status(200).send({
              email: updatedUser.email,
              firstName: updatedUser.firstName,
              lastName: updatedUser.lastName,
              roleId: updatedUser.roleId,
              id: updatedUser.id,
            });
          })
          .catch((error) => {
            response.status(400).json({
              message: error.errors
            });
          });
        } else {
          response.status(404).json({
            message: 'User Not Found'
          });
        }
      });
    } else {
      response.status(403).json({
        message: 'Forbidden'
      });
    }
  }

  /**
   * Method to fetch a specific user (GET)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{undefined} - returns undefined
   */
  static fetchUser(request, response) {
    const searchId = Number(request.params.id);
    const requesterId = request.decoded.userId;
    if (searchId === requesterId || Authenticator.verifyAdmin(requesterId)) {
      userDB.findById(searchId, {
        attributes: ['email', 'firstName', 'lastName', 'id', 'roleId']
      })
      .then((user) => {
        if (user) {
          response.status(200).json(user);
        } else {
          response.status(404).json({
            message: 'User not found'
          });
        }
      })
      .catch((error) => {
        response.status(500).json({
          message: error.errors
        });
      });
    } else {
      response.status(403).json({
        message: 'Only admin can view other users profile'
      });
    }
  }

  /**
   * Method to fetch all users (GET)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{undefined} - returns undefined
   */
  static fetchUsers(request, response) {
    if (Authenticator.verifyAdmin(request.decoded.userId)) {
      const search = request.query.search;
      const limit = request.query.limit;
      const offset = request.query.offset;
      const queryBuilder = {
        attributes: ['email', 'firstName', 'lastName', 'id', 'roleId'],
        order: '"createdAt" DESC'
      };
      if (limit) {
        queryBuilder.limit = limit >= 0 ? limit : 0;
      }
      if (offset) {
        queryBuilder.offset = offset >= 0 ? offset : 0;
      }
      if (search) {
        queryBuilder.where = {
          $or: [{ firstName: {
            $iLike: `%${search}%` }
          }, { lastName: {
            $iLike: `%${search}%` }
          }, { email: {
            $iLike: `%${search}%` }
          }]
        };
      }
      userDB.findAll(queryBuilder)
      .then((users) => {
        response.status(200).json(users);
      });
    } else {
      response.status(403).json({
        message: 'Only admin can fetch all users'
      });
    }
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
                message: 'Login Successful',
                token
              });
            });
          } else {
            response.status(401).json({
              message: 'Wrong Password'
            });
          }
        } else {
          response.status(404).json({
            message: 'User not found'
          });
        }
      });
    } else {
      response.status(400).json({
        message: 'Missing Login credentials'
      });
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
      if (user) {
        user.update({ activeToken: null })
        .then(() => {
          response.status(200).json({
            message: 'Logout Successful'
          });
        });
      } else {
        response.status(404).json({
          message: 'User not found'
        });
      }
    });
  }
}

export default UserController;
