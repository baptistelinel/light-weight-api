import { NotFoundException } from '../../exceptions/not-found.exception';
import { Exercise } from '../../models';
import { ExerciseRepository } from '../../repositories/exercise.repository';

export class RemoveExerciseById {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  handle = async (id: string): Promise<Exercise> => {
    const exercise: Exercise = await this.exerciseRepository.retrieveOneById(
      id,
    );
    if (null === exercise) {
      throw new NotFoundException(`Error : exercise not found with id ${id}`);
    }
    return this.exerciseRepository.remove(exercise);
  };
}
