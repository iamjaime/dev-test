const { BN, ether, expectEvent, expectRevert, constants } = require('@openzeppelin/test-helpers');

const MyToken = artifacts.require("MyToken");

contract("MyToken", (accounts) => {

    console.log(accounts);


    before(async () => {
        myToken = await MyToken.deployed()
    });

    it("gives the owner of the token 20B tokens", async() => {
        let balance = await myToken.balanceOf(accounts[0]);
        balance = web3.utils.fromWei(balance, 'ether'); //converting from wei to ether
        console.log(balance);
        assert.equal(balance, '20000000000', "Balance should be 20B for contract creator");
    });

    it("can transfer tokens between accounts", async() => {
        let amount = web3.utils.toWei('1000', 'ether');
        await myToken.transfer(accounts[1], amount, { from: accounts[0] })

        let balance = await myToken.balanceOf(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether'); //converting from wei to ether
        assert.equal(balance, '1000', "Balance should be 1k tokens for receiver");
    })

});