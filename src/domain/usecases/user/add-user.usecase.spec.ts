import { FakeIdProvider } from '../../../adapters/providers/fake-id.provider';
import { InMemoryUserRepository } from '../../../adapters/secondaries/user/in-memory-user.repository';
import { AddUser } from './add-user.usecase';

describe('Add User', () => {
  let addUser: AddUser;

  beforeAll(() => {
    addUser = new AddUser(new InMemoryUserRepository(), new FakeIdProvider());
  });

  it('should add a user', async () => {
    const userAdded = await addUser.handle({
      email: 'toto@gmail.com',
      password: '123',
    });
    expect(userAdded).toEqual({
      id: '100',
      email: 'toto@gmail.com',
      password: '123',
    });
  });
});
