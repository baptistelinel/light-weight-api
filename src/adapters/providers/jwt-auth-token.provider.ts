import { JwtService } from '@nestjs/jwt';
import {
  AuthTokenProvider,
  Payload,
} from '../../domain/providers/auth-token.provider';

export class JwtAuthTokenProvider implements AuthTokenProvider {
  constructor(private readonly jwtService: JwtService) {}

  sign = (payload: Payload): string => {
    return this.jwtService.sign(payload, { secret: 'test' });
  };
}
