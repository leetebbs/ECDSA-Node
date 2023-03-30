import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [sig, setSig] = useState("")
  const [recovery, setRecovery] = useState("")

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        privateKey = {privateKey}
        setPrivateKey = {setPrivateKey}
        sig= {sig}
        setSig = {setSig}
        setRecovery = {setRecovery}
      />
      <Transfer setBalance={setBalance} address={address} sig={sig} recovery={recovery}/>
    </div>
  );
}

export default App;
