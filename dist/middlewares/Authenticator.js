'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // fetch dependencies


var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var usersDB = _models2.default.Users;

/**
 * Class to implement authentication middlewares
 */

var Authenticator = function () {
  function Authenticator() {
    _classCallCheck(this, Authenticator);
  }

  _createClass(Authenticator, null, [{
    key: 'authenticateUser',

    /**
     * Method to authenticate a user before proceeding
     * to protected routes
     */
    value: function authenticateUser(request, response, next) {
      //console.log('Authenticator called');
      response.send('fuck it');
      //next();
    }
  }]);

  return Authenticator;
}();

exports.default = Authenticator;