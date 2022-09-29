import { UnauthorizedException } from '../../../domain/exceptions/unauthorized.exeption';
import { InMemoryUserRepository } from '../../../adapters/secondaries/user/in-memory-user.repository';
import { AuthenticateUser } from './authenticate-user.usecase';
import { FakeAuthTokenProvider } from '../../../adapters/providers/fake-auth-token.provider';

describe('Auth User', () => {
  let authenticateUser: AuthenticateUser;

  beforeAll(() => {
    authenticateUser = new AuthenticateUser(
      new InMemoryUserRepository(),
      new FakeAuthTokenProvider(),
    );
  });

  it('should authenticate a user', async () => {
    const authenticated = await authenticateUser.handle({
      email: 'toto@gmail.com',
      password: '123',
    });
    expect(authenticated).toEqual({
      accessToken: 'auth_token_toto@gmail.com_123',
    });
  });

  it('should not work because wrong credentials', async () => {
    await expect(
      authenticateUser.handle({
        email: 'toto@gmail.com',
        password: 'wrong_password',
      }),
    ).rejects.toThrow(
      '[UnauthorizedException] Error : wrong credentials given',
    );
    await expect(
      authenticateUser.handle({
        email: 'toto@gmail.com',
        password: 'wrong_password',
      }),
    ).rejects.toThrowError(UnauthorizedException);
  });
});
