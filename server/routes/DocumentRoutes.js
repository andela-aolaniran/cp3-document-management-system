import DocumentController from '../controllers/DocumentController';
import Authenticator from '../middlewares/Authenticator'

class DocumentRoutes {
  /**
   * Method to set the various document routes
   * @param{Object} app - Express app
   * @return{Void}
   */
  static setDocumentRoutes(app) {
    // use autentication middleware
    app.use(Authenticator.authenticateUser);
    
    // proceed to other endpoints if authentication passes
    DocumentRoutes.getDocuments(app);
    DocumentRoutes.getDocument(app);
    DocumentRoutes.createDocument(app);
    DocumentRoutes.updateDocument(app);
    DocumentRoutes.deleteDocument(app);
  }

  /**
   * Method to set controller for fetch documents route
   * @param{Object} app - Express app
   * @return{Void} - Returns void
   */
  static getDocuments(app) {
    app.get('/api/documents', DocumentController.fetchDocuments);
  }

  /**
   * Method to set controller for fetch document route
   * @param{Object} app - Express app
   * @return{Void} - Returns void
   */
  static getDocument(app) {
    app.get('/api/documents/:id', DocumentController.fetchDocument);
  }

  /**
   * Method to set controller for create a document route
   * @param{Object} app - Express app
   * @return{Void}  - Returns void
   */
  static createDocument(app) {
    app.post('/api/documents', DocumentController.createDocument);
  }

  /**
   * Method to set controller for update documents route
   * @param{Object} app - Express app
   * @return{Void} - Returns void
   */
  static updateDocument(app) {
    app.put('/api/documents/:id', DocumentController.updateDocument);
  }

  /**
   * Method to set controller for delete document route
   * @param{Object} app - Express app
   * @return{Void} - Returns void
   */
  static deleteDocument(app) {
    app.delete('/api/documents/:id', DocumentController.deleteDocument);
  }
}

export default DocumentRoutes;