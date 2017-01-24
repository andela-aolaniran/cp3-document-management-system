import chai from 'chai';
import MathX from '../example';
const mathX = new MathX();

const assert = chai.assert;

describe('This is just a test', () => {
  it('Should pass the test', () => {
    assert.strictEqual(mathX.name, 'MathX');
  })
});