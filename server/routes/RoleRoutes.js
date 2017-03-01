import RoleController from '../controllers/RoleController';
import Authenticator from '../middlewares/Authenticator';

/**
 * Class for creating Role routes
 */
class RoleRoutes {

  /**
   * Method to hook up all routes to respective endpoints
   * @param{Object} router - Express router
   * @return{Void} returns void
   */
  static setRoleRoutes(router) {
    RoleRoutes.getRole(router);
    RoleRoutes.getRoles(router);
    RoleRoutes.createRole(router);
    RoleRoutes.deleteRole(router);
    RoleRoutes.updateRole(router);
  }

  /**
   * Method to setup Route for deleting a specified role
   * @param{Object} router - Express router
   * @return{Void} returns void
   */
  static getRoles(router) {
    router.get(
      '/api/roles',
      Authenticator.authenticateUser,
      RoleController.fetchRoles
    );
  }

  /**
   * Method to setup Route for deleting a specified role
   * @param{Object} router - Express router
   * @return{Void} returns void
   */
  static getRole(router) {
    router.get(
      '/api/roles/:id',
      Authenticator.authenticateUser,
      RoleController.fetchRole
    );
  }

  /**
   * Method to setup Route for deleting a specified role
   * @param{Object} router - Express router
   * @return{Void} returns void
   */
  static createRole(router) {
    router.post(
      '/api/roles',
      Authenticator.authenticateUser,
      RoleController.createRole
    );
  }

  /**
   * Method to setup Route for deleting a specified role
   * @param{Object} router - Express router
   * @return{Void} returns void
   */
  static updateRole(router) {
    router.put(
      '/api/roles/:id',
      Authenticator.authenticateUser,
      RoleController.updateRole
    );
  }

  /**
   * Method to setup Route for deleting a specified role
   * @param{Object} router - Express router
   * @return{Void} returns void
   */
  static deleteRole(router) {
    router.delete(
      '/api/roles/:id',
      Authenticator.authenticateUser,
      RoleController.deleteRole);
  }
}

export default RoleRoutes;
