import { Training } from '../../../domain/models';
import { NotFoundException } from '../../../domain/exceptions/not-found.exception';
import { TrainingRepository } from '../../../domain/repositories';

export class RemoveTrainingById {
  constructor(private readonly trainingRepository: TrainingRepository) {}

  handle = async (id: string): Promise<Training> => {
    const training: Training = await this.trainingRepository.retrieveOneById(
      id,
    );
    if (null === training) {
      throw new NotFoundException(`Error : training not found with id ${id}`);
    }
    return this.trainingRepository.remove(training);
  };
}
