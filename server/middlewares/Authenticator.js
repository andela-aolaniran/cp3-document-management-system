import jwt from 'jsonwebtoken';
import ResponseHandler from '../helpers/ResponseHandler';
import database from '../models';

const SECRET_KEY = `${process.env.SECRET_KEY}`;
const userDb = database.User;

/**
 * Class to implement authentication middlewares
 */
class Authenticator {

  /**
   * Method to get token from a request object
   * @param {Object} request - Request Object
   * @return {Object} - returns the token if it is present in the
   * request, otherwise returns undefined
   */
  static getTokenInRequest(request) {
    const token = request.headers.authorization ||
      request.body.token ||
      request.headers['x-access-token'];
    return token;
  }

  /**
   * Method to set this users active token
   * @param {Object} user - User model object
   * @param {String} activeToken - active token to be set for this user
   * @return {Promise} - Promise object
   */
  static setUserActiveToken(user, activeToken) {
    return user.update({ activeToken });
  }

  /**
   * Method to verify a token and return the decoded object
   * @param {Object} token - Token to be verified
   * @return{Object|null} - returns decoded object if the token is
   * valid, otherwise returns null
   */
  static verifyToken(token) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return null;
    }
  }

  /**
   * Method to authenticate a user token before proceeding
   * to protected routes
   * @param {Object} request - The request Object
   * @param {Object} response - The response Object
   * @param {Function} next - Function call to move to the next middleware
   * or endpoint controller
   * @return {undefined} - Returns undefined
   */
  static authenticateUser(request, response, next) {
    const token = Authenticator.getTokenInRequest(request);
    if (token) {
      const decoded = Authenticator.verifyToken(token);
      if (decoded) {
        userDb.findById(decoded.userId, {
          attributes: ['activeToken', 'roleId']
        })
        .then((user) => {
          if (user && user.activeToken === token) {
            request.decoded = decoded;
            request.decoded.roleId = user.roleId;
            next();
          } else {
            ResponseHandler.send401(
              response,
              { message: 'Invalid Authentication Token' }
            );
          }
        });
      } else {
        ResponseHandler.send401(
          response,
          { message: 'Invalid Authentication Token' }
        );
      }
    } else {
      ResponseHandler.send401(
        response,
        { message: 'Authentication Token Required' }
      );
    }
  }

  /**
   * Method to generate a token for a user
   * @param{Object} user - User Object
   * @return{String} - Token string
   */
  static generateToken(user) {
    return jwt.sign({
      userId: user.id
    },
    SECRET_KEY,
    { expiresIn: '2 days' });
  }

  /**
   * Method to verify that user is an Admin
   * @param{Number} roleId - id (integer) of the role to be tested
   * @return{Boolean} - true if roleId corresponds to an admin id,
   * otherwise false
   */
  static verifyAdmin(roleId) {
    return Number(roleId) === 1;
  }
}

export default Authenticator;
