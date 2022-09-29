import { NotFoundException } from '../../../domain/exceptions/not-found.exception';
import { ExerciseDone } from '../../../domain/models';
import { PersonalRecord } from '../../../domain/models/personal-record.model';
import { PersonalRecordRepository } from '../../../domain/repositories/personal-record.repository';
import { personalRecords } from '../fixtures/personal-record.fixture';

export class InMemoryPersonalRecordRepository
  implements PersonalRecordRepository
{
  retrieveAll = async (): Promise<PersonalRecord[]> => {
    return personalRecords;
  };

  retrieveByExercise = async (
    exercise: ExerciseDone,
  ): Promise<PersonalRecord> => {
    const filteredPersonalRecordsByExercise = personalRecords.filter(
      (personalRecord) => personalRecord.exercise.name === exercise.name,
    );
    if (0 === filteredPersonalRecordsByExercise.length) {
      throw new NotFoundException(
        `Error: exercise, ${exercise.name} does not exist`,
      );
    }
    return filteredPersonalRecordsByExercise.reduce((prev, current) =>
      prev.exercise.weight > current.exercise.weight ? prev : current,
    );
  };

  addPersonalRecords = async (
    personalRecordToAdd: PersonalRecord,
  ): Promise<PersonalRecord> => {
    return personalRecordToAdd;
  };
}
