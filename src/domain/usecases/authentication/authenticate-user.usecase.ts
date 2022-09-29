import { UnauthorizedException } from '../../../domain/exceptions/unauthorized.exeption';
import { LoginDTO } from '../../../adapters/primaries/nestjs/authentication/login.dto';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { AuthTokenProvider } from '../../../domain/providers/auth-token.provider';

export class AuthenticateUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authTokenProvider: AuthTokenProvider,
  ) {}

  handle = async (loginDTO: LoginDTO): Promise<{ accessToken: string }> => {
    try {
      const user = await this.userRepository.retrieveOneByEmail(loginDTO.email);
      if (user.password === loginDTO.password) {
        return {
          accessToken: this.authTokenProvider.sign({
            id: user.id,
            email: user.email,
            password: user.password,
          }),
        };
      }
      throw new UnauthorizedException('Error : wrong credentials given');
    } catch (NotFoundException) {
      throw new UnauthorizedException('Error : wrong credentials given');
    }
  };
}
