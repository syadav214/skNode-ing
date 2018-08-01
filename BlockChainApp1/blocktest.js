const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timestamp,data,previoushash=''){
        this.index =index;
        this.timestamp = timestamp;
        this.data = data;
        this.previoushash = previoushash;
        this.hash=this.calculateHash();;
    }

    calculateHash() {
        return SHA256(this.index+this.previoushash,this.timestamp+JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0,'01/01/2017',"GenesisBlock","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){        
        newBlock.previoushash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}


let skCoin = new Blockchain();

var index = skCoin.getLatestBlock().index + 1;
var datetime = new Date().getTime();// / 1000;
skCoin.addBlock(new Block(index,datetime,{amount:4}));

index = skCoin.getLatestBlock().index + 1;
datetime = new Date().getTime();// / 1000;
skCoin.addBlock(new Block(index,datetime,{amount:10}));
console.log(JSON.stringify(skCoin));














