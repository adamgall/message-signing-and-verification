import { useState } from "react";
import SignMessage from "./SignMessage";
import VerifySignature from "./VerifySignature";
import Results from "./Results";
import {
  initialSigningInputState,
  initialVerificationInputState,
  initialResultsState,
} from "../types";

function MessageSignVerify() {
  const [signingInputState, setSigningInputState] = useState(
    initialSigningInputState
  );
  const [verificationInputState, setVerificationInputState] = useState(
    initialVerificationInputState
  );
  const [resultsState, setResultsState] = useState(initialResultsState);

  return (
    <>
      <SignMessage
        signingInputState={signingInputState}
        setSigningInputState={setSigningInputState}
        setVerificationInputState={setVerificationInputState}
      />
      <VerifySignature
        verificationInputState={verificationInputState}
        setVerificationInputState={setVerificationInputState}
        setResultsState={setResultsState}
      />
      <Results
        signingInputState={signingInputState}
        verificationInputState={verificationInputState}
        resultsState={resultsState}
        setSigningInputState={setSigningInputState}
        setVerificationInputState={setVerificationInputState}
        setResultsState={setResultsState}
      />
    </>
  );
}

export default MessageSignVerify;
