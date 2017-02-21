import database from '../models';

const documentDb = database.Document;
const userDB = database.User;

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
        response.status(201).json({
          success: true,
          message: `${createdDocument.dataValues.title} Successfully Created`,
          document: createdDocument.dataValues
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
  static updateDocument(request, response) {
    const ownerId = request.decoded.userId;
    documentDb.update(request.body, {
      where: {
        id: request.params.id,
        ownerId: ownerId
      }
    })
    .then((update) => {
      if (update[0] === 1) {
        response.status(200).json({
          success: true,
          message: 'Document Updated'
        });
      } else {
        response.status(404).json({
          success: false,
          message: 'Could not update the specified document'
        });
      }
    })
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
    .then((result) => {
      const document = result ? result.dataValues : null;
      if (document) {
        // lets chceck required access
        // For an Admin, return documents without checking required access
        if (requesterRoleId === 1) {
          response.status(200).json({
            success: true,
            message: 'Document Found',
            document
          });
          // for other users, ensure they have appropriate access rights
        } else if (
          (document.access === 'public'
          || requesterRoleId === document.User.dataValues.roleId)
          && document.access !== 'private') {
          response.status(200).json({
            success: true,
            message: 'Document Found',
            document
          });
        } else if (document.ownerId === requesterId) {
          response.status(200).json({
            success: true,
            message: 'Document Found',
            document
          });
        } else {
          response.status(403).json({
            success: false,
            message: 'Appropriate access is required to view this document'
          });
        }
      } else {
        response.status(400).json({
          success: false,
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
    const requesterRoleId = request.decoded.roleId;
    const requesterId = request.decoded.userId;
    const queryBuilder = {
      attributes: ['id', 'ownerId', 'access', 'title', 'content', 'createdAt'],
      include: [{
        model: database.User,
        attributes: ['roleId']
      }]
    };
    queryBuilder.order = '"createdAt" DESC';
    if (limit) {
      queryBuilder.limit = limit;
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
    .then((results) => {
      if (results) {
        const actualDocuments = [];
        results.forEach((document) => {
          if (requesterRoleId === 1) {
            actualDocuments.push(document.dataValues);
          // for other users, ensure they have appropriate access rights
          } else if (
            (document.access === 'public'
            || requesterRoleId === document.User.dataValues.roleId)
            && document.access !== 'private') {
            actualDocuments.push(document.dataValues);
          } else if (document.access === 'private'
            && document.ownerId === requesterId) {
            actualDocuments.push(document.dataValues);
          }
        });
        response.status(200).json({
          success: true,
          message: 'Documents Fetched',
          documents: actualDocuments
        });
      } else {
        response.status(400).json({
          success: false,
          message: 'Documents not found'
        });
      }
    })
    .catch((error) => {
      response.status(500).json({
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
  static deleteDocument(request, response) {
    documentDb.destroy({
      where: {
        id: request.params.id,
        ownerId: request.decoded.userId
      }
    })
    .then(status => {
      console.log('status: ', status);
      response.status(200).json({
        success: true,
        message: status
      });
    })
    .catch((error) => {
      response.status(404).json({
        success: false,
        message: error.message
      });
    });
  }

  /**
   * Method to fetch all documents of a specific user
   * @param{Object} request - Request object
   * @param{Object} response - Response object
   * @return{Void} - returns void
   */
  static fetchUserDocuments(request, response) {
    const id = +request.params.id;
    if(request.decoded.userId === id) {
      documentDb.findAll({
        where: {
          ownerId: id
        } 
      })
      .then(documents => {
        //console.log('documents: ', documents)
        if(documents.length > 0) {
          response.status(200).json(documents);
        } else {
          response.status(404).json({
            success: false,
            message: 'No Documents found for this user'
          });
        }
      });
    } else {
      // only owner of documents should access this
      response.status(403).json({
        success: false,
        message: 'Forbidden'
      });
    }
  }
}

export default DocumentController;
