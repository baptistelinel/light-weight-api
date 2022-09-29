import { Training } from 'src/domain/models';
import { exercisesDone } from '../fixtures/training.fixture';
import { TrainingEntity } from './training.entity';
import { TrainingMapper } from './training.mapper';

describe('Training Mapper', () =>
  it('should return a training domain model', () => {
    const trainingMapper = new TrainingMapper();
    const trainingEntity: TrainingEntity = {
      id: '1',
      name: 'Monday Session',
      userId: '1',
      exercises: exercisesDone,
      date: undefined,
      totalWeight: 0,
    };
    const training: Training = trainingMapper.mapToDomainModel(trainingEntity);
    expect(training).toEqual({
      id: '1',
      name: 'Monday Session',
      userId: '1',
      exercises: exercisesDone,
      date: undefined,
      totalWeight: 0,
    });
  }));
