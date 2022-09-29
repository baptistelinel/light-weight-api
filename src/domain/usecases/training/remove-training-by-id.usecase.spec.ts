import {
  exercisesDone,
  trainings,
} from '../../../adapters/secondaries/fixtures/training.fixture';
import { InMemoryTrainingRepository } from '../../../adapters/secondaries/training/in-memory-training.repository';
import { RemoveTrainingById } from './remove-training-by-id.usecase';
import { FakeDateProvider } from '../../../adapters/providers/fake-date.provider';
import { NotFoundException } from '../../../domain/exceptions/not-found.exception';

describe('Remove Training', () => {
  let removeTrainingById: RemoveTrainingById;

  beforeAll(() => {
    removeTrainingById = new RemoveTrainingById(
      new InMemoryTrainingRepository(),
    );
  });

  it('should remove an existing training', async () => {
    const trainingsLenght = trainings.length;
    const deletedTraining = await removeTrainingById.handle('1');
    expect(deletedTraining).toEqual({
      id: '1',
      name: 'Monday session',
      userId: '1',
      exercises: exercisesDone,
      date: new FakeDateProvider().getCurrent(),
      commentary: 'Hard training',
      totalWeight: 235,
    });
    expect(trainings.length).toEqual(trainingsLenght - 1);
  });

  it('should not work because training not found', async () => {
    await expect(removeTrainingById.handle('unkown_id')).rejects.toThrow(
      'Error : training not found with id unkown_id',
    );
    await expect(removeTrainingById.handle('unkown_id')).rejects.toThrowError(
      NotFoundException,
    );
  });
});
