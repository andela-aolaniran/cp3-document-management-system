'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import dependencies


var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SECRET_KEY = 'jwt_cp2_dms';

// declare the usersDB
var usersDB = _models2.default.Users;

/**
 * Class for the UsersController
 * to handle connections to our database
 */

var UsersController = function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, null, [{
    key: 'checkPostRequest',


    /**
     * Method to check that the post request contains required Fields
     * @param{Object} request - post request object
     * @return{Boolean} - True if request contains all required fields,
     * otherwise false
     */
    value: function checkPostRequest(request) {
      return request.body && request.body.email && request.body.firstName && request.body.password && request.body.lastName && request.body.roleId;
    }

    /**
     * Method to create a new User (POST)
     * @param{Object} request - Request object
     * @param{Object} response - Response object
     * @return{Void} - returns void
     */

  }, {
    key: 'createUser',
    value: function createUser(request, response) {
      if (UsersController.checkPostRequest(request)) {
        return usersDB.create({
          email: request.body.email,
          password: request.body.password,
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          roleId: request.body.roleId
        }).then(function (user) {
          response.status(201).json(user);
        }).catch(function (error) {
          // send an array of errors that occurred
          response.status(400).json(error.errors);
        });
      } else {
        response.status(400).json({
          status: 'Failed',
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

  }, {
    key: 'deleteUser',
    value: function deleteUser(request, response) {
      usersDB.findOne({
        where: {
          id: request.params.id
        }
      }).then(function (user) {
        if (user) {
          user.destroy().then(function () {
            response.status(200).json({
              status: 'Success',
              message: 'User deleted'
            });
          }).catch(function (error) {
            response.status(400).json(error.errors);
          });
        } else {
          response.status(404).json({
            status: 'Failed',
            message: 'User not found'
          });
        }
      }).catch(function (error) {
        response.status(400).json(error.errors);
      });
    }

    /**
     * Method to update a specific user (PUT)
     * @param{Object} request - Request object
     * @param{Object} response - Response object
     * @return{Void} - returns void
     */

  }, {
    key: 'updateUser',
    value: function updateUser(request, response) {
      usersDB.findOne({
        where: {
          id: request.params.id
        }
      }).then(function (user) {
        if (user) {
          user.update(request.body).then(function (updatedUser) {
            response.status(200).json(updatedUser);
          }).catch(function (error) {
            response.status(400).json(error.errors);
          });
        } else {
          response.status(404).json({
            status: 'Failed',
            message: 'User not found'
          });
        }
      }).catch(function (error) {
        response.status(400).json(error.errors);
      });
    }

    /**
     * Method to fetch a specific user (GET)
     * @param{Object} request - Request object
     * @param{Object} response - Response object
     * @return{Void} - returns void
     */

  }, {
    key: 'fetchUser',
    value: function fetchUser(request, response) {
      usersDB.findOne({ where: { id: request.params.id } }).then(function (user) {
        if (user) {
          response.status(200).json(user);
        } else {
          response.status(404).json({
            status: 'Failed',
            message: 'User not found'
          });
        }
      }).catch(function (error) {
        response.status(400).json({
          error: error
        });
      });
    }

    /**
     * Method to fetch all users (GET)
     * @param{Object} request - Request object
     * @param{Object} response - Response object
     * @return{Void} - returns void
     */

  }, {
    key: 'fetchUsers',
    value: function fetchUsers(request, response) {
      usersDB.findAll({}).then(function (users) {
        if (users) {
          response.status(200).json(users);
        } else {
          response.status(404).json({
            status: 'Failed',
            message: 'No Users found'
          });
        }
      }).catch(function (error) {
        response.json(error);
      });
    }

    /**
     * Method to login a specific user (POST)
     * @param{Object} request - Request object
     * @param{Object} response - Response object
     * @return{Void} - returns void
     */

  }, {
    key: 'loginUser',
    value: function loginUser(request, response) {
      if (request.body.email && request.body.password) {
        usersDB.findOne({
          where: {
            email: request.body.email
          }
        }).then(function (user) {
          if (user) {
            if (user.verifyPassword(request.body.password)) {
              // send the token here
              var token = _jsonwebtoken2.default.sign({
                UserId: user.id,
                RoleId: user.RoleId
              }, SECRET_KEY, { expiresIn: '2 days' });
              response.status(200).json({
                status: 'Success',
                message: 'Login Successful',
                token: token
              });
            } else {
              response.status(401).json({
                status: 'Failed',
                message: 'Invalid Credentials'
              });
            }
          } else {
            response.status(404).json({
              status: 'Failed',
              message: 'User not found'
            });
          }
        });
      } else {
        response.status(401).json({
          status: 'Failed',
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

  }, {
    key: 'logoutUser',
    value: function logoutUser(request, response) {
      // Todo, Implement Log out functionality
      response.send('You have hit the logout user controller');
    }
  }]);

  return UsersController;
}();

exports.default = UsersController;