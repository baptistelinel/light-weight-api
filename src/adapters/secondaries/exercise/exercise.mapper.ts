import { Exercise } from 'src/domain/models';
import { ExerciseEntity } from './exercise.entity';

export class ExerciseMapper {
  mapToDomainModel = (exerciseEntity: ExerciseEntity): Exercise => {
    return {
      id: exerciseEntity.id,
      name: exerciseEntity.name,
      userId: exerciseEntity.userId,
    };
  };
}
