import { useReducer } from "react";
import { Address, Hex } from "viem";
import SignMessage from "./SignMessage";
import VerifySignature from "./VerifySignature";

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
  | { type: "SET_INPUT_MESSAGE"; payload: string };

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
    default:
      return state;
  }
};

function MessageSignVerify() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <SignMessage state={state} dispatch={dispatch} />
      <VerifySignature
        message={state.signedMessage || ""}
        signature={state.signature || ""}
        address={state.walletAddress || ""}
      />
    </>
  );
}

export default MessageSignVerify;
