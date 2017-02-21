import UserController from '../controllers/UserController';
import Authenticator from '../middlewares/Authenticator';

/**
 * Class to create an instance of a UserRoutes Object
 * and set up all routes associated with a user object
 * for an express router
 */
class UserRoutes {
  /**
   * Method to set all User routes
   * @param{Object} router - Express router
   * @returns{Void} - Returns Void
   */
  static setUserRoutes(router) {
    UserRoutes.createUser(router);
    UserRoutes.loginUser(router);
    UserRoutes.logoutUser(router);
    UserRoutes.fetchUser(router);
    UserRoutes.fetchUsers(router);
    UserRoutes.updateUser(router);
    UserRoutes.deleteUser(router);
  }

  /**
   * Method to set up route for requests to create a new user
   * @param{Object} router - Express router
   * @return{Void} - Returns Void
   */
  static createUser(router) {
    router.post(
      '/api/users/',
      UserController.createUser
      );
  }

  /**
   * Method to set up route for user login requests
   * @param{Object} router - Express router
   * @return{Void} - Returns Void
   */
  static loginUser(router) {
    router.post(
      '/api/users/login',
      UserController.loginUser
    );
  }

  /**
   * Method to set up route for user logout requests
   * @param{Object} router - Express router
   * @return{Void} - Returns Void
   */
  static logoutUser(router) {
    router.post(
      '/api/users/logout',
      Authenticator.authenticateUser,
      UserController.logoutUser
    );
  }

  /**
   * Method to set up route for fetching users
   * @param{Object} router - Express router
   * @return{Void} - Returns Void
   */
  static fetchUsers(router) {
    router.get(
      '/api/users/',
      Authenticator.authenticateUser,
      Authenticator.verifyAdmin,
      UserController.fetchUsers
    );
  }


  /**
   * Method to set up route for fetching a specific user
   * @param{Object} router - Express router
   * @return{Void} - Returns Void
   */
  static fetchUser(router) {
    router.get(
      '/api/users/:id',
      Authenticator.authenticateUser,
      Authenticator.verifyAdmin,
      UserController.fetchUser
    );
  }

  /**
   * Method to set up route for updating user fields
   * @param{Object} router - Express router
   * @return{Void} - Returns Void
   */
  static updateUser(router) {
    router.put(
      '/api/users/:id',
      Authenticator.authenticateUser,
      UserController.updateUser
    );
  }

  /**
   * Method to set up route for delete user requests
   * @param{Object} router - Express router
   * @return{Void} - Returns Void
   */
  static deleteUser(router) {
    router.delete(
      '/api/users/:id',
      Authenticator.authenticateUser,
      Authenticator.verifyAdmin,
      UserController.deleteUser
    );
  }
}

export default UserRoutes;
