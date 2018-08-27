var ganache = require('ganache-cli');
var server = ganache.server();
server.listen('8545', function(err, blockchain) {
  console.log(blockchain);
});
