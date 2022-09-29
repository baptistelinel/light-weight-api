import { exercisesDone } from '../../../adapters/secondaries/fixtures/training.fixture';
import { FakeDateProvider } from '../../../adapters/providers/fake-date.provider';
import { InMemoryTrainingRepository } from '../../../adapters/secondaries/training/in-memory-training.repository';
import { RetrieveTrainingsByUserId } from './retrieve-trainings-by-user-id.usecase';

describe('Retrieve Trainings', () => {
  it('should retrieve all trainings by user id', async () => {
    const retrieveTrainingsByUserId = new RetrieveTrainingsByUserId(
      new InMemoryTrainingRepository(),
    );
    const date = new FakeDateProvider().getCurrent();
    const trainings = await retrieveTrainingsByUserId.handle('2');
    expect(trainings).toEqual([
      {
        id: '2',
        name: 'Thursday session',
        userId: '2',
        exercises: exercisesDone,
        date,
        commentary: 'I did some new PR',
        totalWeight: 235,
      },
    ]);
  });
});
