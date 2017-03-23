import database from '../models';
import ErrorHandler from '../helpers/ErrorHandler';
import ResponseHandler from '../helpers/ResponseHandler';

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
    roleDb.create(request.body)
    .then((role) => {
      ResponseHandler.sendResponse(
        response,
        201,
        {
          id: role.id,
          title: role.title
        }
      );
    })
    .catch((error) => {
      ErrorHandler.handleRequestError(
        response,
        error
      );
    });
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
        ResponseHandler.sendResponse(
          response,
          200,
          { message: 'Update Successful' }
        );
      } else {
        ResponseHandler.send404(response);
      }
    });
  }

  /**
   * Method to delete a Role
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - Returns void
   */
  static deleteRole(request, response) {
    const id = request.params.id;
    roleDb.destroy({
      where: { id }
    })
    .then((status) => {
      if (status) {
        ResponseHandler.sendResponse(
          response,
          200,
          { message: 'Delete Successful' }
        );
      } else {
        ResponseHandler.send404(response);
      }
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
      attributes: ['id', 'title', 'createdAt']
    })
    .then((role) => {
      if (role) {
        ResponseHandler.sendResponse(
          response,
          200,
          role
        );
      } else {
        ResponseHandler.send404(response);
      }
    })
    .catch((error) => {
      ErrorHandler.handleRequestError(
        response,
        error
      );
    });
  }

  /**
   * Method to fetch all Roles
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - Returns void
   */
  static fetchRoles(request, response) {
    const search = request.query.search;
    const limit = request.query.limit;
    const offset = request.query.offset;
    const page = request.query.page;
    const queryBuilder = {
      attributes: ['id', 'title', 'createdAt'],
      order: '"createdAt" DESC'
    };
    if (limit) {
      queryBuilder.limit = limit;
    }
    if (offset) {
      queryBuilder.offset = offset;
    }
    if (page) {
      // override offset if a page is specified, and default limit is 10
      const pageLimit = limit || 10;
      queryBuilder.offset = (page * pageLimit) - pageLimit;
      queryBuilder.limit = pageLimit;
    }
    if (search) {
      const searchList = search.split(/\s+/);
      queryBuilder.where = {
        $or: [{ title: { $iLike: { $any: searchList } } }]
      };
    }
    roleDb.findAndCountAll(queryBuilder)
    .then((roles) => {
      if (roles.rows.length > 0) {
        ResponseHandler.sendResponse(
          response,
          200,
          {
            roles: roles.rows,
            total: roles.count
          }
        );
      } else {
        ResponseHandler.send404(response);
      }
    });
  }
}

export default RoleController;
