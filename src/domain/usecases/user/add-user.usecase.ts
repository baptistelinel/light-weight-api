import { UserAddDTO } from 'src/adapters/primaries/nestjs/user/user-add.dto';
import { User } from 'src/domain/models/user.model';
import { IdProvider } from 'src/domain/providers/id.provider';
import { UserRepository } from 'src/domain/repositories/user.repository';

export class AddUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly idProvider: IdProvider,
  ) {}

  handle = async (userToAdd: UserAddDTO): Promise<User> => {
    const id = this.idProvider.generate();
    const user: User = { ...userToAdd, id };
    return this.userRepository.add(user);
  };
}
