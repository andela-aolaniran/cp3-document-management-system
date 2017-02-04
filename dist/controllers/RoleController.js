'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var roleDb = _models2.default.Role;

/**
 * Class to implement need Role controlllers
 */

var RoleController = function () {
  function RoleController() {
    _classCallCheck(this, RoleController);
  }

  _createClass(RoleController, null, [{
    key: 'createRole',


    /**
     * Method to create a a new Role
     * @param{Object} request - Request Object
     * @param{Object} response - Response Object
     * @return{Void} - Returns void
     */
    value: function createRole(request, response) {
      //response.send('You have hit the createRole controller');
      if (request.body && request.body.title) {
        roleDb.create(request.body).then(function (role) {
          if (role) {
            response.status(203).json({
              id: role.id,
              title: role.title
            });
          } else {
            response.status(400).json({
              status: 'Failed',
              message: 'Role not created'
            });
          }
        }).catch(function (error) {
          response.status(400).json({
            status: 'Failed',
            message: error.message
          });
        });
      } else {
        response.status(400).json({
          status: 'Failed',
          message: 'Required field(s) are missing'
        });
      }
    }

    /**
     * Method to update a Role
     * @param{Object} request - Request Object
     * @param{Object} response - Response Object
     * @return{Void} - Returns void
     */

  }, {
    key: 'updateRole',
    value: function updateRole(request, response) {
      roleDb.update(request.body, {
        where: {
          id: request.params.id
        }
      }).then(function (update) {
        if (update[0] === 1) {
          response.status(200).json({
            id: request.params.id,
            title: request.body.title
          });
        } else {
          response.status(400).json({
            status: 'Failed',
            message: 'Could not update the specified role'
          });
        }
      }).catch(function (error) {
        response.status(400).json({
          status: 'Failed',
          message: error.message
        });
      });
    }

    /**
     * Method to delete a Role
     * @param{Object} request - Request Object
     * @param{Object} response - Response Object
     * @return{Void} - Returns void
     */

  }, {
    key: 'deleteRole',
    value: function deleteRole(request, response) {
      roleDb.destroy({
        where: {
          id: request.params.id
        }
      }).then(function (status) {
        if (status) {
          response.status(200).json({
            status: 'Success',
            message: 'Role Deleted Successfully'
          });
        } else {
          response.status(400).json({
            status: 'Failed',
            message: 'Deletion Failed'
          });
        }
      }).catch(function (error) {
        response.status(400).json({
          status: 'Failed',
          message: error.message
        });
      });
    }

    /**
     * Method to createa fetch a Role
     * @param{Object} request - Request Object
     * @param{Object} response - Response Object
     * @return{Void} - Returns void
     */

  }, {
    key: 'fetchRole',
    value: function fetchRole(request, response) {
      roleDb.findById(request.params.id, {
        attributes: ['id', 'title']
      }).then(function (role) {
        if (role) {
          response.status(200).json(role);
        } else {
          response.status(400).json({
            status: 'Failed',
            message: 'No Roles Found'
          });
        }
      }).catch(function (error) {
        response.status(400).json({
          status: 'Failed',
          message: error.message
        });
      });
    }

    /**
     * Method to fetch all Roles
     * @param{Object} request - Request Object
     * @param{Object} response - Response Object
     * @return{Void} - Returns void
     */

  }, {
    key: 'fetchRoles',
    value: function fetchRoles(request, response) {
      roleDb.findAll({
        attributes: ['id', 'title']
      }).then(function (roles) {
        if (roles) {
          response.status(200).json(roles);
        } else {
          response.status(400).json({
            status: 'Failed',
            message: 'No Roles Found'
          });
        }
      }).catch(function (error) {
        response.status(400).json({
          status: 'Failed',
          message: error.message
        });
      });
    }
  }]);

  return RoleController;
}();

exports.default = RoleController;