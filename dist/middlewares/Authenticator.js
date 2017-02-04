'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // fetch dependencies


var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SECRET_KEY = 'jwt_cp2_dms';
var roleDb = _models2.default.Role;

/**
 * Class to implement authentication middlewares
 */

var Authenticator = function () {
  function Authenticator() {
    _classCallCheck(this, Authenticator);
  }

  _createClass(Authenticator, null, [{
    key: 'authenticateUser',

    /**
     * Method to authenticate a user before proceeding
     * to protected routes
     */
    value: function authenticateUser(request, response, next) {
      var token = request.headers.authorization || request.body.token || request.headers['x-access-token'];
      if (token) {
        _jsonwebtoken2.default.verify(token, SECRET_KEY, function (error, decoded) {
          if (error) {
            response.status(401).json({
              success: false,
              message: 'Authentication failed due to invalid token!'
            });
          } else {
            request.decoded = decoded;
            next();
          }
        });
      } else {
        response.status(401).json({
          success: false,
          message: 'Authentication required for this route'
        });
      }
    }

    /**
     * Method to generate a token for a user
     * @param{Object} user - User Object
     * @return{String} - Token string
     */

  }, {
    key: 'generateToken',
    value: function generateToken(user) {
      return _jsonwebtoken2.default.sign({
        userId: user.id,
        roleId: user.roleId
      }, SECRET_KEY, { expiresIn: '2 days' });
    }

    /**
     * Method to verify that user is an Admin
     * to access Admin endpoints
     * @param{Object} request - Request Object
     * @param{Object} response - Response Object
     * @param{Object} next - Function to pass flow to the next controller
     * @return{Void} - returns Void
     */

  }, {
    key: 'verifyAdmin',
    value: function verifyAdmin(request, response, next) {
      roleDb.findOne({
        where: {
          id: request.decoded.roleId
        }
      }).then(function (role) {
        if (role.title === 'Admin') {
          next();
        } else {
          response.status(403).json({
            success: false,
            message: 'Only Admin can delete a user'
          });
        }
      }).catch(function (error) {
        response.status(403).json({
          success: false,
          message: error.message
        });
      });
    }
  }]);

  return Authenticator;
}();

exports.default = Authenticator;