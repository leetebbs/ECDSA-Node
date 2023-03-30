import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex, utf8ToBytes,} from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Transfer({ address, setBalance, recovery, sig }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const messageHash = "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28";
  // const hashed = utf8ToBytes(sendAmount + recipient)
  // console.log(keccak256(hashed))
  const setValue = (setter) => (evt) => setter(evt.target.value);


  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sig: sig,
        recovery: recovery,
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
