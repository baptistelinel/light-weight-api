import { InMemoryTrainingRepository } from '../../../adapters/secondaries/training/in-memory-training.repository';
import { CreateTraining } from './create-training.usecase';
import { FakeDateProvider } from '../../../adapters/providers/fake-date.provider';
import {
  exercisesDone,
  trainingCreate,
  trainings,
} from '../../../adapters/secondaries/fixtures/training.fixture';
import { FakeIdProvider } from '../../../adapters/providers/fake-id.provider';

describe('Create Training', () => {
  it('should create a new training', async () => {
    const createTraining: CreateTraining = new CreateTraining(
      new InMemoryTrainingRepository(),
      new FakeDateProvider(),
      new FakeIdProvider(),
    );
    const date = new FakeDateProvider().getCurrent();
    const trainingsLenght = trainings.length;
    const createdTraining = await createTraining.handle(trainingCreate, '2');
    expect(createdTraining).toEqual({
      id: '100',
      date,
      name: 'Friday session',
      userId: '2',
      exercises: exercisesDone,
      commentary: 'New training session to try',
      totalWeight: 235,
    });
    expect(trainings.length).toEqual(trainingsLenght + 1);
  });
});
