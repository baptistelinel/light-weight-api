import { Module } from '@nestjs/common';
import { dependencies } from '../../../configurations/dependencies/dependencies';
import { AuthenticationController } from './authentication/authentication.controller';
import { JwtAuthenticationGuard } from './authentication/jwt-authentication.guard';
import { JwtAuthenticationStrategy } from './authentication/jwt-authentication.strategy';
import { ExerciseController } from './exercise/exercise.controller';
import { PersonalRecordController } from './personal-record/personal-record.controller';
import { TrainingController } from './training/training.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [],
  controllers: [
    TrainingController,
    ExerciseController,
    PersonalRecordController,
    UserController,
    AuthenticationController,
  ],
  providers: [
    ...dependencies,
    JwtAuthenticationStrategy,
    JwtAuthenticationGuard,
  ],
})
export class AppModule {}
