import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AddUser } from '../../../../domain/usecases/user/add-user.usecase';
import { User } from '../../../../domain/models/user.model';
import { RetrieveUserByEmail } from '../../../../domain/usecases/user/retrieve-user-by-email.usecase';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { UserAddDTO } from './user-add.dto';

@UseInterceptors(ErrorInterceptor)
@Controller('users')
export class UserController {
  constructor(
    private readonly retrieveUserByEmail: RetrieveUserByEmail,
    private readonly addUser: AddUser,
  ) {}

  @Get(':email')
  async getOneByEmail(@Param('email') email: string): Promise<User> {
    return this.retrieveUserByEmail.handle(email);
  }

  @Post()
  async postUser(@Body() userAddDTO: UserAddDTO): Promise<User> {
    return this.addUser.handle(userAddDTO);
  }
}
