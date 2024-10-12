import { Dispatch, SetStateAction } from "react";
import {
  initialSigningInputState,
  initialVerificationInputState,
  SigningInputState,
  VerificationInputState,
  ResultsState,
  initialResultsState,
} from "../types";

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
  const { message, signature, address, verified } = resultsState;

  const resetDisabled =
    JSON.stringify(signingInputState) ===
      JSON.stringify(initialSigningInputState) &&
    JSON.stringify(verificationInputState) ===
      JSON.stringify(initialVerificationInputState) &&
    JSON.stringify(resultsState) === JSON.stringify(initialResultsState);

  return (
    <div>
      <h3>Results</h3>
      {verified === null && <p>n/a</p>}
      {verified !== null && (
        <>
          <p>{verified ? "YUP ✅" : "NOPE ❌"}</p>
          <p>
            The signature "<i>{signature}</i>"{" "}
            <b>{verified ? "WAS" : "WAS NOT"}</b> generated from address "
            <i>{address}</i>" signing message "<i>{message}</i>"
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
