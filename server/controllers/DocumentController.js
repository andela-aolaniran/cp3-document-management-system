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
    if (request.body && request.body.title && request.body.content) {
      const document = {
        title: request.body.title,
        content: request.body.content,
        ownerId: request.decoded.UserId
      };
      documentDb.create(document)
      .then((createdDocument) => {
        response.status(201).json(createdDocument);
      })
      .catch((error) => {
        response.status(400).json(error.errors[0]);
      });
    } else {
      response.status(400).json({
        status: 'Failed',
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
          status: 'Failed',
          message: 'Could not update the specified document'
        });
      }
    })
    .catch((error) => {
      response.status(400).json(error);
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
    documentDb.findOne({where: {id}})
    .then((document) => {
      if(document) {
        response.status(200).json(document);
      } else {
        response.status(400).json({
          status: 'Failed',
          message: 'Cannont Find Document'
        });
      }
    })
    .catch((error) => {
      response.status(400).json(error.errors[0]);
    });
  }

  /**
   * Controller method to fetch all documents
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - returns void
   */
  static fetchDocuments(request, response){
    documentDb.findAll()
    .then((documents) => {
      if (documents) {
        response.status(200).json(documents);
      } else {
        response.status(400).json({
          status: 'Failed',
          message: 'Documents not found'
        });
      }
    })
    .catch((error) => {
      response.status(400).json({
        error
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
        id: request.params.id
      }
    })
    .then((status) => {
      if (status) {
        response.status(200).json(status);
      } else {
        response.status(400).json({
          status: 'Failed',
          message: 'Deletion Failed'
        });
      }
    })
    .catch((error) => {
      response.status(400).json(error);
    });
  }
}

export default DocumentController;