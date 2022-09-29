export interface Payload {
  id: string;
  email: string;
  password: string;
}

export interface AuthTokenProvider {
  sign(payload: Payload): string;
}
