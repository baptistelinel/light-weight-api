import { TrainingUpdateDTO } from '../../../adapters/primaries/nestjs/training/training-update.dto';
import { Training } from '../../../domain/models';
import { TrainingRepository } from '../../../domain/repositories';
import { TrainingEntity, TrainingModel } from './training.entity';
import { TrainingMapper } from './training.mapper';

export class MongoTrainingRepository implements TrainingRepository {
  private readonly mapper: TrainingMapper = new TrainingMapper();

  async retrieveAllByUserId(userId: string): Promise<Training[]> {
    const trainingEntities: TrainingEntity[] =
      await TrainingModel.find<TrainingEntity>({ userId });
    return trainingEntities.map((trainingEntity) =>
      this.mapper.mapToDomainModel(trainingEntity),
    );
  }

  async retrieveOneById(id: string): Promise<Training | null> {
    const trainingEntity: TrainingEntity =
      await TrainingModel.findOne<TrainingEntity>({ id });
    if (null === trainingEntity) {
      return null;
    }
    return this.mapper.mapToDomainModel(trainingEntity);
  }

  async remove(trainingToRemove: Training): Promise<Training | null> {
    const trainingEntity: TrainingEntity =
      await TrainingModel.findOneAndDelete<TrainingEntity>({
        id: trainingToRemove.id,
      });
    if (null === trainingEntity) {
      return null;
    }
    return this.mapper.mapToDomainModel(trainingEntity);
  }

  async create(trainingToCreate: Training): Promise<Training> {
    const trainingEntity: TrainingEntity =
      await TrainingModel.create<TrainingEntity>(trainingToCreate);
    return this.mapper.mapToDomainModel(trainingEntity);
  }

  async update(
    training: Training,
    trainingUpdates: TrainingUpdateDTO,
  ): Promise<Training> {
    const trainingEntity: TrainingEntity = await TrainingModel.findOneAndUpdate(
      { id: training.id },
      trainingUpdates,
      { returnDocument: 'after' },
    );
    return this.mapper.mapToDomainModel(trainingEntity);
  }
}
