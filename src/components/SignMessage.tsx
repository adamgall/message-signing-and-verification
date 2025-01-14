import { useWalletClient } from "wagmi";
import { Account, Chain, Transport, WalletClient } from "viem";
import { Dispatch, SetStateAction, useState } from "react";
import {
  SigningInputState,
  VerificationInputState,
  initialSigningInputState,
  initialVerificationInputState,
} from "../types";

interface Props {
  signingInputState: SigningInputState;
  setSigningInputState: Dispatch<SetStateAction<SigningInputState>>;
  setVerificationInputState: Dispatch<SetStateAction<VerificationInputState>>;
}

function SignMessage({
  signingInputState,
  setSigningInputState,
  setVerificationInputState,
}: Props) {
  const { message } = signingInputState;

  const { data: walletClient } = useWalletClient();
  const [signing, setSigning] = useState(false);

  const isFormValid = walletClient && message && !signing;

  const signMessage = async (
    walletClient: WalletClient<Transport, Chain, Account>,
    message: string
  ) => {
    setSigning(true);
    setVerificationInputState(initialVerificationInputState);
    try {
      const signature = await walletClient.signMessage({ message });
      setSigningInputState(initialSigningInputState);
      setVerificationInputState({
        message,
        signature,
        address: walletClient.account.address,
      });
    } catch (error) {
      console.error("Error signing message:", error);
    } finally {
      setSigning(false);
    }
  };

  return (
    <div>
      <h2>Sign Message</h2>
      <p>
        <input
          type="text"
          value={message}
          onChange={(e) =>
            setSigningInputState({
              ...signingInputState,
              message: e.target.value,
            })
          }
          placeholder="Message"
        />
      </p>
      <button
        disabled={!isFormValid}
        onClick={() => isFormValid && signMessage(walletClient, message)}
      >
        {signing ? "Signing..." : "Sign Message"}
      </button>
    </div>
  );
}

export default SignMessage;
