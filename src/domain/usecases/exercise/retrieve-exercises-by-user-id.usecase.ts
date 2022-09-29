import { Exercise } from '../../models';
import { ExerciseRepository } from '../../repositories/exercise.repository';

export class RetrieveExercisesByUserId {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  handle = async (userId: string): Promise<Exercise[]> => {
    return this.exerciseRepository.retrieveAllByUserId(userId);
  };
}
