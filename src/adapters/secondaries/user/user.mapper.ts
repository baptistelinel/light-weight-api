import { User } from '../../../domain/models/user.model';
import { UserEntity } from './user.entity';

export class UserMapper {
  mapToDomainModel = (userEntity: UserEntity): User => {
    return {
      id: userEntity.id,
      email: userEntity.email,
      password: userEntity.password,
    };
  };
}
