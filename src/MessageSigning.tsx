import { useWalletClient } from "wagmi";
import { Account, Chain, Transport, WalletClient } from "viem";
import { Action } from "./App";

interface Props {
  state: {
    inputMessage: string;
    signing: boolean;
  };
  dispatch: React.Dispatch<Action>; // Use the imported Action type
}

function MessageSigning({ state, dispatch }: Props) {
  const { data: walletClient } = useWalletClient();

  const signMessage = async (
    walletClient: WalletClient<Transport, Chain, Account>,
    message: string
  ) => {
    dispatch({
      type: "BEGIN_NEW_SIGNATURE_REQUEST",
      payload: { message, walletAddress: walletClient.account.address },
    });
    try {
      const signature = await walletClient.signMessage({ message });
      dispatch({
        type: "CAPTURED_SIGNATURE",
        payload: signature,
      });
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

  const isFormValid = walletClient && state.inputMessage && !state.signing;

  return (
    <div>
      <h2>Message Signing</h2>
      <div>
        <div>
          <input
            type="text"
            value={state.inputMessage}
            onChange={(e) =>
              dispatch({ type: "SET_INPUT_MESSAGE", payload: e.target.value })
            }
            placeholder="Enter message to sign"
          />
        </div>
        <div>
          <button
            disabled={!isFormValid}
            onClick={() =>
              isFormValid && signMessage(walletClient, state.inputMessage)
            }
          >
            Sign Message
          </button>
        </div>
        {state.signing && <p>Signing message, please wait...</p>}
      </div>
    </div>
  );
}

export default MessageSigning;
