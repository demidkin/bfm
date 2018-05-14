console.log("Hello, World!");

//Задание 1. Хеширование строки
var crypto = require('crypto');
var str = "В лесу родилась ёлочка, в лесу она росла!!!";

var result = crypto.createHash('md5').update(str).digest("hex");
console.log("MD5 str: " + str + ", result:" + result);

var sha1 = crypto.createHash('sha1').update(str).digest("hex");
console.log("SHAL str: " + str + ", result:" + sha1);

var sha256 = crypto.createHash('sha256').update(str).digest("hex");
console.log("SHA256 str: " + str + ", result:" + sha256);


//Задание 2. Электронная подпись сообщений
const secp256k1 = require('secp256k1');

const msg = process.argv[2];
const digested = digest(msg);

console.log(`0) Alice's message:
  message: ${msg}
  message digest: ${digested.toString("hex")}`);

// generate privateKey
let privateKey;
do {
  privateKey = crypto.randomBytes(32);
  console.log("try: " + privateKey);
} while (!secp256k1.privateKeyVerify(privateKey));

// get the public key in a compressed format
const publicKey = secp256k1.publicKeyCreate(privateKey);
console.log(`1) Alice aquired new keypair:
  publicKey: ${publicKey.toString("hex")}
  privateKey: ${privateKey.toString("hex")}`);

// sign the message
console.log(`2) Alice signed her message digest with her privateKey to get its signature:`);
const sigObj = secp256k1.sign(digested, privateKey);
const sig = sigObj.signature;
console.log(" Signature:", sig.toString("hex"));

// successfull verification
console.log(`3) Bob verifyed by 3 elements ("message digest", "signature", and Alice's "publicKey"):`);
let verified = secp256k1.verify(digested, sig, publicKey);
console.log(" verified:", verified);

function digest(str, algo = "sha256") {
  return crypto.createHash(algo).update(str).digest();
}