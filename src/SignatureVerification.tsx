import { useState } from "react";
import { usePublicClient } from "wagmi";
import {
  Chain,
  Transport,
  PublicClient,
  isAddress,
  isHex,
  Hex,
  Address,
} from "viem";

const SignatureVerification = () => {
  const publicClient = usePublicClient();
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [address, setAddress] = useState("");
  const [verificationResult, setVerificationResult] = useState<boolean | null>(
    null
  );

  const isFormValid =
    publicClient && message && isHex(signature) && isAddress(address);

  const handleVerify = async (
    publicClient: PublicClient<Transport, Chain>,
    message: string,
    signature: Hex,
    address: Address
  ) => {
    setVerificationResult(null);
    const verified = await publicClient.verifyMessage({
      message,
      signature,
      address,
    });
    setVerificationResult(verified);
  };

  return (
    <div>
      <h2>Signature Verification</h2>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
      </div>
      <div>
        <input
          type="text"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          placeholder="Enter signature (hex)"
        />
      </div>
      <div>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
        />
      </div>
      <div>
        <button
          onClick={() =>
            isFormValid &&
            handleVerify(publicClient, message, signature, address)
          }
          disabled={!isFormValid}
        >
          Verify Signature
        </button>
      </div>

      {verificationResult !== null && (
        <p>
          {verificationResult ? "Signature is valid!" : "Signature is invalid."}
        </p>
      )}
    </div>
  );
};

export default SignatureVerification;
