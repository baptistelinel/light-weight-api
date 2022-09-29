import { User } from '../../../domain/models/user.model';
import { UserRepository } from '../../../domain/repositories/user.repository';

export class InMemoryUserRepository implements UserRepository {
  users: User[] = [
    { id: '1', email: 'toto@gmail.com', password: '123' },
    { id: '2', email: 'tata@gmail.com', password: 'azerty123' },
  ];

  retrieveOneByEmail = async (email: string): Promise<User> => {
    const user = this.users.find((user) => user.email === email);
    if (undefined === user) {
      return null;
    }
    return user;
  };

  add = async (userToAdd: User): Promise<User> => {
    return userToAdd;
  };
}
