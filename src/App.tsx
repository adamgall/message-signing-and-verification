import { useReducer } from "react";
import { useWalletClient } from "wagmi";
import {
  Account,
  Address,
  Chain,
  recoverMessageAddress,
  WalletActions,
} from "viem";

interface State {
  inputMessage: string;
  signedMessage: string | null;
  signature: string | null;
  recoveredAddress: Address | null;
  signing: boolean;
}

type Action =
  | { type: "BEGIN_NEW_SIGNATURE_REQUEST"; payload: string }
  | {
      type: "CAPTURED_SIGNATURE";
      payload: { signature: string; recoveredAddress: Address };
    }
  | { type: "SET_INPUT_MESSAGE"; payload: string }
  | { type: "SET_SIGNING"; payload: boolean }
  | { type: "RESET" };

const initialState: State = {
  inputMessage: "",
  signedMessage: null,
  signature: null,
  recoveredAddress: null,
  signing: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "BEGIN_NEW_SIGNATURE_REQUEST":
      return {
        ...state,
        signing: true,
        signature: null,
        signedMessage: action.payload,
      };
    case "CAPTURED_SIGNATURE":
      return {
        ...state,
        signature: action.payload.signature,
        recoveredAddress: action.payload.recoveredAddress,
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

function App() {
  const { data: walletClient } = useWalletClient();
  const [state, dispatch] = useReducer(reducer, initialState);

  const signMessage = async (
    walletActions: WalletActions<Chain, Account>,
    message: string
  ) => {
    dispatch({ type: "BEGIN_NEW_SIGNATURE_REQUEST", payload: message });
    try {
      const signature = await walletActions.signMessage({ message });
      const recoveredAddress = await recoverMessageAddress({
        message,
        signature,
      });
      dispatch({
        type: "CAPTURED_SIGNATURE",
        payload: { signature, recoveredAddress },
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

  return (
    <div className="App">
      <h1>Web3 Wallet Connection and Message Signing</h1>
      <h2>
        <w3m-button />
      </h2>
      {walletClient && (
        <div>
          <input
            type="text"
            value={state.inputMessage}
            onChange={(e) =>
              dispatch({ type: "SET_INPUT_MESSAGE", payload: e.target.value })
            }
            placeholder="Enter message to sign"
          />
          <button
            disabled={!state.inputMessage || state.signing}
            onClick={() => signMessage(walletClient, state.inputMessage)}
          >
            Sign Message
          </button>
          {state.signing && <p>Signing message, please wait...</p>}
          {state.signature && (
            <div>
              <h3>Signed Message:</h3>
              <p>{state.signedMessage}</p>
              <h3>Signature:</h3>
              <p>{state.signature}</p>
              <h3>Recovered Address:</h3>
              <p>{state.recoveredAddress}</p>
              <h3>Wallet Address:</h3>
              <p>{walletClient.account.address}</p>
              <h3>Verification:</h3>
              <p>
                {state.recoveredAddress === walletClient.account.address
                  ? "Signature is valid!"
                  : "Signature is invalid."}
              </p>
              <button onClick={reset}>Reset</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
