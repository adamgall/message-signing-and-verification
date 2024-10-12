import { Address, Hex } from "viem";

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
  message: string | null;
  signature: Hex | null;
  address: Address | null;
  verified: boolean | null;
}

export const initialResultsState: ResultsState = {
  message: null,
  signature: null,
  address: null,
  verified: null,
};
