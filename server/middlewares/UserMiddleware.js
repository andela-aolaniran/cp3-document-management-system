import ResponseHandler from '../helpers/ResponseHandler';
import Authenticator from './Authenticator';

/**
 * Middleware class to handle verify/check User related
 * requests
 */
export default class UserMiddleware {
  /**
   * Middleware to check and handle violation of user creation
   * rules by the request
   * @param {Object} request - Request Object
   * @param {Object} response - Response Object
   * @param {Function} next - Function call to move to next
   * @return {undefined}
   */
  static validateCreateRequest(request, response, next) {
    if (
      request.body.roleId &&
      Authenticator.verifyAdmin(request.body.roleId)
    ) {
      ResponseHandler.send403(
        response,
        { message: 'Cannot Create Admin User' }
      );
    } else if (request.body.id) {
      ResponseHandler.send400(
        response,
        { message: 'User ID Not Allowed Allowed' }
      );
    } else {
      next();
    }
  }

  /**
   * Middleware to check and handle violation of user deletion
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
      Authenticator.verifyAdmin(requesterId) &&
      deleteId !== requesterId
    ) {
      next();
    } else if (!Authenticator.verifyAdmin(requesterId)) {
      ResponseHandler.send403(
        response,
        { message: 'Admin Privilege Required' }
      );
    } else {
      ResponseHandler.send403(
        response,
        { message: 'Admin user cannot be deleted' }
      );
    }
  }

  /**
   * Middleware to check and handle violation of user update
   * rules by the request
   * @param {Object} request - Request Object
   * @param {Object} response - Response Object
   * @param {Function} next - Function call to move to next
   * @return {undefined}
   */
  static validateUpdateRequest(request, response, next) {
    const updateId = Number(request.params.id);
    if (Authenticator.verifyAdmin(request.body.roleId)) {
      ResponseHandler.send403(
        response,
        { message: 'Cannot update To Admin User' }
      );
    } else if (request.body.id) {
      ResponseHandler.send400(
        response,
        { message: 'Update User ID Not Allowed' }
      );
    } else if (
      request.decoded.userId === updateId ||
      Authenticator.verifyAdmin(request.decoded.roleId)
    ) {
      next();
    } else {
      ResponseHandler.send403(response);
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
    if (request.query && Number(request.query.limit) < 1) {
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
