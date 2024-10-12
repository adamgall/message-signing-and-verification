export interface SigningInputState {
  message: string;
}

export const initialSigningInputState: SigningInputState = {
  message: "",
};

export interface VerificationInputState {
  message: string;
  signature: string;
  address: string;
}

export const initialVerificationInputState: VerificationInputState = {
  message: "",
  signature: "",
  address: "",
};

export interface ResultsState {
  results: boolean | null;
}

export const initialResultsState: ResultsState = {
  results: null,
};
