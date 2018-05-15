'use strict';

import expectThrow from './helpers/expectThrow';

const VulnerableOne = artifacts.require('VulnerableOne.sol');



contract('VulnerableOne', function(accounts) {

    it('test constructor', async function() {
        const token1 = await VulnerableOne.new();
    });

    



});
