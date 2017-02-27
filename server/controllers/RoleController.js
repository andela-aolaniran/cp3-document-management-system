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
    if (Authenticator.verifyAdmin(request.decoded.userId)) {
      if (request.body && request.body.title) {
        roleDb.create(request.body)
        .then((role) => {
          response.status(201).json({
            id: role.id,
            title: role.title
          });
        })
        .catch((error) => {
          response.status(400).json({
            success: false,
            message: error.errors
          });
        });
      } else {
        response.status(400).json({
          success: false,
          message: 'Required field(s) are missing'
        });
      }
    } else {
      response.status(403).json({
        message: 'Admin permission required'
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
    if (Authenticator.verifyAdmin(request.decoded.userId)) {
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
      });
    } else {
      response.status(403).json({
        message: 'Admin permission required'
      });
    }
  }

  /**
   * Method to delete a Role
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - Returns void
   */
  static deleteRole(request, response) {
    if (Authenticator.verifyAdmin(request.decoded.userId)) {
      roleDb.destroy({
        where: {
          id: request.params.id
        }
      })
      .then((status) => {
        if (status) {
          response.status(200).json({
            success: true,
            message: 'Role Deleted Successfully'
          });
        } else {
          response.status(404).json({
            success: false,
            message: 'Deletion Failed'
          });
        }
      });
    } else {
      response.status(403).json({
        message: 'Admin permission required'
      });
    }
  }

  /**
   * Method to createa fetch a Role
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - Returns void
   */
  static fetchRole(request, response) {
    if (Authenticator.verifyAdmin(request.decoded.userId)) {
      roleDb.findById(request.params.id, {
        attributes: ['id', 'title']
      })
      .then((role) => {
        if (role) {
          response.status(200).json(role);
        } else {
          response.status(404).json({
            success: false,
            message: 'Role Not Found'
          });
        }
      });
    } else {
      response.status(403).json({
        message: 'Admin permission required'
      });
    }
  }

  /**
   * Method to fetch all Roles
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - Returns void
   */
  static fetchRoles(request, response) {
    if (Authenticator.verifyAdmin(request.decoded.userId)) {
      const search = request.query.search;
      const limit = request.query.limit;
      const offset = request.query.offset;
      const queryBuilder = {
        attributes: ['id', 'title'],
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
          title: {
            $iLike: `%${search}%`
          }
        };
      }
      roleDb.findAll(queryBuilder)
      .then((roles) => {
        response.status(200).json(roles);
      });
    } else {
      response.status(403).json({
        message: 'Admin permission required'
      });
    }
  }
}

export default RoleController;
