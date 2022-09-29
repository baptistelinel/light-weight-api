import { ExerciseName } from '../../../domain/models';
import { exercises } from '../../../adapters/secondaries/fixtures/exercise.fixture';
import { InMemoryExerciseRepository } from '../../../adapters/secondaries/exercise/in-memory-exercise.repository';
import { CreateExercise } from './create-exercise.usecase';
import { FakeIdProvider } from '../../../adapters/providers/fake-id.provider';
import { ExerciseCreateDTO } from '../../../adapters/primaries/nestjs/exercise/exercise-create.dto';
import { ConflictException } from '../../../domain/exceptions/conflict.exception';

describe('Create exercise', () => {
  let createExercise: CreateExercise;
  beforeAll(() => {
    createExercise = new CreateExercise(
      new InMemoryExerciseRepository(),
      new FakeIdProvider(),
    );
  });

  it('should create a new exercise', async () => {
    const exerciseToCreate: ExerciseCreateDTO = {
      name: 'Halt Squat',
    };
    const exercisesLengt = exercises.length;
    const createdExercise = await createExercise.handle(exerciseToCreate, '1');
    expect(createdExercise).toEqual({
      id: '100',
      name: 'Halt Squat',
      userId: '1',
    });
    expect(exercises.length).toEqual(exercisesLengt + 1);
  });

  it('should not create an exercise with an alreay taken exercise name', async () => {
    await expect(
      createExercise.handle({ name: ExerciseName.SQUAT }, '1'),
    ).rejects.toThrow(
      `[ConflictException] Error: exercise with name ${ExerciseName.SQUAT} already exists`,
    );
    await expect(
      createExercise.handle({ name: ExerciseName.SQUAT }, '1'),
    ).rejects.toThrowError(ConflictException);
  });
});
