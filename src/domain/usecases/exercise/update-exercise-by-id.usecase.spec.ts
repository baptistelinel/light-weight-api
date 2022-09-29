import { NotFoundException } from '../../../domain/exceptions/not-found.exception';
import { InMemoryExerciseRepository } from '../../../adapters/secondaries/exercise/in-memory-exercise.repository';
import { UpdateExerciseById } from './update-exercise-by-id.usecase';
import { exerciseUpdateDTO } from '../../../adapters/secondaries/fixtures/exercise.fixture';
import { ConflictException } from '../../../domain/exceptions/conflict.exception';
import { ExerciseName } from '../../../domain/models';

describe('Update Exercise', () => {
  let updateExerciseById: UpdateExerciseById;

  beforeAll(() => {
    updateExerciseById = new UpdateExerciseById(
      new InMemoryExerciseRepository(),
    );
  });

  it('should update an exercise', async () => {
    const updatedExercise = await updateExerciseById.handle(
      '1',
      exerciseUpdateDTO,
    );
    expect(updatedExercise).toEqual({
      id: '1',
      name: 'Halt Squat',
      userId: '1',
    });
  });

  it('should noT UPDATE because exercise not found', async () => {
    await expect(
      updateExerciseById.handle('unkown_id', exerciseUpdateDTO),
    ).rejects.toThrow('Error : exercise not found with id unkown_id');
    await expect(
      updateExerciseById.handle('unkown_id', exerciseUpdateDTO),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should not update exercise because exercise name already exists', async () => {
    await expect(
      updateExerciseById.handle('1', { name: ExerciseName.BENCH }),
    ).rejects.toThrow('Error: exercise with name BENCH already exists');
    await expect(
      updateExerciseById.handle('1', { name: ExerciseName.BENCH }),
    ).rejects.toThrowError(ConflictException);
  });
});
