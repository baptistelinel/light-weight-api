import { Training } from '../../../domain/models';
import { TrainingEntity } from './training.entity';

export class TrainingMapper {
  mapToDomainModel = (trainingEntity: TrainingEntity): Training => {
    return {
      id: trainingEntity.id,
      name: trainingEntity.name,
      userId: trainingEntity.userId,
      date: trainingEntity.date,
      commentary: trainingEntity.commentary,
      exercises: trainingEntity.exercises.map((exerciseDone) => ({
        id: exerciseDone.id,
        name: exerciseDone.name,
        weight: exerciseDone.weight,
        repetitions: exerciseDone.repetitions,
        rpe: exerciseDone.rpe,
      })),
      totalWeight: trainingEntity.totalWeight,
    };
  };
}
