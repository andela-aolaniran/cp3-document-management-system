// fetch dependencies
import jwt from 'jsonwebtoken';
import database from '../models';

const usersDB = database.Users;

/**
 * Class to implement authentication middlewares
 */
class Authenticator {
  /**
   * Method to authenticate a user before proceeding
   * to protected routes
   */
  static authenticateUser(request, response, next) {
    //console.log('Authenticator called');
    response.send('fuck it');
    //next();
  }
}

export default Authenticator;