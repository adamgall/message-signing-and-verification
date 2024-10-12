import { usePublicClient } from "wagmi";
import { isAddress, isHex } from "viem";
import {
  initialResultsState,
  ResultsState,
  VerificationInputState,
} from "./types";
import { useState, Dispatch, SetStateAction } from "react";

interface Props {
  verificationInputState: VerificationInputState;
  setVerificationInputState: Dispatch<SetStateAction<VerificationInputState>>;
  setResultsState: Dispatch<SetStateAction<ResultsState>>;
}

const VerifySignature = ({
  verificationInputState,
  setVerificationInputState,
  setResultsState,
}: Props) => {
  const publicClient = usePublicClient();

  const [verifying, setVerifying] = useState(false);

  const isFormValid =
    publicClient &&
    verificationInputState.message &&
    isHex(verificationInputState.signature) &&
    isAddress(verificationInputState.address) &&
    !verifying;

  const handleVerify = async () => {
    if (
      !publicClient ||
      !isHex(verificationInputState.signature) ||
      !isAddress(verificationInputState.address)
    ) {
      return;
    }
    setResultsState(initialResultsState);
    setVerifying(true);
    const verified = await publicClient.verifyMessage({
      message: verificationInputState.message,
      signature: verificationInputState.signature,
      address: verificationInputState.address,
    });
    setResultsState({ results: verified });
    setVerifying(false);
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
          {verifying ? "Verifying..." : "Verify Signature"}
        </button>
      </div>
    </div>
  );
};

export default VerifySignature;
