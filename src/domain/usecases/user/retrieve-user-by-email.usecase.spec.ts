import { NotFoundException } from '../../../domain/exceptions/not-found.exception';
import { InMemoryUserRepository } from '../../../adapters/secondaries/user/in-memory-user.repository';
import { RetrieveUserByEmail } from './retrieve-user-by-email.usecase';

describe('Retrieve User By Email', () => {
  let retrieveUserByEmail: RetrieveUserByEmail;

  beforeAll(() => {
    retrieveUserByEmail = new RetrieveUserByEmail(new InMemoryUserRepository());
  });

  it('should retrieve a user by email', async () => {
    const user = await retrieveUserByEmail.handle('toto@gmail.com');
    expect(user).toEqual({ id: '1', email: 'toto@gmail.com', password: '123' });
  });

  it('should not work because user not found', async () => {
    await expect(
      retrieveUserByEmail.handle('unknown_email@gmail.com'),
    ).rejects.toThrow(
      '[NotFoundException] Error : user with email unknown_email@gmail.com does not exist',
    );
    await expect(
      retrieveUserByEmail.handle('unkown_email@gmail.com'),
    ).rejects.toThrowError(NotFoundException);
  });
});
