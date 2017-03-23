import ResponseHandler from './ResponseHandler';

/**
 * Class to handle Errors and send appropriate
 * responses
 */
export default class ErrorHandler {

  /**
   * Message to help parse error messages supplied by Sequelize
   * @param {Array} errors - Array containing all error items from
   * from Sequelize
   * @return {Array} - Array containing parsed error messages
   */
  static parseErrors(errors) {
    return errors.map(error => ({ message: error.message }));
  }

  /**
   * Message to handle and send custom error messages
   * @param {Object} response - Response Object
   * @param {Object} error - Error Object from Sequlize
   * @return {Object} - Response Object
   */
  static handleRequestError(response, error) {
    switch (error.name) {

    case 'SequelizeUniqueConstraintError':
    case 'SequelizeValidationError' : {
      const customErrors = ErrorHandler.parseErrors(error.errors);
      return ResponseHandler.send400(response, customErrors);
    }
    case 'SequelizeForeignKeyConstraintError' : {
      return ResponseHandler.send400(
        response,
        { message: error.message }
      );
    }

    default: {
      return ResponseHandler.send400(response);
    }

    }
  }
}
