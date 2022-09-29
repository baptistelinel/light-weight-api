import { NotFoundException } from '../../../domain/exceptions/not-found.exception';
import { UserRepository } from '../../../domain/repositories/user.repository';

export class RetrieveUserByEmail {
  constructor(private readonly userRepository: UserRepository) {}

  handle = async (email: string) => {
    const user = await this.userRepository.retrieveOneByEmail(email);
    if (null === user) {
      throw new NotFoundException(
        `Error : user with email ${email} does not exist`,
      );
    }
    return user;
  };
}
