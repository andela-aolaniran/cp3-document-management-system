import database from '../models';
const documentDb = database.Document;

/**
 * Document controller 
 */
class DocumentController {
  /**
   * Controller method create a new Document
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - returns void
   */
  static createDocument(request, response){
    if (request.body &&
        request.body.title &&
        request.body.content &&
        request.decoded.userId) {
      const document = {
        title: request.body.title,
        content: request.body.content,
        ownerId: request.decoded.userId
      };
      documentDb.create(document)
      .then((createdDocument) => {
        response.status(201).json({
          success: true,
          message: `${createdDocument.title} Successfully Created`
        });
      })
      .catch((error) => {
        response.status(400).json({
          success: false,
          message: error.message
        });
      });
    } else {
      response.status(400).json({
        success: false,
        message: 'Required Fields are missing'
      });
    }
    
  }

  /**
   * Controller method update a Document
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - returns void
   */
  static updateDocument(request, response){
    documentDb.update(request.body, {
      where: {
        id: request.params.id
      }
    })
    .then((update) => {
      if (update[0] === 1) {
        response.status(200).json(update);
      } else {
        response.status(400).json({
          success: false,
          message: 'Could not update the specified document'
        });
      }
    })
    .catch((error) => {
      response.status(400).json({
        success: false,
        message: error.message
      });
    });
  }

  /**
   * Controller method fetch a specific Document
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - returns void
   */
  static fetchDocument(request, response){
    const id = request.params.id;
    const ownerId = request.decoded.id;
    documentDb.findOne({
      where: {
        id,
        ownerId
      }
    })
    .then((document) => {
      if(document) {
        response.status(200).json(document);
      } else {
        response.status(400).json({
          success: false,
          message: 'No Document found'
        });
      }
    })
    .catch((error) => {
      response.status(400).json({
        success: false,
        message: error.message
      });
    });
  }

  /**
   * Controller method to fetch all documents
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - returns void
   */
  static fetchDocuments(request, response){
    documentDb.findAll({
      where: {
        ownerId: request.decoded.userId
      },
      attributes: ['id', 'ownerId', 'title', 'content']
    })
    .then((documents) => {
      if (documents) {
        response.status(200).json(documents);
      } else {
        response.status(400).json({
          success: false,
          message: 'Documents not found'
        });
      }
    })
    .catch((error) => {
      response.status(400).json({
        success: false,
        message: error.message
      });
    });
  }

  /**
   * Controller method delete a specific Document
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - returns void
   */
  static deleteDocument(request, response){
    documentDb.destroy({
      where: {
        id: request.params.id,
        ownerId: request.decoded.userId
      }
    })
    .then((status) => {
      if (status) {
        response.status(200).json({
          success: true,
          message: 'Document Deleted Successfully'
        });
      } else {
        response.status(400).json({
          success: false,
          message: 'Deletion Failed'
        });
      }
    })
    .catch((error) => {
      response.status(400).json({
        success: false,
        message: error.message
      });
    });
  }
}

export default DocumentController;