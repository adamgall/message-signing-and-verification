import { Dispatch, SetStateAction } from "react";
import {
  initialSigningInputState,
  initialVerificationInputState,
  SigningInputState,
  VerificationInputState,
  ResultsState,
  initialResultsState,
} from "./types";

interface Props {
  signingInputState: SigningInputState;
  verificationInputState: VerificationInputState;
  resultsState: ResultsState;
  setSigningInputState: Dispatch<SetStateAction<SigningInputState>>;
  setVerificationInputState: Dispatch<SetStateAction<VerificationInputState>>;
  setResultsState: Dispatch<SetStateAction<ResultsState>>;
}

function Results({
  signingInputState,
  verificationInputState,
  resultsState,
  setSigningInputState,
  setVerificationInputState,
  setResultsState,
}: Props) {
  const resetDisabled =
    JSON.stringify(signingInputState) ===
      JSON.stringify(initialSigningInputState) &&
    JSON.stringify(verificationInputState) ===
      JSON.stringify(initialVerificationInputState) &&
    JSON.stringify(resultsState) === JSON.stringify(initialResultsState);

  return (
    <div>
      <h3>Results</h3>
      {resultsState.verified === null && <p>n/a</p>}
      {resultsState.verified !== null && (
        <>
          <p>{resultsState.verified ? "YUP ✅" : "NOPE ❌"}</p>
          <p>
            "<i>{resultsState.address}</i>"{" "}
            <b>{resultsState.verified ? "DID" : "DID NOT"}</b> sign message "
            <i>{resultsState.message}</i>" which resulted in signature "
            <i>{resultsState.signature}</i>"
          </p>
        </>
      )}
      <button
        onClick={() => {
          setSigningInputState(initialSigningInputState);
          setVerificationInputState(initialVerificationInputState);
          setResultsState(initialResultsState);
        }}
        disabled={resetDisabled}
      >
        Reset
      </button>
    </div>
  );
}

export default Results;
