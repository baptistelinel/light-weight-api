import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticateUser } from '../../../../domain/usecases/authentication/authenticate-user.usecase';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { LoginDTO } from './login.dto';

@UseInterceptors(ErrorInterceptor)
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticateUser: AuthenticateUser) {}

  @Post()
  @HttpCode(200)
  async Auth(@Body() loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    return this.authenticateUser.handle(loginDTO);
  }
}
