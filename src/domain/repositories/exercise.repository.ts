import { ExerciseUpdateDTO } from '../../adapters/primaries/nestjs/exercise/exercise-update.dto';
import { Exercise } from '../models/exercise.model';

export interface ExerciseRepository {
  retrieveAllByUserId(userId: string): Promise<Exercise[]>;
  retrieveOneById(id: string): Promise<Exercise>;
  retrieveOneByName(name: string): Promise<Exercise>;
  create(exerciseToCreate: Exercise): Promise<Exercise>;
  remove(exerciseToRemove: Exercise): Promise<Exercise>;
  update(
    exerciseToUpdate: Exercise,
    exerciseUpdates: ExerciseUpdateDTO,
  ): Promise<Exercise>;
}
