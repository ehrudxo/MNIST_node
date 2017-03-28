const assert = require('assert')
const MNIST = require('../src/MNIST')
const imageSize = 100;//60000 가능

describe('MNIST',function(){
  it('size matches',function(){
    MNIST.parse(imageSize);
    assert.equal( imageSize, MNIST.images.length);
  })
  it('save image ',function(){
     assert.equal(imageSize,MNIST.save());
  })
})
