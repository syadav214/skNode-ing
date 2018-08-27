pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract DiginexToken is StandardToken {
    string public name = "Diginex Token";
    string public symbol = "DGT";
    uint8 public decimals = 18;
    uint public INITIAL_SUPPLY = 1000000;

    constructor() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }

}
