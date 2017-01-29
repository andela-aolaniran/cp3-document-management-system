'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // fetch our dependencies


var _UsersController = require('../controllers/UsersController');

var _UsersController2 = _interopRequireDefault(_UsersController);

var _Authenticator = require('../middlewares/Authenticator');

var _Authenticator2 = _interopRequireDefault(_Authenticator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class to create an instance of a UserRoutes Object
 * and set up all routes associated with a user object
 * for an express application
 */
var UsersRoutes = function () {
  function UsersRoutes() {
    _classCallCheck(this, UsersRoutes);
  }

  _createClass(UsersRoutes, null, [{
    key: 'setUserRoutes',

    /**
     * Method to set all User routes
     * @param{Object} app - Express application
     * @returns{Void} - Returns Void
     */
    value: function setUserRoutes(app) {
      UsersRoutes.createUser(app);
      UsersRoutes.loginUser(app);

      // setup authentication before protected routes
      app.use(_Authenticator2.default.authenticateUser);

      UsersRoutes.logoutUser(app);
      UsersRoutes.fetchUser(app);
      UsersRoutes.fetchUsers(app);
      UsersRoutes.updateUser(app);
      UsersRoutes.deleteUser(app);
    }

    /**
     * Method to set up route for requests to create a new user
     * @param{Object} app - Express application
     * @return{Void} - Returns Void
     */

  }, {
    key: 'createUser',
    value: function createUser(app) {
      app.post('/api/users/', _UsersController2.default.createUser);
    }

    /**
     * Method to set up route for user login requests
     * @param{Object} app - Express application
     * @return{Void} - Returns Void
     */

  }, {
    key: 'loginUser',
    value: function loginUser(app) {
      app.post('/api/users/login', _UsersController2.default.loginUser);
    }

    /**
     * Method to set up route for user logout requests
     * @param{Object} app - Express application
     * @return{Void} - Returns Void
     */

  }, {
    key: 'logoutUser',
    value: function logoutUser(app) {
      app.post('/api/users/logout', _UsersController2.default.logoutUser);
    }

    /**
     * Method to set up route for fetching users
     * @param{Object} app - Express application
     * @return{Void} - Returns Void
     */

  }, {
    key: 'fetchUsers',
    value: function fetchUsers(app) {
      app.get('/api/users/', _UsersController2.default.fetchUsers);
    }

    /**
     * Method to set up route for fetching a specific user
     * @param{Object} app - Express application
     * @return{Void} - Returns Void
     */

  }, {
    key: 'fetchUser',
    value: function fetchUser(app) {
      app.get('/api/users/:id', _UsersController2.default.fetchUser);
    }

    /**
     * Method to set up route for updating user fields
     * @param{Object} app - Express application
     * @return{Void} - Returns Void
     */

  }, {
    key: 'updateUser',
    value: function updateUser(app) {
      app.put('/api/users/:id', _UsersController2.default.updateUser);
    }

    /**
     * Method to set up route for delete user requests
     * @param{Object} app - Express application
     * @return{Void} - Returns Void
     */

  }, {
    key: 'deleteUser',
    value: function deleteUser(app) {
      app.delete('/api/users/:id', _UsersController2.default.deleteUser);
    }
  }]);

  return UsersRoutes;
}();

exports.default = UsersRoutes;