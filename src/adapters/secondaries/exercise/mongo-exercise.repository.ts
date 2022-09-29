import { ExerciseUpdateDTO } from '../../../adapters/primaries/nestjs/exercise/exercise-update.dto';
import { Exercise } from '../../../domain/models';
import { ExerciseRepository } from '../../../domain/repositories';
import { ExerciseEntity, ExerciseModel } from './exercise.entity';
import { ExerciseMapper } from './exercise.mapper';

export class MongoExerciseRepository implements ExerciseRepository {
  private readonly mapper: ExerciseMapper = new ExerciseMapper();

  async retrieveAllByUserId(userId: string): Promise<Exercise[]> {
    const exerciseEntities: ExerciseEntity[] =
      await ExerciseModel.find<ExerciseEntity>({ userId });
    return exerciseEntities.map((exerciseEntity) =>
      this.mapper.mapToDomainModel(exerciseEntity),
    );
  }

  async retrieveOneById(id: string): Promise<Exercise | null> {
    const exerciseEntity: ExerciseEntity =
      await ExerciseModel.findOne<ExerciseEntity>({ id });
    if (null === exerciseEntity) {
      return null;
    }
    return this.mapper.mapToDomainModel(exerciseEntity);
  }

  async retrieveOneByName(name: string): Promise<Exercise | null> {
    const exerciseEntity: ExerciseEntity =
      await ExerciseModel.findOne<ExerciseEntity>({ name });
    if (null === exerciseEntity) {
      return null;
    }
    return this.mapper.mapToDomainModel(exerciseEntity);
  }

  async create(exerciseToCreate: Exercise): Promise<Exercise> {
    const exerciseEntity: ExerciseEntity =
      await ExerciseModel.create<ExerciseEntity>(exerciseToCreate);
    return this.mapper.mapToDomainModel(exerciseEntity);
  }

  async remove(exerciseToRemove: Exercise): Promise<Exercise | null> {
    const exerciseEntity: ExerciseEntity =
      await ExerciseModel.findOneAndDelete<ExerciseEntity>({
        id: exerciseToRemove.id,
      });
    if (null === exerciseEntity) {
      return null;
    }
    return this.mapper.mapToDomainModel(exerciseEntity);
  }

  async update(
    exerciseToUpdate: Exercise,
    exerciseUpdates: ExerciseUpdateDTO,
  ): Promise<Exercise> {
    const exerciseEntity: ExerciseEntity =
      await ExerciseModel.findOneAndUpdate<ExerciseEntity>(
        { id: exerciseToUpdate.id },
        exerciseUpdates,
        { returnDocument: 'after' },
      );
    return this.mapper.mapToDomainModel(exerciseEntity);
  }
}
