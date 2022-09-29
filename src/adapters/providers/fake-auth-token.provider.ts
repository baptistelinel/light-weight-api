import {
  AuthTokenProvider,
  Payload,
} from '../../domain/providers/auth-token.provider';

export class FakeAuthTokenProvider implements AuthTokenProvider {
  sign = (payload: Payload): string => {
    return `auth_token_${payload.email}_${payload.password}`;
  };
}
