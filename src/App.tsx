import { useReducer } from "react";
import MessageSigning from "./MessageSigning";
import SignatureVerification from "./SignatureVerification";
import { Address, Hex } from "viem";

interface State {
  inputMessage: string;
  walletAddress: Address | null;
  signedMessage: string | null;
  signature: Hex | null;
  signing: boolean;
}

export type Action =
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
        signing: false,
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
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <h1>Web3 Wallet Connection and Message Signing</h1>
      <h2>
        <w3m-button />
      </h2>
      <MessageSigning state={state} dispatch={dispatch} />
      <SignatureVerification
        message={state.signedMessage || ""}
        signature={state.signature || ""}
        address={state.walletAddress || ""}
      />
    </div>
  );
}

export default App;
