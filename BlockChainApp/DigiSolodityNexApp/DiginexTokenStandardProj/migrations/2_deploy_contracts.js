var DiginexToken = artifacts.require('DiginexToken');

module.exports = function(deployer) {
  deployer.deploy(DiginexToken);
};
