import { useWalletClient } from "wagmi";
import { Account, Chain, Transport, WalletClient } from "viem";
import { Dispatch, SetStateAction, useState } from "react";
import { VerificationInputState } from "./MessageSignVerify";

interface Props {
  setVerificationInputState: Dispatch<SetStateAction<VerificationInputState>>;
}

function SignMessage({ setVerificationInputState }: Props) {
  const { data: walletClient } = useWalletClient();
  const [message, setMessage] = useState("");
  const [signing, setSigning] = useState(false);

  const signMessage = async (
    walletClient: WalletClient<Transport, Chain, Account>,
    message: string
  ) => {
    setSigning(true);
    try {
      const signature = await walletClient.signMessage({ message });
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

  const isFormValid = walletClient && message && !signing;

  return (
    <div>
      <h2>Sign Message</h2>
      <div>
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
          />
        </div>
        <div>
          <button
            disabled={!isFormValid}
            onClick={() => isFormValid && signMessage(walletClient, message)}
          >
            Sign Message
          </button>
        </div>
        {signing && <p>Signing message, please wait...</p>}
      </div>
    </div>
  );
}

export default SignMessage;
