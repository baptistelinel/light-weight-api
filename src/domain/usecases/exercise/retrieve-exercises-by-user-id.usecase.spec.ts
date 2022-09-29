import { InMemoryExerciseRepository } from '../../../adapters/secondaries/exercise/in-memory-exercise.repository';
import { ExerciseName } from '../../models';
import { RetrieveExercisesByUserId } from './retrieve-exercises-by-user-id.usecase';

describe('Retrieve Exercises', () => {
  it('should retrieve all exercises by user id', async () => {
    const retrieveExercises: RetrieveExercisesByUserId =
      new RetrieveExercisesByUserId(new InMemoryExerciseRepository());
    const exercises = await retrieveExercises.handle('1');
    expect(exercises).toEqual([
      {
        id: '1',
        name: ExerciseName.SQUAT,
        userId: '1',
      },
      {
        id: '2',
        name: ExerciseName.BENCH,
        userId: '1',
      },
    ]);
  });
});
