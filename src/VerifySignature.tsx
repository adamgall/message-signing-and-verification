import { usePublicClient } from "wagmi";
import {
  Address,
  Chain,
  Hex,
  isAddress,
  isHex,
  PublicClient,
  Transport,
} from "viem";
import {
  initialResultsState,
  initialVerificationInputState,
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
  const { message, signature, address } = verificationInputState;

  const publicClient = usePublicClient();
  const [verifying, setVerifying] = useState(false);

  const isFormValid =
    publicClient &&
    message &&
    isHex(signature) &&
    isAddress(address) &&
    !verifying;

  const handleVerify = async (
    publicClient: PublicClient<Transport, Chain>,
    message: string,
    signature: Hex,
    address: Address
  ) => {
    setVerifying(true);
    setResultsState(initialResultsState);
    const verified = await publicClient.verifyMessage({
      message,
      signature,
      address,
    });
    setVerificationInputState(initialVerificationInputState);
    setResultsState({
      message,
      signature,
      address,
      verified,
    });
    setVerifying(false);
  };

  return (
    <div>
      <h2>Verify Signature</h2>
      <p>
        <input
          type="text"
          value={message}
          onChange={(e) =>
            setVerificationInputState({
              ...verificationInputState,
              message: e.target.value,
            })
          }
          placeholder="Message"
        />
        <input
          type="text"
          value={signature}
          onChange={(e) =>
            setVerificationInputState({
              ...verificationInputState,
              signature: e.target.value,
            })
          }
          placeholder="Signature"
        />
        <input
          type="text"
          value={address}
          onChange={(e) =>
            setVerificationInputState({
              ...verificationInputState,
              address: e.target.value,
            })
          }
          placeholder="Address"
        />
      </p>
      <button
        disabled={!isFormValid}
        onClick={() =>
          isFormValid && handleVerify(publicClient, message, signature, address)
        }
      >
        {verifying ? "Verifying..." : "Verify Signature"}
      </button>
    </div>
  );
};

export default VerifySignature;
