// fetch our dependencies
import UserController from '../controllers/UserController';
import Authenticator from '../middlewares/Authenticator';

/**
 * Class to create an instance of a UserRoutes Object
 * and set up all routes associated with a user object
 * for an express application
 */
class UserRoutes {
  /**
   * Method to set all User routes
   * @param{Object} app - Express application
   * @returns{Void} - Returns Void
   */
  static setUserRoutes(app) {
    UserRoutes.createUser(app);
    UserRoutes.loginUser(app);

    // setup authentication before protected routes
    app.use(Authenticator.authenticateUser);
    UserRoutes.logoutUser(app);
    UserRoutes.fetchUser(app);
    UserRoutes.fetchUsers(app);
    UserRoutes.updateUser(app);
    UserRoutes.deleteUser(app);
    UserRoutes.fetchUserDocuments(app);
  }

  /**
   * Method to set up route for requests to create a new user
   * @param{Object} app - Express application
   * @return{Void} - Returns Void
   */
  static createUser(app) {
    app.post('/api/users/', UserController.createUser);
  }

  /**
   * Method to set up route for user login requests
   * @param{Object} app - Express application
   * @return{Void} - Returns Void
   */
  static loginUser(app) {
    app.post('/api/users/login', UserController.loginUser);
  }

  /**
   * Method to set up route for user logout requests
   * @param{Object} app - Express application
   * @return{Void} - Returns Void
   */
  static logoutUser(app) {
    app.post('/api/users/logout', UserController.logoutUser);
  }

  /**
   * Method to set up route for fetching users
   * @param{Object} app - Express application
   * @return{Void} - Returns Void
   */
  static fetchUsers(app) {
    app.get('/api/users/', Authenticator.verifyAdmin,
      UserController.fetchUsers);
  }


  /**
   * Method to set up route for fetching a specific user
   * @param{Object} app - Express application
   * @return{Void} - Returns Void
   */
  static fetchUser(app) {
    app.get('/api/users/:id', Authenticator.verifyAdmin,
      UserController.fetchUser);
  }

  /**
   * Method to set up route for updating user fields
   * @param{Object} app - Express application
   * @return{Void} - Returns Void
   */
  static updateUser(app) {
    app.put('/api/users/:id', UserController.updateUser);
  }

  /**
   * Method to set up route for delete user requests
   * @param{Object} app - Express application
   * @return{Void} - Returns Void
   */
  static deleteUser(app) {
    app.delete('/api/users/:id',
      Authenticator.verifyAdmin,
      UserController.deleteUser);
  }

  /**
   * Method to set up route for fetching all specified user documents
   * @param{Object} app - Express application
   * @return{Void} - Returns Void
   */
  static fetchUserDocuments(app) {
    app.get('/api/users/:id/documents', UserController.fetchUserDocuments);
  }
}

export default UserRoutes;
