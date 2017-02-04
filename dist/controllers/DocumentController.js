'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var documentDb = _models2.default.Document;

/**
 * Document controller 
 */

var DocumentController = function () {
  function DocumentController() {
    _classCallCheck(this, DocumentController);
  }

  _createClass(DocumentController, null, [{
    key: 'createDocument',

    /**
     * Controller method create a new Document
     * @param{Object} request - Request Object
     * @param{Object} response - Response Object
     * @return{Void} - returns void
     */
    value: function createDocument(request, response) {
      if (request.body && request.body.title && request.body.content && request.decoded.userId) {
        var document = {
          title: request.body.title,
          content: request.body.content,
          ownerId: request.decoded.userId
        };
        documentDb.create(document).then(function (createdDocument) {
          response.status(201).json({
            success: true,
            message: createdDocument.title + ' Successfully Created'
          });
        }).catch(function (error) {
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

  }, {
    key: 'updateDocument',
    value: function updateDocument(request, response) {
      documentDb.update(request.body, {
        where: {
          id: request.params.id
        }
      }).then(function (update) {
        if (update[0] === 1) {
          response.status(200).json(update);
        } else {
          response.status(400).json({
            success: false,
            message: 'Could not update the specified document'
          });
        }
      }).catch(function (error) {
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

  }, {
    key: 'fetchDocument',
    value: function fetchDocument(request, response) {
      var id = request.params.id;
      var ownerId = request.decoded.id;
      documentDb.findOne({
        where: {
          id: id,
          ownerId: ownerId
        }
      }).then(function (document) {
        if (document) {
          response.status(200).json(document);
        } else {
          response.status(400).json({
            success: false,
            message: 'No Document found'
          });
        }
      }).catch(function (error) {
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

  }, {
    key: 'fetchDocuments',
    value: function fetchDocuments(request, response) {
      documentDb.findAll({
        where: {
          ownerId: request.decoded.userId
        },
        attributes: ['id', 'ownerId', 'title', 'content']
      }).then(function (documents) {
        if (documents) {
          response.status(200).json(documents);
        } else {
          response.status(400).json({
            success: false,
            message: 'Documents not found'
          });
        }
      }).catch(function (error) {
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

  }, {
    key: 'deleteDocument',
    value: function deleteDocument(request, response) {
      documentDb.destroy({
        where: {
          id: request.params.id,
          ownerId: request.decoded.userId
        }
      }).then(function (status) {
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
      }).catch(function (error) {
        response.status(400).json({
          success: false,
          message: error.message
        });
      });
    }
  }]);

  return DocumentController;
}();

exports.default = DocumentController;