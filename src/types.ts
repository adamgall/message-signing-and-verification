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
