import { PersonalRecord } from '../../../domain/models/personal-record.model';
import { PersonalRecordRepository } from '../../repositories/personal-record.repository';

export class RetrievePersonalRecords {
  constructor(
    private readonly personalRecordRepository: PersonalRecordRepository,
  ) {}

  handle = async (): Promise<PersonalRecord[]> => {
    return this.personalRecordRepository.retrieveAll();
  };
}
