import { Training } from '../../../domain/models';
import { TrainingCreateDTO } from '../../../adapters/primaries/nestjs/training/training-create.dto';
import { DateProvider } from '../../../domain/providers/date.provider';
import { IdProvider } from '../../../domain/providers/id.provider';
import { TrainingRepository } from 'src/domain/repositories';

export class CreateTraining {
  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly dateProvider: DateProvider,
    private readonly idProvider: IdProvider,
  ) {}

  handle = async (
    trainingToCreate: TrainingCreateDTO,
    userId: string,
  ): Promise<Training> => {
    const date = this.dateProvider.getCurrent();
    const id = this.idProvider.generate();
    const totalWeight = trainingToCreate.exercises.reduce(
      (accumulator, exercise) => {
        return accumulator + exercise.weight * exercise.repetitions;
      },
      0,
    );
    const training: Training = {
      ...trainingToCreate,
      date,
      id,
      totalWeight,
      userId,
    };
    return this.trainingRepository.create(training);
  };
}
