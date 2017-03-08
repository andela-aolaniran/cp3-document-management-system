import ResponseHandler from '../helpers/ResponseHandler';
import Authenticator from './Authenticator';
/**
 * Middleware class to handle verify/check Role related
 * requests
 */
export default class RoleMiddleware {
  /**
   * Middleware to check and handle violation of Role creation
   * rules by the request
   * @param {Object} request - Request Object
   * @param {Object} response - Response Object
   * @param {Function} next - Function call to move to next
   * @return {undefined}
   */
  static validateCreateRequest(request, response, next) {
    if (
      !Authenticator.verifyAdmin(request.decoded.roleId)
    ) {
      ResponseHandler.send403(
        response,
        { message: 'Only Admin Can Create Roles' }
      );
    } else if (request.body.id) {
      ResponseHandler.send400(
        response,
        { message: 'Role ID Not Allowed Allowed' }
      );
    } else {
      next();
    }
  }

  /**
   * Middleware to check and handle violation of Roles deletion
   * rules by the request
   * @param {Object} request - Request Object
   * @param {Object} response - Response Object
   * @param {Function} next - Function call to move to next
   * @return {undefined}
   */
  static validateDeleteRequest(request, response, next) {
    const requesterId = request.decoded.roleId;
    const deleteId = Number(request.params.id);
    if (
      !Authenticator.verifyAdmin(requesterId)
    ) {
      ResponseHandler.send403(
        response,
        { message: 'Admin Privilege Required' }
      );
    } else if (deleteId === 1 || deleteId === 2) {
      ResponseHandler.send403(
        response,
        { message: 'Cannot Delete Protected Roles' }
      );
    } else {
      next();
    }
  }

  /**
   * Middleware to check and handle violation of Roles update
   * rules by the request
   * @param {Object} request - Request Object
   * @param {Object} response - Response Object
   * @param {Function} next - Function call to move to next
   * @return {undefined}
   */
  static validateUpdateRequest(request, response, next) {
    const updateId = Number(request.params.id);
    if (!Authenticator.verifyAdmin(request.decoded.roleId)) {
      ResponseHandler.send403(
        response,
        { message: 'Admin Privilege Required' }
      );
    } else if (request.body.id) {
      ResponseHandler.send400(
        response,
        { message: 'Update Role ID Not Allowed' }
      );
    } else if (updateId === 1 || updateId === 2) {
      ResponseHandler.send403(
        response,
        { message: 'Cannot Update Protected Roles' }
      );
    } else {
      next();
    }
  }

  /**
   * Middleware to check and handle violation of get Roles
   * rules by the request
   * @param {Object} request - Request Object
   * @param {Object} response - Response Object
   * @param {Function} next - Function call to move to next
   * @return {undefined}
   */
  static validateGetRequest(request, response, next) {
    if (!Authenticator.verifyAdmin(request.decoded.roleId)) {
      ResponseHandler.send403(
        response,
        { message: 'Admin Privilege Required' }
      );
    } else if (request.query && Number(request.query.limit) < 1) {
      ResponseHandler.send400(
        response,
        { message: 'Invalid Limit' }
      );
    } else if (request.query && Number(request.query.offset) < 0) {
      ResponseHandler.send400(
        response,
        { message: 'Invalid Offset' }
      );
    } else {
      next();
    }
  }
}
