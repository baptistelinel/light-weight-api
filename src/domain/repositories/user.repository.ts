import { User } from '../models/user.model';

export interface UserRepository {
  retrieveOneByEmail(email: string): Promise<User>;
  add(userToAdd: User): Promise<User>;
}
