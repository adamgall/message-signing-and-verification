import { useState } from "react";
import SignMessage from "./SignMessage";
import VerifySignature from "./VerifySignature";
import { initialVerificationInputState } from "./types";

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
