import { IdProvider } from '../../../domain/providers/id.provider';
import { Exercise } from '../../../domain/models';
import { ExerciseRepository } from '../../../domain/repositories/exercise.repository';
import { ExerciseCreateDTO } from '../../../adapters/primaries/nestjs/exercise/exercise-create.dto';
import { ConflictException } from '../../../domain/exceptions/conflict.exception';

export class CreateExercise {
  constructor(
    private readonly exerciseRepository: ExerciseRepository,
    private readonly idProvider: IdProvider,
  ) {}

  handle = async (
    exerciseToCreate: ExerciseCreateDTO,
    userId: string,
  ): Promise<Exercise> => {
    const exercise: Exercise = await this.exerciseRepository.retrieveOneByName(
      exerciseToCreate.name,
    );
    if (null !== exercise) {
      throw new ConflictException(
        `Error: exercise with name ${exerciseToCreate.name} already exists`,
      );
    }
    const id = this.idProvider.generate();
    const newExercise: Exercise = { ...exerciseToCreate, id, userId };
    return this.exerciseRepository.create(newExercise);
  };
}
