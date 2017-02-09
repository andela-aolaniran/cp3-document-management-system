import database from '../models';
import Authenticator from '../middlewares/Authenticator';

const roleDb = database.Role;

/**
 * Class to implement need Role controlllers
 */
class RoleController {

  /**
   * Method to create a a new Role
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - Returns void
   */
  static createRole(request, response) {
    if (request.body && request.body.title) {
      roleDb.create(request.body)
      .then((role) => {
        if (role) {
          response.status(201).json({
            id: role.id,
            title: role.title
          });
        } else {
          response.status(400).json({
            success: false,
            message: 'Role not created'
          });
        }
      })
      .catch((error) => {
        response.status(400).json({
          success: false,
          message: error.message
        });
      });
    } else {
      response.status(400).json({
        success: false,
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
  static updateRole(request, response) {
    roleDb.update(request.body, {
      where: {
        id: request.params.id
      }
    })
    .then((update) => {
      if (update[0] === 1) {
        response.status(200).json({
          id: request.params.id,
          title: request.body.title
        });
      } else {
        response.status(404).json({
          success: false,
          message: 'Could not update the specified role'
        });
      }
    })
    .catch((error) => {
      response.status(404).json({
        success: false,
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
  static deleteRole(request, response) {
    roleDb.destroy({
      where: {
        id: request.params.id
      }
    })
    .then((status) => {
      if (status) {
        response.status(200).json({
          success: false,
          message: 'Role Deleted Successfully'
        });
      } else {
        response.status(400).json({
          success: false,
          message: 'Deletion Failed'
        });
      }
    })
    .catch((error) => {
      response.status(400).json({
        success: false,
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
  static fetchRole(request, response) {
    roleDb.findById(request.params.id, {
      attributes: ['id', 'title']
    })
    .then((role) => {
      if (role) {
        response.status(200).json(role);
      } else {
        response.status(400).json({
          success: false,
          message: 'No Roles Found'
        });
      }
    })
    .catch((error) => {
      response.status(400).json({
        success: false,
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
  static fetchRoles(request, response) {
    roleDb.findAll({
      attributes: ['id', 'title']
    })
    .then((roles) => {
      if (roles) {
        response.status(200).json(roles);
      } else {
        response.status(400).json({
          success: false,
          message: 'No Roles Found'
        });
      }
    })
    .catch((error) => {
      response.status(400).json({
        success: false,
        message: error.message
      });
    });
  }
}

export default RoleController;