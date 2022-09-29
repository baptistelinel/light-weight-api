import { NotFoundException } from '../../exceptions/not-found.exception';
import { exercises } from '../../../adapters/secondaries/fixtures/exercise.fixture';
import { InMemoryExerciseRepository } from '../../../adapters/secondaries/exercise/in-memory-exercise.repository';
import { ExerciseName } from '../../models';
import { RemoveExerciseById } from './remove-exercise-by-id.usecase';

describe('Remove Exercise', () => {
  let removeExerciseById: RemoveExerciseById;

  beforeAll(() => {
    removeExerciseById = new RemoveExerciseById(
      new InMemoryExerciseRepository(),
    );
  });

  it('should remove an existing exercise', async () => {
    const exercisesLength = exercises.length;
    const removedExercise = await removeExerciseById.handle('1');
    expect(removedExercise).toEqual({
      id: '1',
      name: ExerciseName.SQUAT,
      userId: '1',
    });
    expect(exercises.length).toEqual(exercisesLength - 1);
  });

  it('should not work because exercise not found', async () => {
    await expect(removeExerciseById.handle('unkown_id')).rejects.toThrow(
      'Error : exercise not found with id unkown_id',
    );
    await expect(removeExerciseById.handle('unkown_id')).rejects.toThrowError(
      NotFoundException,
    );
  });
});
