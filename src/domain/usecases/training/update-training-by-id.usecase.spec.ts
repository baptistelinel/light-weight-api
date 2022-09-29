import { InMemoryTrainingRepository } from '../../../adapters/secondaries/training/in-memory-training.repository';
import { UpdateTrainingById } from './update-training-by-id.usecase';
import { ExerciseName } from '../../../domain/models';
import { FakeDateProvider } from '../../../adapters/providers/fake-date.provider';
import {
  exercisesDone,
  trainingUpdates,
} from '../../../adapters/secondaries/fixtures/training.fixture';
import { NotFoundException } from '../../../domain/exceptions/not-found.exception';
import { TrainingUpdateDTO } from '../../../adapters/primaries/nestjs/training/training-update.dto';

describe('Update Training', () => {
  let updateTrainingById: UpdateTrainingById;

  beforeAll(() => {
    updateTrainingById = new UpdateTrainingById(
      new InMemoryTrainingRepository(),
    );
  });

  it('should update the name of an existing training', async () => {
    const date = new FakeDateProvider().getCurrent();
    const trainingUpdates: TrainingUpdateDTO = { name: 'Deload session' };
    const updatedTraining = await updateTrainingById.handle(
      '1',
      trainingUpdates,
    );
    expect(updatedTraining).toEqual({
      id: '1',
      date,
      name: 'Deload session',
      userId: '1',
      exercises: exercisesDone,
      commentary: 'Hard training',
      totalWeight: 235,
    });
  });

  it('should update the exercises and total weight of an existing training', async () => {
    const date = new FakeDateProvider().getCurrent();
    const updatedTraining = await updateTrainingById.handle(
      '1',
      trainingUpdates,
    );
    expect(updatedTraining).toEqual({
      id: '1',
      date,
      name: 'Monday session',
      userId: '1',
      exercises: [
        {
          id: '2',
          name: ExerciseName.SQUAT,
          weight: 140,
          repetitions: 1,
          rpe: 8,
        },
      ],
      commentary: 'Hard training',
      totalWeight: 140,
    });
  });

  it('should not work because training not found', async () => {
    await expect(
      updateTrainingById.handle('unkown_id', trainingUpdates),
    ).rejects.toThrow('Error : training not found with id unkown_id');
    await expect(
      updateTrainingById.handle('unkown_id', trainingUpdates),
    ).rejects.toThrowError(NotFoundException);
  });
});
