const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const messageHash =
  "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28";
const {
  hexToBytes,
  toHex,
  utf8ToBytes,
} = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());

const balances = {
  "3de29d7461c8f15e750d98a085ef8067a7e78b34": 100,
  "d9992e945b1f9c0cc112c15066badd3b2970f9ea": 50,
  "33d07b2d1cd9dc98458510f0cafcbb1153a96b21": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  const { sender, recipient, amount, recovery, sig, hash } = req.body;
  const sign = hexToBytes(sig);
  const recoveredPublicKey = secp.recoverPublicKey(messageHash, sign, recovery);
  const sliced = recoveredPublicKey.slice(1);
  const address = toHex(keccak256(sliced).slice(-20));
  console.log(address);
  console.log(sender);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (address != sender)
  res.status(401).send({
    message:
      "Sender is not authorised for this transaction! Invalid Signature",
  });

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
