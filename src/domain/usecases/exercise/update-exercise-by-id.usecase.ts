import { ExerciseUpdateDTO } from '../../../adapters/primaries/nestjs/exercise/exercise-update.dto';
import { ExerciseRepository } from '../../../domain/repositories/exercise.repository';
import { NotFoundException } from '../../../domain/exceptions/not-found.exception';
import { Exercise } from '../../../domain/models';
import { ConflictException } from '../../../domain/exceptions/conflict.exception';

export class UpdateExerciseById {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  handle = async (
    id: string,
    exerciseUpdates: ExerciseUpdateDTO,
  ): Promise<Exercise> => {
    const exercise: Exercise = await this.exerciseRepository.retrieveOneById(
      id,
    );
    if (null === exercise) {
      throw new NotFoundException(`Error : exercise not found with id ${id}`);
    }
    const exerciseByName: Exercise =
      await this.exerciseRepository.retrieveOneByName(exerciseUpdates.name);
    if (null !== exerciseByName) {
      throw new ConflictException(
        `Error: exercise with name ${exerciseUpdates.name} already exists`,
      );
    }
    return this.exerciseRepository.update(exercise, exerciseUpdates);
  };
}
