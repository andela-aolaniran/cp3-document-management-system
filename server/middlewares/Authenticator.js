// fetch dependencies
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'jwt_cp2_dms';

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
      request.headers['x-access-token'] ||
      request.body.token;
    if (token) {
      jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if (error) {
          response.status(401).json({ 
            status: 'Failed',
            message: 'Authentication failed due to invalid token!' 
          });
        } else { 
          request.decoded = decoded;
          next();
        }
      });
    } else {
      response.status(401).json({
        status: 'Failed',
        message: 'Authentication required for this route'
      });
    }
  }
}

export default Authenticator;