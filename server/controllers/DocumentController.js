import database from '../models';
import Authenticator from '../middlewares/Authenticator';

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
  static createDocument(request, response) {
    if (request.body &&
        request.body.title &&
        request.body.content &&
        request.decoded.userId) {
      const document = {
        title: request.body.title,
        content: request.body.content,
        ownerId: request.decoded.userId,
        ownerRoleId: request.decoded.roleId,
        access: request.body.access || 'public' // default access
      };
      documentDb.create(document)
      .then((createdDocument) => {
        response.status(201).json(createdDocument);
      })
      .catch((error) => {
        response.status(400).send(error.errors);
      });
    } else {
      response.status(400).json({
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
      },
      include: [{
        model: database.User,
        attributes: ['roleId']
      }]
    })
    .then((document) => {
      if (document) {
        // lets chceck required access
        // For an Admin, return documents without checking required access
        if (Authenticator.verifyAdmin(requesterRoleId)) {
          response.status(200).json(document);
          // for other users, ensure they have appropriate access rights
        } else if (
          (document.access === 'public'
          || (document.User && requesterRoleId === document.User.roleId))
          && document.access !== 'private') {
          response.status(200).json(document);
        } else if (document.ownerId === requesterId) {
          response.status(200).json(document);
        } else {
          response.status(403).json({
            message: 'Appropriate access is required to view this document'
          });
        }
      } else {
        response.status(404).json({
          message: 'No Document found'
        });
      }
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
    const requesterRoleId = request.decoded.roleId;
    const requesterId = request.decoded.userId;
    const queryBuilder = {
      attributes: ['id', 'ownerId', 'access', 'title', 'content', 'createdAt'],
      include: [{
        model: database.User,
        attributes: ['roleId']
      }],
      order: '"createdAt" DESC'
    };
    if (limit) {
      queryBuilder.limit = limit >= 0 ? limit : 0;
    }
    if (offset) {
      queryBuilder.offset = offset >= 0 ? offset : 0;
    }
    if (search) {
      queryBuilder.where = {
        $or: [{ title: {
          $like: `%${search}%` }
        }, { content: {
          $like: `%${search}%` }
        }]
      };
    }
    documentDb.findAll(queryBuilder)
    .then((fetchedDocments) => {
      if (fetchedDocments.length > 0) {
        const accessedDocuments = fetchedDocments.filter((document) => {
          if (Authenticator.verifyAdmin(requesterId)) {
            return true;
          // for other users, ensure they have appropriate access rights
          } else if (
            (document.access === 'public'
            || (document.User && requesterRoleId === document.User.roleId))
            && document.access !== 'private') {
            return true;
          } else if (document.access === 'private'
            && document.ownerId === requesterId) {
            return true;
          }
          return false;
        });
        response.status(200).json(accessedDocuments);
      } else {
        response.status(404).json({
          message: 'Documents not found'
        });
      }
    })
    .catch((error) => {
      response.status(500).json({
        message: error.errors
      });
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
            response.status(200).json({
              message: 'Document deleted'
            });
          });
        } else {
          response.status(403).json({
            message: 'You do not have access to delete other users document'
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
   * Method to fetch all documents of a specific user
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
   */
  static fetchUserDocuments(request, response) {
    const id = Number(request.params.id);
    const requesterId = request.decoded.userId;
    if (requesterId === id || Authenticator.verifyAdmin(requesterId)) {
      documentDb.findAll({
        where: {
          ownerId: id
        }
      })
      .then((documents) => {
        if (documents.length > 0) {
          response.status(200).json(documents);
        } else {
          response.status(404).json({
            message: 'No Documents found for this user'
          });
        }
      });
    } else {
      // only owner of documents should access this
      response.status(403).json({
        message: 'Appropriate access is required to view these documents'
      });
    }
  }
}

export default DocumentController;
