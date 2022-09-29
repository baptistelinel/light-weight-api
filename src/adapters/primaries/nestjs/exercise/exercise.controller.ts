import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RemoveExerciseById } from '../../../../domain/usecases/exercise/remove-exercise-by-id.usecase';
import { Exercise } from '../../../../domain/models';
import { RetrieveExercisesByUserId } from '../../../../domain/usecases/exercise/retrieve-exercises-by-user-id.usecase';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { CreateExercise } from '../../../../domain/usecases/exercise/create-exercise.usecase';
import { UpdateExerciseById } from '../../../../domain/usecases/exercise/update-exercise-by-id.usecase';
import { ExerciseUpdateDTO } from './exercise-update.dto';
import { ExerciseCreateDTO } from './exercise-create.dto';
import { JwtAuthenticationGuard } from '../authentication/jwt-authentication.guard';
import { User } from '../user/user.decorator';

@Controller('exercises')
@UseInterceptors(ErrorInterceptor)
@UseGuards(JwtAuthenticationGuard)
export class ExerciseController {
  constructor(
    private readonly retrieveExercisesByUserId: RetrieveExercisesByUserId,
    private readonly removeExerciseById: RemoveExerciseById,
    private readonly createExercise: CreateExercise,
    private readonly updateExerciseById: UpdateExerciseById,
  ) {}

  @Get()
  async getExercises(@User('id') userId: string): Promise<Exercise[]> {
    return this.retrieveExercisesByUserId.handle(userId);
  }

  @Post()
  async postExercise(
    @Body() exerciseToCreate: ExerciseCreateDTO,
    @User('id') userId: string,
  ): Promise<Exercise> {
    return this.createExercise.handle(exerciseToCreate, userId);
  }

  @Patch(':id')
  async patchExerciseById(
    @Param('id') id: string,
    @Body() exerciseUpdates: ExerciseUpdateDTO,
  ) {
    return this.updateExerciseById.handle(id, exerciseUpdates);
  }

  @Delete(':id')
  async deleteExerciseById(@Param('id') id: string): Promise<Exercise> {
    return this.removeExerciseById.handle(id);
  }
}
