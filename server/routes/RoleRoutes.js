import RoleController from '../controllers/RoleController';
import Authenticator from '../middlewares/Authenticator';

/**
 * Class for creating Role routes
 */
class RoleRoutes {
  
  /**
   * Method to hook up all routes to respective endpoints
   * @param{Object} app - Express app
   * @return{Void} returns void
   */
  static setRoleRoutes(app){
    app.use(Authenticator.authenticateUser);
    RoleRoutes.getRole(app);
    RoleRoutes.getRoles(app);
    RoleRoutes.createRole(app);
    RoleRoutes.deleteRole(app);
    RoleRoutes.updateRole(app);
  }

  /**
   * Method to setup Route for deleting a specified role
   * @param{Object} app - Express app
   * @return{Void} returns void
   */
  static getRoles(app) {
    app.get('/api/roles', RoleController.fetchRoles)
  }

  /**
   * Method to setup Route for deleting a specified role
   * @param{Object} app - Express app
   * @return{Void} returns void
   */
  static getRole(app) {
    app.get('/api/roles/:id', RoleController.fetchRole);
  }

  /**
   * Method to setup Route for deleting a specified role
   * @param{Object} app - Express app
   * @return{Void} returns void
   */
  static createRole(app) {
    app.post('/api/roles', RoleController.createRole);
  }

  /**
   * Method to setup Route for deleting a specified role
   * @param{Object} app - Express app
   * @return{Void} returns void
   */
  static updateRole(app) {
    app.put('/api/roles/:id', RoleController.updateRole);
  }

  /**
   * Method to setup Route for deleting a specified role
   * @param{Object} app - Express app
   * @return{Void} returns void
   */
  static deleteRole(app) {
    app.delete('/api/roles/:id', RoleController.deleteRole);
  }
}

export default RoleRoutes;