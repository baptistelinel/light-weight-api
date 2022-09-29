import { TrainingUpdateDTO } from 'src/adapters/primaries/nestjs/training/training-update.dto';
import { Training } from '../models/training.model';

export interface TrainingRepository {
  retrieveAllByUserId(userId: string): Promise<Training[]>;
  retrieveOneById(id: string): Promise<Training>;
  remove(trainingToRemove: Training): Promise<Training>;
  create(trainingToCreate: Training): Promise<Training>;
  update(
    training: Training,
    trainingUpdates: TrainingUpdateDTO,
  ): Promise<Training>;
}
