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
  resultsState: ResultsState;
  setSigningInputState: Dispatch<SetStateAction<SigningInputState>>;
  setVerificationInputState: Dispatch<SetStateAction<VerificationInputState>>;
  setResultsState: Dispatch<SetStateAction<ResultsState>>;
}

function Results({
  resultsState,
  setSigningInputState,
  setVerificationInputState,
  setResultsState,
}: Props) {
  return (
    <div>
      <h3>Results</h3>
      {resultsState.results !== null && (
        <p>
          {resultsState.results
            ? "Signature is valid!"
            : "Signature is invalid."}
        </p>
      )}
      <button
        onClick={() => {
          setSigningInputState(initialSigningInputState);
          setVerificationInputState(initialVerificationInputState);
          setResultsState(initialResultsState);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Results;
