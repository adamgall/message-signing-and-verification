import { usePublicClient } from "wagmi";
import { isAddress, isHex } from "viem";
import { State } from "./MessageSignVerify";
import { useState } from "react";

interface Props {
  state: State;
}

const VerifySignature = ({ state }: Props) => {
  const publicClient = usePublicClient();
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<boolean | null>(null);

  const isFormValid =
    publicClient && message && isHex(signature) && isAddress(address);

  const handleVerify = async () => {
    if (!isFormValid) return;
    const verified = await publicClient.verifyMessage({
      message,
      signature,
      address,
    });
    setResult(verified);
  };

  return (
    <div>
      <h2>Verify Signature</h2>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
        />
      </div>
      <div>
        <input
          type="text"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          placeholder="Signature"
        />
      </div>
      <div>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
      </div>
      <div>
        <button onClick={handleVerify} disabled={!isFormValid}>
          Verify Signature
        </button>
      </div>

      {result !== null && (
        <p>{result ? "Signature is valid!" : "Signature is invalid."}</p>
      )}
    </div>
  );
};

export default VerifySignature;
