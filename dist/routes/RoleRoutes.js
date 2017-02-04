'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RoleController = require('../controllers/RoleController');

var _RoleController2 = _interopRequireDefault(_RoleController);

var _Authenticator = require('../middlewares/Authenticator');

var _Authenticator2 = _interopRequireDefault(_Authenticator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class for creating Role routes
 */
var RoleRoutes = function () {
  function RoleRoutes() {
    _classCallCheck(this, RoleRoutes);
  }

  _createClass(RoleRoutes, null, [{
    key: 'setRoleRoutes',


    /**
     * Method to hook up all routes to respective endpoints
     * @param{Object} app - Express app
     * @return{Void} returns void
     */
    value: function setRoleRoutes(app) {
      app.use(_Authenticator2.default.authenticateUser);
      RoleRoutes.getRole(app);
      RoleRoutes.getRoles(app);
      RoleRoutes.createRole(app);
      RoleRoutes.deleteRole(app);
      RoleRoutes.updateRole(app);
    }

    /**
     * Method to setup Route for deleting a specified role
     * @param{Object} app - Express app
     * @return{Void} returns void
     */

  }, {
    key: 'getRoles',
    value: function getRoles(app) {
      app.get('/api/roles', _RoleController2.default.fetchRoles);
    }

    /**
     * Method to setup Route for deleting a specified role
     * @param{Object} app - Express app
     * @return{Void} returns void
     */

  }, {
    key: 'getRole',
    value: function getRole(app) {
      app.get('/api/roles/:id', _RoleController2.default.fetchRole);
    }

    /**
     * Method to setup Route for deleting a specified role
     * @param{Object} app - Express app
     * @return{Void} returns void
     */

  }, {
    key: 'createRole',
    value: function createRole(app) {
      app.post('/api/roles', _RoleController2.default.createRole);
    }

    /**
     * Method to setup Route for deleting a specified role
     * @param{Object} app - Express app
     * @return{Void} returns void
     */

  }, {
    key: 'updateRole',
    value: function updateRole(app) {
      app.put('/api/roles/:id', _RoleController2.default.updateRole);
    }

    /**
     * Method to setup Route for deleting a specified role
     * @param{Object} app - Express app
     * @return{Void} returns void
     */

  }, {
    key: 'deleteRole',
    value: function deleteRole(app) {
      app.delete('/api/roles/:id', _RoleController2.default.deleteRole);
    }
  }]);

  return RoleRoutes;
}();

exports.default = RoleRoutes;