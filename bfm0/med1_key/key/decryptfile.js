const filename = process.argv[2];
const keyname = process.argv[3];

var fs = require('fs');

if (!fs.existsSync(filename)) {
    console.log("Файл не найден!");
    return;
}


if (!fs.existsSync(keyname + ".pkey")) {
    console.log("Ключ не найден!");
    return;
}


var NodeRSA = require('node-rsa');
var keyData = fs.readFileSync(keyname + ".pkey");
var key = new NodeRSA(keyData, "pkcs1-public");
console.log(key.exportKey("pkcs1-public"));

var data = fs.readFileSync(filename);
var decrypted = key.decrypt(data, 'base64');
console.log(decrypted);
fs.writeFileSync(filename + ".decrypt", decrypted);















