# BlockChain

BlockChain in NodeJS

Trying out the Blockchain

Set up two connected nodes and mine 1 block
HTTP_PORT=3001 P2P_PORT=6001 npm start
HTTP_PORT=3002 P2P_PORT=6002 PEERS=ws://localhost:6001 npm start
curl -H "Content-type:application/json" --data '{"data" : "Some data to the first block"}' http://localhost:3001/mineBlock

Get blockchain
curl http://localhost:3001/blocks

Create block
curl -H "Content-type:application/json" --data '{"data" : "Some data to the first block"}' http://localhost:3001/mineBlock

Add peer
curl -H "Content-type:application/json" --data '{"peer" : "ws://localhost:6001"}' http://localhost:3001/addPeer

uery connected peers
curl http://localhost:3001/peers
