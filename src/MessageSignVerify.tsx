import { useState } from "react";
import SignMessage from "./SignMessage";
import VerifySignature from "./VerifySignature";

export interface VerificationInputState {
  message: string;
  signature: string;
  address: string;
}

const initialVerificationInputState: VerificationInputState = {
  message: "",
  signature: "",
  address: "",
};

function MessageSignVerify() {
  const [verificationInputState, setVerificationInputState] = useState(
    initialVerificationInputState
  );

  return (
    <>
      <SignMessage setVerificationInputState={setVerificationInputState} />
      <VerifySignature
        verificationInputState={verificationInputState}
        setVerificationInputState={setVerificationInputState}
      />
    </>
  );
}

export default MessageSignVerify;
