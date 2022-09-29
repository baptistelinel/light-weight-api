import { Training } from '../../../domain/models';
import { TrainingRepository } from '../../../domain/repositories';
import { TrainingUpdateDTO } from '../../primaries/nestjs/training/training-update.dto';
import { trainings } from '../fixtures/training.fixture';

export class InMemoryTrainingRepository implements TrainingRepository {
  retrieveAllByUserId = async (userId: string): Promise<Training[]> => {
    return trainings.filter((training) => training.userId === userId);
  };

  retrieveOneById = async (id: string): Promise<Training> => {
    const training = trainings.find((training) => training.id === id);
    if (undefined === training) {
      return null;
    }
    return training;
  };

  remove = async (trainingToRemove: Training): Promise<Training> => {
    const trainingIndexToRemove = trainings.indexOf(trainingToRemove);
    trainings.splice(trainingIndexToRemove, 1);
    return trainingToRemove;
  };

  create = async (trainingToCreate: Training): Promise<Training> => {
    trainings.push(trainingToCreate);
    return trainingToCreate;
  };

  update = async (
    trainingToUpdate: Training,
    trainingUpdate: TrainingUpdateDTO,
  ): Promise<Training> => {
    const trainingIndexToUpdate = trainings.indexOf(trainingToUpdate);
    const updatedTraining = { ...trainingToUpdate, ...trainingUpdate };
    trainings[trainingIndexToUpdate] = updatedTraining;
    return trainings[trainingIndexToUpdate];
  };
}
