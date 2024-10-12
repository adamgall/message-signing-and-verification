import { useState } from "react";
import { Address, Hex } from "viem";
import SignMessage from "./SignMessage";
import VerifySignature from "./VerifySignature";

export interface State {
  message: string | null;
  signature: Hex | null;
  address: Address | null;
}

const initialState: State = {
  message: null,
  signature: null,
  address: null,
};

function MessageSignVerify() {
  const [state, setState] = useState(initialState);

  return (
    <>
      <SignMessage setState={setState} />
      <VerifySignature state={state} />
    </>
  );
}

export default MessageSignVerify;
