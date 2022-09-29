import { Exercise, ExerciseName } from '../../../domain/models';
import { ExerciseEntity } from './exercise.entity';
import { ExerciseMapper } from './exercise.mapper';

describe('Exercise Mapper', () => {
  it('should return an exercise domain model', () => {
    const exerciseMapper = new ExerciseMapper();
    const exerciseEntity: ExerciseEntity = {
      id: '1',
      name: ExerciseName.BENCH,
      userId: '1',
    };
    const exercise: Exercise = exerciseMapper.mapToDomainModel(exerciseEntity);
    expect(exercise).toEqual({
      id: '1',
      name: ExerciseName.BENCH,
      userId: '1',
    });
  });
});
