import MessageSigning from "./MessageSigning";
import SignatureVerification from "./SignatureVerification";

function App() {
  return (
    <div className="App">
      <h1>Web3 Wallet Connection and Message Signing</h1>
      <h2>
        <w3m-button />
      </h2>
      <MessageSigning />
      <SignatureVerification />
    </div>
  );
}

export default App;
