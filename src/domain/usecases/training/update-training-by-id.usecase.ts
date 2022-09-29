import { TrainingRepository } from '../../../domain/repositories';
import { TrainingUpdateDTO } from '../../../adapters/primaries/nestjs/training/training-update.dto';
import { NotFoundException } from '../../exceptions/not-found.exception';
import { Training } from 'src/domain/models';

export class UpdateTrainingById {
  constructor(private readonly trainingRepository: TrainingRepository) {}

  handle = async (id: string, trainingUpdates: TrainingUpdateDTO) => {
    const training: Training = await this.trainingRepository.retrieveOneById(
      id,
    );
    if (null === training) {
      throw new NotFoundException(`Error : training not found with id ${id}`);
    }
    if (undefined !== trainingUpdates.exercises) {
      const totalWeight = trainingUpdates.exercises.reduce(
        (accumulator, exercise) => {
          return accumulator + exercise.weight * exercise.repetitions;
        },
        0,
      );
      return this.trainingRepository.update(training, {
        ...trainingUpdates,
        totalWeight,
      });
    }
    return this.trainingRepository.update(training, trainingUpdates);
  };
}
