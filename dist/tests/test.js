'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _example = require('../example');

var _example2 = _interopRequireDefault(_example);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mathX = new _example2.default();

var assert = _chai2.default.assert;

describe('This is just a test', function () {
  it('Should pass the test', function () {
    assert.strictEqual(mathX.name, 'MathX');
  });
});