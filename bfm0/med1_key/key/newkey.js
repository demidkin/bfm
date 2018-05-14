const keyname = process.argv[2];
var fs = require('fs');

if (fs.existsSync(keyname + ".skey")) {
    console.log("Данное имя ключа уже занято, попробуйте выбрать другое!");
    return;
}



var NodeRSA = require('node-rsa');
var key = new NodeRSA({ b: 512 });


fs.writeFileSync(keyname + ".skey", key.exportKey("pkcs1-private"));
fs.writeFileSync(keyname + ".pkey", key.exportKey("pkcs1-public"));


console.log("Ключи созданы!");







