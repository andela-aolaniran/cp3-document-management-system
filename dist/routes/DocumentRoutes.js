'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DocumentController = require('../controllers/DocumentController');

var _DocumentController2 = _interopRequireDefault(_DocumentController);

var _Authenticator = require('../middlewares/Authenticator');

var _Authenticator2 = _interopRequireDefault(_Authenticator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DocumentRoutes = function () {
  function DocumentRoutes() {
    _classCallCheck(this, DocumentRoutes);
  }

  _createClass(DocumentRoutes, null, [{
    key: 'setDocumentRoutes',

    /**
     * Method to set the various document routes
     * @param{Object} app - Express app
     * @return{Void}
     */
    value: function setDocumentRoutes(app) {
      // use autentication middleware
      app.use(_Authenticator2.default.authenticateUser);

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
     * @return{Void}
     */

  }, {
    key: 'getDocuments',
    value: function getDocuments(app) {
      app.get('/api/documents', _DocumentController2.default.fetchDocuments);
    }

    /**
     * Method to set controller for fetch document route
     * @param{Object} app - Express app
     * @return{Void}
     */

  }, {
    key: 'getDocument',
    value: function getDocument(app) {
      app.get('/api/documents/:id', _DocumentController2.default.fetchDocument);
    }

    /**
     * Method to set controller for create a document route
     * @param{Object} app - Express app
     * @return{Void}
     */

  }, {
    key: 'createDocument',
    value: function createDocument(app) {
      app.post('/api/documents', _DocumentController2.default.createDocument);
    }

    /**
     * Method to set controller for update documents route
     * @param{Object} app - Express app
     * @return{Void}
     */

  }, {
    key: 'updateDocument',
    value: function updateDocument(app) {
      app.put('/api/documents/:id', _DocumentController2.default.updateDocument);
    }

    /**
     * Method to set controller for delete document route
     * @param{Object} app - Express app
     * @return{Void}
     */

  }, {
    key: 'deleteDocument',
    value: function deleteDocument(app) {
      app.delete('/api/documents/:id', _DocumentController2.default.deleteDocument);
    }
  }]);

  return DocumentRoutes;
}();

exports.default = DocumentRoutes;