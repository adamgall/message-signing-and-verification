import { useReducer } from "react";
import { useWalletClient } from "wagmi";
import { Account, Chain, Transport, WalletClient, Hex, Address } from "viem";

interface State {
  inputMessage: string;
  walletAddress: Address | null;
  signedMessage: string | null;
  signature: Hex | null;
  signing: boolean;
}

type Action =
  | {
      type: "BEGIN_NEW_SIGNATURE_REQUEST";
      payload: { message: string; walletAddress: Address };
    }
  | {
      type: "CAPTURED_SIGNATURE";
      payload: Hex;
    }
  | { type: "SET_INPUT_MESSAGE"; payload: string }
  | { type: "SET_SIGNING"; payload: boolean }
  | { type: "RESET" };

const initialState: State = {
  inputMessage: "",
  walletAddress: null,
  signedMessage: null,
  signature: null,
  signing: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "BEGIN_NEW_SIGNATURE_REQUEST":
      return {
        ...state,
        signing: true,
        signature: null,
        signedMessage: action.payload.message,
        walletAddress: action.payload.walletAddress,
      };
    case "CAPTURED_SIGNATURE":
      return {
        ...state,
        signature: action.payload,
        inputMessage: "",
      };
    case "SET_INPUT_MESSAGE":
      return { ...state, inputMessage: action.payload };
    case "SET_SIGNING":
      return { ...state, signing: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

function MessageSigning() {
  const { data: walletClient } = useWalletClient();
  const [state, dispatch] = useReducer(reducer, initialState);

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
    } finally {
      dispatch({ type: "SET_SIGNING", payload: false });
    }
  };

  const reset = () => {
    dispatch({ type: "RESET" });
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
        {state.signature && (
          <div>
            <h3>Message:</h3>
            <p>{state.signedMessage}</p>
            <h3>Signature:</h3>
            <p>{state.signature}</p>
            <h3>Wallet Address:</h3>
            <p>{state.walletAddress}</p>
            <button onClick={reset}>Reset</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageSigning;
