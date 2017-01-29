// fetch our dependencies
import UsersController from '../controllers/UsersController';

/**
 * Class to create an instance of a UserRoutes Object
 * and set up all routes associated with a user object
 * for an express application
 */
class UsersRoutes {
  /**
   * Method to set all User routes
   * @param{Object} app - Express application
   * @returns{Void} - Returns Void
   */
  static setUserRoutes(app){
    UsersRoutes.createUser(app);
    // Todo, these routes should require authentication
    UsersRoutes.loginUser(app);
    UsersRoutes.logoutUser(app);
    UsersRoutes.fetchUser(app);
    UsersRoutes.fetchUsers(app);
    UsersRoutes.updateUser(app);
    UsersRoutes.deleteUser(app);
  }

  /**
   * Method to set up route for requests to create a new user
   * @param{Object} app - Express application
   * @return{Void} - Returns Void
   */
  static createUser(app){
    app.post('/api/users/', UsersController.createUser);
  }

  /**
   * Method to set up route for user login requests
   * @param{Object} app - Express application
   * @return{Void} - Returns Void
   */
  static loginUser(app){
    app.post('/api/users/login', UsersController.loginUser);
  }

  /**
   * Method to set up route for user logout requests
   * @param{Object} app - Express application
   * @return{Void} - Returns Void
   */
  static logoutUser(app){
    app.post('/api/users/logout', UsersController.logoutUser);
  }

  /**
   * Method to set up route for fetching users
   * @param{Object} app - Express application
   * @return{Void} - Returns Void
   */
  static fetchUsers(app){
    app.get('/api/users/', UsersController.fetchUsers);
  }


  /**
   * Method to set up route for fetching a specific user
   * @param{Object} app - Express application
   * @return{Void} - Returns Void
   */
  static fetchUser(app){
    app.get('/api/users/:id', UsersController.fetchUser);
  }

  /**
   * Method to set up route for updating user fields
   * @param{Object} app - Express application
   * @return{Void} - Returns Void
   */
  static updateUser(app){
    app.put('/api/users/:id', UsersController.updateUser);
  }

  /**
   * Method to set up route for delete user requests
   * @param{Object} app - Express application
   * @return{Void} - Returns Void
   */
  static deleteUser(app){
    app.delete('/api/users/:id', UsersController.deleteUser);
  }
}

export default UsersRoutes;