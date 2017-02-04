'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // fetch our dependencies


var _UserController = require('../controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _Authenticator = require('../middlewares/Authenticator');

var _Authenticator2 = _interopRequireDefault(_Authenticator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class to create an instance of a UserRoutes Object
 * and set up all routes associated with a user object
 * for an express application
 */
var UserRoutes = function () {
  function UserRoutes() {
    _classCallCheck(this, UserRoutes);
  }

  _createClass(UserRoutes, null, [{
    key: 'setUserRoutes',

    /**
     * Method to set all User routes
     * @param{Object} app - Express application
     * @returns{Void} - Returns Void
     */
    value: function setUserRoutes(app) {
      UserRoutes.createUser(app);
      UserRoutes.loginUser(app);

      // setup authentication before protected routes
      app.use(_Authenticator2.default.authenticateUser);

      UserRoutes.logoutUser(app);
      UserRoutes.fetchUser(app);
      UserRoutes.fetchUsers(app);
      UserRoutes.updateUser(app);
      UserRoutes.deleteUser(app);
      UserRoutes.fetchUserDocuments(app);
    }

    /**
     * Method to set up route for requests to create a new user
     * @param{Object} app - Express application
     * @return{Void} - Returns Void
     */

  }, {
    key: 'createUser',
    value: function createUser(app) {
      app.post('/api/users/', _UserController2.default.createUser);
    }

    /**
     * Method to set up route for user login requests
     * @param{Object} app - Express application
     * @return{Void} - Returns Void
     */

  }, {
    key: 'loginUser',
    value: function loginUser(app) {
      app.post('/api/users/login', _UserController2.default.loginUser);
    }

    /**
     * Method to set up route for user logout requests
     * @param{Object} app - Express application
     * @return{Void} - Returns Void
     */

  }, {
    key: 'logoutUser',
    value: function logoutUser(app) {
      app.post('/api/users/logout', _UserController2.default.logoutUser);
    }

    /**
     * Method to set up route for fetching users
     * @param{Object} app - Express application
     * @return{Void} - Returns Void
     */

  }, {
    key: 'fetchUsers',
    value: function fetchUsers(app) {
      app.get('/api/users/', _Authenticator2.default.verifyAdmin, _UserController2.default.fetchUsers);
    }

    /**
     * Method to set up route for fetching a specific user
     * @param{Object} app - Express application
     * @return{Void} - Returns Void
     */

  }, {
    key: 'fetchUser',
    value: function fetchUser(app) {
      app.get('/api/users/:id', _Authenticator2.default.verifyAdmin, _UserController2.default.fetchUser);
    }

    /**
     * Method to set up route for updating user fields
     * @param{Object} app - Express application
     * @return{Void} - Returns Void
     */

  }, {
    key: 'updateUser',
    value: function updateUser(app) {
      app.put('/api/users/:id', _UserController2.default.updateUser);
    }

    /**
     * Method to set up route for delete user requests
     * @param{Object} app - Express application
     * @return{Void} - Returns Void
     */

  }, {
    key: 'deleteUser',
    value: function deleteUser(app) {
      app.delete('/api/users/:id', _Authenticator2.default.verifyAdmin, _UserController2.default.deleteUser);
    }

    /**
     * Method to set up route for fetching all specified user documents
     * @param{Object} app - Express application
     * @return{Void} - Returns Void
     */

  }, {
    key: 'fetchUserDocuments',
    value: function fetchUserDocuments(app) {
      app.get('/api/users/:id/documents', _UserController2.default.fetchUserDocuments);
    }
  }]);

  return UserRoutes;
}();

exports.default = UserRoutes;