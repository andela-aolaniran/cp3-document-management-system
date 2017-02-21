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
  static checkPostRequest(request) {
    return (request.body &&
      request.body.email &&
      request.body.firstName &&
      request.body.password &&
      request.body.lastName
    );
  }

  /**
   * Method to create a new User (POST)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
   */
  static createUser(request, response) {
    if (UserController.checkPostRequest(request)) {
      const roleId = request.body.roleId;
      userDB.create({
        email: request.body.email,
        password: request.body.password,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        // setuser role to default if role id isn't supplied
        roleId: roleId || 2
      })
      .then((user) => {
        response.status(201).json({
          success: true,
          message: `${user.email} Succefully Created`,
          user: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roleId: user.roleId,
            id: user.id,
            token: Authenticator.generateToken(user)
          }
        });
      })
      .catch((error) => {
        response.status(500).json({
          success: false,
          message: error.message
        });
      });
    } else {
      response.status(400).json({
        success: false,
        message: 'Required fields are missing'
      });
    }
  }

  /**
   * Method to delete a specific user (DELETE)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
   */
  static deleteUser(request, response) {
    userDB.destroy({
      where: {
        id: request.params.id
      }
    }).then((rowDeleted) => {
      if (rowDeleted === 1) {
        response.status(200).json({
          success: true,
          message: 'User deleted'
        });
      } else {
        response.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
    })
  }

  /**
   * Method to update a specific user (PUT)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
   */
  static updateUser(request, response) {
    // users should not be allowed to update other users profile
    // except for admins
    if (request.decoded.userId !== +request.params.id) {
      response.status(403).json({
        success: false,
        message: 'Forbidden'
      });
      return;
    }
    userDB.update(request.body, {
      where: {
        id: request.params.id
      }
    }).then((rowUpdated) => {
      if(rowUpdated[0] === 1){
        response.status(200).json({
          success: true,
          message: 'User Successfully updated'
        });
      } else {
        response.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
    });
  }

  /**
   * Method to fetch a specific user (GET)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
   */
  static fetchUser(request, response) {
    userDB.findById(request.params.id, {
      attributes: ['email', 'firstName', 'lastName', 'id', 'roleId']
    })
    .then((user) => {
      if (user) {
        response.status(200).json(user);
      } else {
        response.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
    })
    .catch((error) => {
      response.status(500).json({
        success: false,
        message: error.message
      });
    });
  }

  /**
   * Method to fetch all users (GET)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
   */
  static fetchUsers(request, response) {
    userDB.findAll({
      attributes: ['email', 'firstName', 'lastName', 'id', 'roleId']
    })
    .then((users) => {
      response.status(200).json(users);
    });
  }

  /**
   * Method to login a specific user (POST)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
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
            // send the token here
            response.status(200).json({
              success: true,
              message: 'Login Successful',
              id: user.id,
              token: Authenticator.generateToken(user)
            });
          } else {
            response.status(401).json({
              success: false,
              message: 'Wrong Password'
            });
          }
        } else {
          response.status(404).json({
            success: false,
            message: 'User not found'
          });
        }
      });
    } else {
      response.status(401).json({
        success: false,
        message: 'Missing Credentials'
      });
    }
  }

  /**
   * Method to logout a specific user (POST)
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
   */
  static logoutUser(request, response) {
    response.status(200).json({
      success: true,
      message: 'Logout Successful'
    });
  }
}

export default UserController;
