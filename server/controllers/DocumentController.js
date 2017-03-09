import database from '../models';
import ErrorHandler from '../helpers/ErrorHandler';
import ResponseHandler from '../helpers/ResponseHandler';
import Authenticator from '../middlewares/Authenticator';

const documentDb = database.Document;

/**
 * Document controller
 */
class DocumentController {

  /**
   * Method to fetch save fields from a Document object
   * @param {Object} document - Document object
   * @return {Object} - new User object containing fields
   * consider safe for public view
   */
  static getSafeDocumentFields(document) {
    return {
      id: document.id,
      title: document.title,
      content: document.content,
      ownerId: document.ownerId,
      access: document.access,
      createdAt: document.createdAt
    };
  }
  /**
   * Controller method create a new Document
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - returns void
   */
  static createDocument(request, response) {
    const document = {
      title: request.body.title,
      content: request.body.content,
      ownerId: request.decoded.userId,
      ownerRoleId: request.decoded.roleId,
      access: request.body.access || 'public'
    };
    documentDb.create(document)
    .then((createdDocument) => {
      ResponseHandler.sendResponse(
        response,
        201,
        DocumentController.getSafeDocumentFields(createdDocument)
      );
    })
    .catch((error) => {
      ErrorHandler.handleRequestError(response, error);
    });
  }

  /**
   * Controller method update a Document
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - returns void
   */
  static updateDocument(request, response) {
    const requesterId = request.decoded.userId;
    const requesterRoleId = request.decoded.roleId;
    const documentId = Number(request.params.id);
    documentDb.findById(documentId)
    .then((foundDocument) => {
      if (foundDocument) {
        if (foundDocument.ownerId === requesterId ||
        Authenticator.verifyAdmin(requesterRoleId)) {
          foundDocument.update(request.body)
          .then(() => {
            response.status(200).json({
              message: 'Document Updated'
            });
          });
        } else {
          response.status(403).json({
            message: 'You do not have access to update other users document'
          });
        }
      } else {
        response.status(404).json({
          message: 'Document was not found'
        });
      }
    });
  }

  /**
   * Controller method fetch a specific Document
   * Only an admin can fetch all documents regardless of their access type
   * Non-Admin users can only fetch their private documents and public documents
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - returns void
   */
  static fetchDocument(request, response) {
    const documentId = request.params.id;
    const requesterId = request.decoded.userId;
    const requesterRoleId = request.decoded.roleId;
    documentDb.findOne({
      where: {
        id: documentId
      }
    })
    .then((document) => {
      if (document) {
        // lets chceck required access
        if (
          (document.access === 'public'
          || (requesterRoleId === document.ownerRoleId))
          && document.access !== 'private') {
          ResponseHandler.sendResponse(
            response,
            200,
            DocumentController.getSafeDocumentFields(document)
          );
        } else if (
          document.ownerId === requesterId ||
          Authenticator.verifyAdmin(requesterRoleId)
        ) {
          ResponseHandler.sendResponse(
            response,
            200,
            DocumentController.getSafeDocumentFields(document)
          );
        } else {
          ResponseHandler.send403(
            response,
            { message: 'Need Appropriate Access Right' }
          );
        }
      } else {
        ResponseHandler.send404(
          response
        );
      }
    })
    .catch((error) => {
      ErrorHandler.handleRequestError(
        response,
        error
      );
    });
  }

  /**
   * Controller method to fetch all documents
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - returns void
   */
  static fetchDocuments(request, response) {
    const search = request.query.search;
    const limit = request.query.limit;
    const offset = request.query.offset;
    const page = request.query.page;
    const requesterRoleId = request.decoded.roleId;
    const requesterId = request.decoded.userId;
    const queryBuilder = {
      attributes: ['id', 'ownerId', 'access', 'title', 'content', 'createdAt'],
      order: request.query.order || '"createdAt" DESC'
    };
    if (limit) {
      queryBuilder.limit = limit;
    }
    if (offset) {
      queryBuilder.offset = offset;
    }
    if (page) {
      // override offset if a page is specified, and default limit is 10
      const pageLimit = limit || 10;
      queryBuilder.offset = (page * pageLimit) - pageLimit;
      queryBuilder.limit = pageLimit;
    }
    if (search) {
      const searchList = search.split(/\s+/);
      queryBuilder.where = {
        $or: [{ title: { $iLike: { $any: searchList } } },
        { content: { $iLike: { $any: searchList } } }]
      };
    }

    const accessFilter = Authenticator.verifyAdmin(requesterRoleId) ?
      [] : [
        { access: 'public' },
        { ownerId: requesterId },
        { $and: [
          { access: 'role' },
          { ownerRoleId: requesterRoleId }
        ] }
      ];

    const searchFilter = [
      {
        title: {
          $like: `%${search}%` }
      }, {
        content: {
          $like: `%${search}%` }
      }
    ];

    if (search) {
      queryBuilder.where = {
        $or: [...searchFilter, ...accessFilter]
      };
    } else if (!Authenticator.verifyAdmin(requesterRoleId)) {
      queryBuilder.where = {
        $or: [...accessFilter]
      };
    }

    documentDb.findAndCountAll(queryBuilder)
    .then((fetchedDocuments) => {
      if (fetchedDocuments.rows.length > 0) {
        ResponseHandler.sendResponse(
          response,
          200,
          {
            documents: fetchedDocuments.rows,
            total: fetchedDocuments.count
          }
        );
      } else {
        ResponseHandler.send404(response);
      }
    })
    .catch((error) => {
      ErrorHandler.handleRequestError(response, error);
    });
  }

  /**
   * Controller method delete a specific Document
   * @param{Object} request - Request Object
   * @param{Object} response - Response Object
   * @return{Void} - returns void
   */
  static deleteDocument(request, response) {
    const requesterId = request.decoded.userId;
    const requesterRoleId = request.decoded.roleId;
    const documentId = Number(request.params.id);
    documentDb.findById(documentId)
    .then((foundDocument) => {
      if (foundDocument) {
        if (foundDocument.ownerId === requesterId ||
        Authenticator.verifyAdmin(requesterRoleId)) {
          foundDocument.destroy()
          .then(() => {
            ResponseHandler.sendResponse(
              response,
              200,
              { message: 'Document Deleted' }
            );
          });
        } else {
          ResponseHandler.send403(
            response,
            { message: 'Deletion Of Other Users Document Not Allowed' }
          );
        }
      } else {
        ResponseHandler.send404(response);
      }
    });
  }
}

export default DocumentController;
