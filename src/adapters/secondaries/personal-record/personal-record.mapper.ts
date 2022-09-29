import { PersonalRecord } from '../../../domain/models/personal-record.model';
import { PersonalRecordEntity } from './personal-record.entity';

export class PersonalRecordMapper {
  mapToDomainModel = (
    personalRecordEntity: PersonalRecordEntity,
  ): PersonalRecord => {
    return {
      id: personalRecordEntity.id,
      date: personalRecordEntity.date,
      exercise: personalRecordEntity.exercise,
    };
  };
}
