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
import { CreateTraining } from '../../../../domain/usecases/training/create-training.usecase';
import { RemoveTrainingById } from '../../../../domain/usecases/training/remove-training-by-id.usecase';
import { Training } from '../../../../domain/models';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { TrainingCreateDTO } from './training-create.dto';
import { TrainingUpdateDTO } from './training-update.dto';
import { UpdateTrainingById } from '../../../../domain/usecases/training/update-training-by-id.usecase';
import { RetrieveTrainingsByUserId } from '../../../../domain/usecases/training/retrieve-trainings-by-user-id.usecase';
import { JwtAuthenticationGuard } from '../authentication/jwt-authentication.guard';
import { User } from '../user/user.decorator';

@Controller('trainings')
@UseInterceptors(ErrorInterceptor)
@UseGuards(JwtAuthenticationGuard)
export class TrainingController {
  constructor(
    private readonly retrieveTrainingsByUserId: RetrieveTrainingsByUserId,
    private readonly removeTrainingById: RemoveTrainingById,
    private readonly createTraining: CreateTraining,
    private readonly updateTrainingById: UpdateTrainingById,
  ) {}

  @Get()
  async getTrainingsByUserId(@User('id') userId: string): Promise<Training[]> {
    return this.retrieveTrainingsByUserId.handle(userId);
  }

  @Delete(':id')
  async deleteTrainingById(@Param('id') id: string): Promise<Training> {
    return this.removeTrainingById.handle(id);
  }

  @Post()
  async postTraining(
    @Body() trainingCreateDTO: TrainingCreateDTO,
    @User('id') userId: string,
  ): Promise<Training> {
    return this.createTraining.handle(trainingCreateDTO, userId);
  }

  @Patch(':id')
  async patchExerciseById(
    @Param('id') id: string,
    @Body() trainingUpdates: TrainingUpdateDTO,
  ) {
    return this.updateTrainingById.handle(id, trainingUpdates);
  }
}
