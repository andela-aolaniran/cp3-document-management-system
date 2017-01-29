'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Example class
 */
var MathX = function () {
  /**
   * Doc for this constructor
   */
  function MathX() {
    _classCallCheck(this, MathX);

    this.name = 'MathX';
  }

  /**
   * @param {Number} a - first operand
   * @param {Number} b - second operand
   * @return {Number} - The sum of the two numbers
   */


  _createClass(MathX, [{
    key: 'addNumbers',
    value: function addNumbers(a, b) {
      return a + b;
    }
  }]);

  return MathX;
}();

exports.default = MathX;