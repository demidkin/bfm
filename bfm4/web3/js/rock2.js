
var Web3 = require('web3');
var web3 = new Web3();


if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new web3.providers.HttpProvider("http://localhost:8545"));
}
function watchBalance() {

    var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
        {"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
        {"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"setBonus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
        {"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
        {"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],
        "payable":false,"stateMutability":"nonpayable","type":"function"},
        {"constant":true,"inputs":[{"name":"tokenHolder","type":"address"}],
        "name":"approvedDividendsOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
        {"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
        {"constant":false,"inputs":[],"name":"transferAllDividends","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
        {"constant":true,"inputs":[{"name":"tokenHolder","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],
        "payable":false,"stateMutability":"view","type":"function"},
        {"constant":false,"inputs":[{"name":"rate","type":"uint256"}],
        "name":"setCurrentExchangeRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
        {"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
        {"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],
        "payable":false,"stateMutability":"nonpayable","type":"function"},
        {"constant":false,"inputs":[{"name":"totalDividendsAmount","type":"uint256"}],
        "name":"approveDividends","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
        {"constant":false,"inputs":[],"name":"burnUnsold","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
        {"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"amount","type":"uint256"}],"name":"send","outputs":[],
        "payable":false,"stateMutability":"nonpayable","type":"function"},
        {"constant":true,"inputs":[{"name":"owner","type":"address"},
        {"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
        {"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},
        {"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],
        "name":"Burned","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],
        "name":"DividendsTransfered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},
        {"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},
        {"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},
        {"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]

    var contractAddress = '0xC16b542ff490e01fcc0DC58a60e1EFdc3e357cA6';
    var contract = web3.eth.contract(abi).at(contractAddress);
    contract.totalSupply(function(err, res){
        document.getElementById('totalSuplay').innerText = ' Total Supply: ' + res;
        //console.log(res)
    });
    contract.name(function(err, res){
        document.getElementById('name').innerText = ' Name: ' + res;
        //console.log(res)
    });
    contract.symbol(function(err, res){
        document.getElementById('symbol').innerText = ' Symbol: ' + res;
        //console.log(res)
    });
    contract.balanceOf('0xC16b542ff490e01fcc0DC58a60e1EFdc3e357cA6',function(err, res){
        document.getElementById('balanceOf').innerText = ' Balance: ' + res;
        //console.log(res)
    });
}