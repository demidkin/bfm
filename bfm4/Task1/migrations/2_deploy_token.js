'use strict';


const VulnerableOne = artifacts.require('bfm4_task1.sol');


module.exports = function(deployer, network) {
    deployer.deploy(VulnerableOne);
};
