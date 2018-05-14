const filename = process.argv[2];
const keyname = process.argv[3];

var fs = require('fs');

if (!fs.existsSync(filename)) {
    console.log("Файл не найден!");
    return;
}


if (!fs.existsSync(keyname + ".skey")) {
    console.log("Ключ не найден!");
    return;
}


var NodeRSA = require('node-rsa');
var keyData = fs.readFileSync(keyname + ".skey");
var key = new NodeRSA(keyData, "pkcs1-private");
//Console.log(key.exportKey("pkcs1-private"));
var data = fs.readFileSync(filename);
var encrypted = key.encrypt(data, 'base64');
fs.writeFileSync(filename + ".encrypt", encrypted);
//Console.log(encrypted);