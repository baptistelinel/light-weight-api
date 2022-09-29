import { ExerciseDone } from '../../../domain/models';
import { PersonalRecord } from '../../../domain/models/personal-record.model';
import { PersonalRecordRepository } from '../../../domain/repositories/personal-record.repository';
import {
  PersonalRecordEntity,
  PersonalRecordModel,
} from './personal-record.entity';
import { PersonalRecordMapper } from './personal-record.mapper';

export class MongoPersonalRecordRepository implements PersonalRecordRepository {
  private readonly mapper = new PersonalRecordMapper();

  addPersonalRecords = async (
    personalRecordToAdd: PersonalRecord,
  ): Promise<PersonalRecord> => {
    const personalRecordEntity: PersonalRecord =
      await PersonalRecordModel.create<PersonalRecordEntity>(
        personalRecordToAdd,
      );
    return this.mapper.mapToDomainModel(personalRecordEntity);
  };

  retrieveAll = async (): Promise<PersonalRecord[]> => {
    const personalRecordEntities: PersonalRecordEntity[] =
      await PersonalRecordModel.find<PersonalRecordEntity>();
    return personalRecordEntities.map((personalRecordEntity) =>
      this.mapper.mapToDomainModel(personalRecordEntity),
    );
  };

  retrieveByExercise = async (
    exercise: ExerciseDone,
  ): Promise<PersonalRecord> => {
    const personalRecordEntity: PersonalRecordEntity =
      await PersonalRecordModel.findOne<PersonalRecordEntity>({ exercise });
    if (null === personalRecordEntity) {
      return null;
    }
    return this.mapper.mapToDomainModel(personalRecordEntity);
  };
}
