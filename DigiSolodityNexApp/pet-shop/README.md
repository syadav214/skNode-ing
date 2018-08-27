# Creating contract with truffle and solidity

```bash
    $ npm install -g truffle
    $ mkdir pet-shop
    $ cd pet-shop
    $ truffle init
    # create a file in contracts for a new contract
    $ truffle compile
    # run ganache-cli in a separate terminal
    $ ganache-cli
    # create a file in migration for the contract
    # basic truffle config with network
    networks: {
        development: {
        host: '127.0.0.1',
        port: 8545,
        network_id: '*' // Match any network id
        }
    }
    # migrate it
    $ truffle migrate
    # create a file in test folder
    $ truffle test
```
