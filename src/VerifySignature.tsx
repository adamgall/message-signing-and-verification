import { useState, useEffect } from "react";
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

interface Props {
  message: string;
  signature: string;
  address: string;
}

const VerifySignature = ({ message, signature, address }: Props) => {
  const publicClient = usePublicClient();
  const [verificationResult, setVerificationResult] = useState<boolean | null>(
    null
  );

  const isFormValid =
    publicClient && message && isHex(signature) && isAddress(address);

  useEffect(() => {
    setVerificationResult(null);
  }, [message, signature, address]);

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
      <h2>Verify Signature</h2>
      <div>
        <input type="text" value={message} readOnly placeholder="Message" />
      </div>
      <div>
        <input type="text" value={signature} readOnly placeholder="Signature" />
      </div>
      <div>
        <input type="text" value={address} readOnly placeholder="Address" />
      </div>
      <div>
        <button
          onClick={() =>
            isFormValid &&
            handleVerify(
              publicClient,
              message,
              signature as Hex,
              address as Address
            )
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

export default VerifySignature;
