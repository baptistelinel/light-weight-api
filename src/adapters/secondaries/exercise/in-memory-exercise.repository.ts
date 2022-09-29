import { Exercise } from '../../../domain/models';
import { ExerciseRepository } from '../../../domain/repositories/exercise.repository';
import { ExerciseUpdateDTO } from '../../primaries/nestjs/exercise/exercise-update.dto';
import { exercises } from '../fixtures/exercise.fixture';

export class InMemoryExerciseRepository implements ExerciseRepository {
  retrieveAllByUserId = async (userId: string): Promise<Exercise[]> => {
    return exercises.filter((exercise) => exercise.userId === userId);
  };

  retrieveOneById = async (id: string): Promise<Exercise> => {
    const exercise = exercises.find((exercise) => exercise.id === id);
    if (undefined === exercise) {
      return null;
    }
    return exercise;
  };

  retrieveOneByName = async (name: string): Promise<Exercise> => {
    const exercise = exercises.find((exercise) => exercise.name === name);
    if (undefined === exercise) {
      return null;
    }
    return exercise;
  };

  create = async (exerciseToCreate: Exercise): Promise<Exercise> => {
    exercises.push(exerciseToCreate);
    return exerciseToCreate;
  };

  remove = async (exerciseToRemove: Exercise): Promise<Exercise> => {
    const exerciseIndexToRemove = exercises.indexOf(exerciseToRemove);
    exercises.splice(exerciseIndexToRemove, 1);
    return exerciseToRemove;
  };

  update = async (
    exerciseToUpdate: Exercise,
    exerciseUpdates: ExerciseUpdateDTO,
  ): Promise<Exercise> => {
    const exerciseIndexToUpdate = exercises.indexOf(exerciseToUpdate);
    const updatedExercise = { ...exerciseToUpdate, ...exerciseUpdates };
    exercises[exerciseIndexToUpdate] = updatedExercise;
    return exercises[exerciseIndexToUpdate];
  };
}
