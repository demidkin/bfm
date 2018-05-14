'use strict';


const BreadCoin = artifacts.require('BreadCoin.sol');


module.exports = function(deployer, network) {
    deployer.deploy(BreadCoin);
};
