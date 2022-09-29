import { User } from '../../../domain/models/user.model';
import { UserEntity } from '../user/user.entity';
import { UserMapper } from '../user/user.mapper';

describe('User Mapper', () => {
  it('should return a user domain model', () => {
    const userMapper = new UserMapper();
    const UserEntity: UserEntity = {
      id: '1',
      email: 'toto@gmail.com',
      password: '123',
    };
    const user: User = userMapper.mapToDomainModel(UserEntity);
    expect(user).toEqual({
      id: '1',
      email: 'toto@gmail.com',
      password: '123',
    });
  });
});
