import ResponseHandler from '../helpers/ResponseHandler';

/**
 * Middleware class to handle verify/check Document related
 * requests
 */
export default class DocumentMiddleware {
  /**
   * Middleware to check and handle violation of document creation
   * rules by the request
   * @param {Object} request - Request Object
   * @param {Object} response - Response Object
   * @param {Function} next - Function call to move to next
   * @return {undefined}
   */
  static validateCreateRequest(request, response, next) {
    if (request.body.id) {
      ResponseHandler.send400(
        response,
        { message: 'Document ID Not Allowed' }
      );
    } else if (
      request.body &&
      request.body.title &&
      request.body.content
    ) {
      next();
    } else {
      ResponseHandler.send400(
        response,
        { message: 'Required Fields Missing' }
      );
    }
  }

  /**
   * Middleware to check and handle violation of get Documents
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
    } else if (request.query && Number(request.query.offset) < 1) {
      ResponseHandler.send400(
        response,
        { message: 'Invalid Offset' }
      );
    } else {
      next();
    }
  }
}
