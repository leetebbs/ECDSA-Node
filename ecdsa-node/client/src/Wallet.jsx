import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
  setSig,
  setRecovery,
}) {
  async function onChange(evt) {
    const messageHash =
      "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28";
    
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const publicKey = secp.getPublicKey(privateKey);
    const sliced = publicKey.slice(1);
    const address = toHex(keccak256(sliced).slice(-20));
    const [signature, recoveryBit] = await secp.sign(messageHash, privateKey, {
      recovered: true,
    });
    
    setRecovery(recoveryBit);
    setSig(toHex(signature));
    setAddress(address);

     
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input
          placeholder="Type a Private Key!"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>
      <h4>Address: {address}</h4>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
