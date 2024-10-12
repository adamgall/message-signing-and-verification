import { usePublicClient } from "wagmi";
import { isAddress, isHex } from "viem";
import { VerificationInputState } from "./MessageSignVerify";
import { useState, Dispatch, SetStateAction } from "react";

interface Props {
  verificationInputState: VerificationInputState;
  setVerificationInputState: Dispatch<SetStateAction<VerificationInputState>>;
}

const VerifySignature = ({
  verificationInputState,
  setVerificationInputState,
}: Props) => {
  const publicClient = usePublicClient();

  const [result, setResult] = useState<boolean | null>(null);

  const isFormValid =
    publicClient &&
    verificationInputState.message &&
    isHex(verificationInputState.signature) &&
    isAddress(verificationInputState.address);

  const handleVerify = async () => {
    if (
      !publicClient ||
      !isHex(verificationInputState.signature) ||
      !isAddress(verificationInputState.address)
    ) {
      return;
    }
    const verified = await publicClient.verifyMessage({
      message: verificationInputState.message,
      signature: verificationInputState.signature,
      address: verificationInputState.address,
    });
    setResult(verified);
  };

  return (
    <div>
      <h2>Verify Signature</h2>
      <div>
        <input
          type="text"
          value={verificationInputState.message}
          onChange={(e) =>
            setVerificationInputState({
              ...verificationInputState,
              message: e.target.value,
            })
          }
          placeholder="Message"
        />
      </div>
      <div>
        <input
          type="text"
          value={verificationInputState.signature}
          onChange={(e) =>
            setVerificationInputState({
              ...verificationInputState,
              signature: e.target.value,
            })
          }
          placeholder="Signature"
        />
      </div>
      <div>
        <input
          type="text"
          value={verificationInputState.address}
          onChange={(e) =>
            setVerificationInputState({
              ...verificationInputState,
              address: e.target.value,
            })
          }
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
