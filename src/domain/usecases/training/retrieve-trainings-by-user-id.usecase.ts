import { Training } from '../../models';
import { TrainingRepository } from '../../repositories/training.repository';

export class RetrieveTrainingsByUserId {
  constructor(private readonly trainingRepository: TrainingRepository) {}

  handle = async (userId: string): Promise<Training[]> => {
    return this.trainingRepository.retrieveAllByUserId(userId);
  };
}
