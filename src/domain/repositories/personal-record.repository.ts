import { ExerciseDone } from '../models';
import { PersonalRecord } from '../models/personal-record.model';

export interface PersonalRecordRepository {
  retrieveAll(): Promise<PersonalRecord[]>;
  retrieveByExercise(exercise: ExerciseDone): Promise<PersonalRecord>;
  addPersonalRecords(
    personalToRecordAdd: PersonalRecord,
  ): Promise<PersonalRecord>;
}
