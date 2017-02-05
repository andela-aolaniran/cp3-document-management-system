// fetch dependencies
import jwt from 'jsonwebtoken';
import database from '../models';

const SECRET_KEY = 'jwt_cp2_dms';
const roleDb = database.Role;

/**
 * Class to implement authentication middlewares
 */
class Authenticator {
  /**
   * Method to authenticate a user before proceeding
   * to protected routes
   */
  static authenticateUser(request, response, next) {
    const token = request.headers.authorization ||
      request.body.token ||
      request.headers['x-access-token'];
    if (token) {
      jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if (error) {
          response.status(401).json({ 
            success: false,
            message: 'Authentication failed due to invalid token!' 
          });
        } else { 
          request.decoded = decoded;
          next();
        }
      });
    } else {
      response.status(401).json({
        success: false,
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
   * to access Admin endpoints
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @param{Object} next - Function to pass flow to the next controller
   * @return{Void} - returns Void
   */
  static verifyAdmin(request, response, next) {
    roleDb.findOne({
      where: {
        id: request.decoded.roleId
      }
    }).then((role) => {
      if (role.title === 'admin') {
        next();
      } else {
        response.status(401).json({
          success: false,
          message: 'Admin status required'
        });
      }
    })
    .catch((error) => {
      response.status(401).json({
        success: false,
        message: error.message
      });
    });
  }
}

export default Authenticator;