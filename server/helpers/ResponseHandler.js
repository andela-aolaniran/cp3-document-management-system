/**
 * Helper class for Response related actions
 */
export default class ResponseHandler {
  /**
   * Method to send a response to a requester of a resource
   * @param {Object} response - Response Object
   * @param {Number} statusCode - status code for this response
   * @param {Object} body - Object to be contained in the response body
   * @return {Object} - sent Response object
   */
  static sendResponse(response, statusCode, body) {
    return response.status(statusCode).send(body);
  }

  /**
   * Method to send a 403 (Bad request) error response
   * @param {Object} response - Response Object
   * @param {*} body - Object to be contained in the response body,
   * or a default message object if it is not passed as an argument
   * @return{Object} - sent Response Object
   */
  static send400(response, body) {
    const message = body || { message: 'Bad Request' };
    return ResponseHandler.sendResponse(response, 400, message);
  }

  /**
   * Method to send a 401 (Authorization failure) error response
   * @param {Object} response - Response Object
   * @param {*} body - Object to be contained in the response body,
   * or a default message object if it is not passed as an argument
   * @return{Object} - sent Response Object
   */
  static send401(response, body) {
    const message = body || { message: 'Authorization Failed' };
    return ResponseHandler.sendResponse(response, 401, message);
  }

  /**
   * Method to send a 403 (Request forbidden) error response
   * @param {Object} response - Response Object
   * @param {*} body - Object to be contained in the response body,
   * or a default message object if it is not passed as an argument
   * @return{Object} - sent Response Object
   */
  static send403(response, body) {
    const message = body || { message: 'Resource(s) Not Found' };
    return ResponseHandler.sendResponse(response, 403, message);
  }

  /**
   * Method to send a 404 (Resource not found) error response
   * @param {Object} response - Response Object
   * @param {*} body - Object to be contained in the response body,
   * or a default message object if it is not passed as an argument
   * @return{Object} - sent Response Object
   */
  static send404(response, body) {
    const message = body || { message: 'Resource(s) Not Found' };
    return ResponseHandler.sendResponse(response, 404, message);
  }
}
