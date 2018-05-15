'use strict';

import expectThrow from './helpers/expectThrow';

const VulnerableOne = artifacts.require('VulnerableOne.sol');



contract('VulnerableOne', function(accounts) {

    it('constructor', async function() {
        const token1 = await VulnerableOne.new();
    });

    it('add new user', async function() {
        const token1 = await VulnerableOne.new();
        await token1.add_new_user(accounts[1]);
        await token1.add_new_user(accounts[2]);
        await token1.add_new_user(accounts[3]);
        await token1.add_new_user(accounts[4]);
    });

    it('remove user', async function() {
        const token1 = await VulnerableOne.new();
        await token1.add_new_user(accounts[1]);
        await token1.add_new_user(accounts[2]);
        await token1.add_new_user(accounts[3]);
        await token1.add_new_user(accounts[4]);

        await token1.remove_user(accounts[2]);
    });

    it('remove last user', async function() {
        const token1 = await VulnerableOne.new();
        await token1.add_new_user(accounts[1]);
        await token1.add_new_user(accounts[2]);
        await token1.add_new_user(accounts[3]);
        await token1.add_new_user(accounts[4]);

        await token1.remove_user(accounts[4]);
    });
    it('set super user', async function() {
        const token1 = await VulnerableOne.new();
        await token1.set_super_user(accounts[1]);
    });
    it('pay', async function() {
        const token1 = await VulnerableOne.new();
        await token1.pay();
    });
    it('withdraw', async function() {
        const token1 = await VulnerableOne.new();
        await token1.withdraw();
    });
    it('get_user_balance', async function() {
        const token1 = await VulnerableOne.new();
        await token1.get_user_balance(accounts[0]);
    });



    



});
