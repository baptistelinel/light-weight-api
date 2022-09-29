import { User } from 'src/domain/models/user.model';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserEntity, UserModel } from './user.entity';
import { UserMapper } from './user.mapper';

export class MongoUserRepository implements UserRepository {
  private readonly mapper = new UserMapper();

  retrieveOneByEmail = async (email: string): Promise<User> => {
    const userEntity: UserEntity = await UserModel.findOne<UserEntity>({
      email,
    });
    if (null === userEntity) {
      return null;
    }
    return this.mapper.mapToDomainModel(userEntity);
  };

  add = async (userToAdd: User): Promise<User> => {
    const userEntity: UserEntity = await UserModel.create<UserEntity>(
      userToAdd,
    );
    return this.mapper.mapToDomainModel(userEntity);
  };
}
