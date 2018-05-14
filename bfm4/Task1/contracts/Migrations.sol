pragma solidity ^0.4.4;


contract Migrations {
    address public owner;
    uint public last_completed_migration;

    modifier restricted() {
        if (msg.sender == owner) _;
    }

<<<<<<< HEAD
    function Migrations() public {
=======
    constructor() public {
>>>>>>> 5c58177393be5a97a72b6fb0ee6411919ecac5b2
        owner = msg.sender;
    }

    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
    }

    function upgrade(address new_address) public restricted {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration);
    }
}
