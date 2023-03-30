const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = toHex(secp.utils.randomPrivateKey())
const publicKey = secp.getPublicKey(privateKey);
const sliced = publicKey.slice(1);
const hashed = toHex(keccak256(sliced).slice(-20));


console.log("Private key: ", privateKey)
console.log("public key: ", hashed)