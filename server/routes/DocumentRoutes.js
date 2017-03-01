import DocumentController from '../controllers/DocumentController';
import Authenticator from '../middlewares/Authenticator';

/**
 * Class for creating Document routes
 */
class DocumentRoutes {
  /**
   * Method to set the various document routes
   * @param{Object} router - Express router
   * @return{Void} - returns Void
   */
  static setDocumentRoutes(router) {
    DocumentRoutes.getDocuments(router);
    DocumentRoutes.getDocument(router);
    DocumentRoutes.createDocument(router);
    DocumentRoutes.updateDocument(router);
    DocumentRoutes.deleteDocument(router);
    DocumentRoutes.fetchUserDocuments(router);
  }


  /**
   * Method to set up route for fetching all specified user documents
   * @param{Object} router - Express router
   * @return{Void} - Returns Void
   */
  static fetchUserDocuments(router) {
    router.get(
      '/api/users/:id/documents',
      Authenticator.authenticateUser,
      DocumentController.fetchUserDocuments
    );
  }

  /**
   * Method to set controller for fetch documents route
   * @param{Object} router - Express router
   * @return{Void} - Returns void
   */
  static getDocuments(router) {
    router.get(
      '/api/documents',
      Authenticator.authenticateUser,
      DocumentController.fetchDocuments
    );
  }

  /**
   * Method to set controller for fetch document route
   * @param{Object} router - Express router
   * @return{Void} - Returns void
   */
  static getDocument(router) {
    router.get(
      '/api/documents/:id',
      Authenticator.authenticateUser,
      DocumentController.fetchDocument
    );
  }

  /**
   * Method to set controller for create a document route
   * @param{Object} router - Express router
   * @return{Void}  - Returns void
   */
  static createDocument(router) {
    router.post(
      '/api/documents',
      Authenticator.authenticateUser,
      DocumentController.createDocument
    );
  }

  /**
   * Method to set controller for update documents route
   * @param{Object} router - Express router
   * @return{Void} - Returns void
   */
  static updateDocument(router) {
    router.put(
      '/api/documents/:id',
      Authenticator.authenticateUser,
      DocumentController.updateDocument
    );
  }

  /**
   * Method to set controller for delete document route
   * @param{Object} router - Express router
   * @return{Void} - Returns void
   */
  static deleteDocument(router) {
    router.delete(
      '/api/documents/:id',
      Authenticator.authenticateUser,
      DocumentController.deleteDocument
    );
  }
}

export default DocumentRoutes;
