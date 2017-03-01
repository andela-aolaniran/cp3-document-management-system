import jwt from 'jsonwebtoken';
import database from '../models';

const SECRET_KEY = `${process.env.SECRET_KEY}`;
const userDb = database.User;

/**
 * Class to implement authentication middlewares
 */
class Authenticator {
  /**
   * Method to authenticate a user before proceeding
   * to protected routes
   * @param {Object} request - The request Object
   * @param {Object} response - The response Object
   * @param {Function} next - Function call to move to the next middleware
   * or endpoint controller
   * @return {Void} - Returns void
   */
  static authenticateUser(request, response, next) {
    const token = request.headers.authorization ||
      request.body.token ||
      request.headers['x-access-token'];
    if (token) {
      jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if (error) {
          response.status(401).json({
            message: 'Authentication failed due to invalid token!'
          });
        } else {
          const id = decoded.userId;
          userDb.findOne({
            where: { id },
            attributes: ['activeToken']
          })
          .then((user) => {
            const activeToken = user.activeToken;
            if (activeToken === token) {
              request.decoded = decoded;
              next();
            } else {
              response.status(401).json({
                message: 'Authentication failed due to expired token!'
              });
            }
          });
        }
      });
    } else {
      response.status(401).json({
        message: 'Authentication required for this route'
      });
    }
  }

  /**
   * Method to generate a token for a user
   * @param{Object} user - User Object
   * @return{String} - Token string
   */
  static generateToken(user) {
    return jwt.sign({
      userId: user.id,
      roleId: user.roleId
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
    return roleId === 1;
  }
}

export default Authenticator;
