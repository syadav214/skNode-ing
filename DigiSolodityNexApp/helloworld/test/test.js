const HelloWorld = artifacts.require('../contracts/HelloWorld.sol');
const assert = require('assert');
let contractInstance = HelloWorld();
contract('HelloWorld', accounts => {
  it('should return a message', async () => {
    const todoContent = contractInstance.renderHelloWorld();

    assert.equal(todoContent, 'helloWorld');
  });
});
