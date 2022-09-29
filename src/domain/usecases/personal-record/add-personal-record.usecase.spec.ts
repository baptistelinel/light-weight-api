import { ExerciseName, Training } from '../../models';
import { InMemoryPersonalRecordRepository } from '../../../adapters/secondaries/personal-record/in-memory-personal-record.repository';
import { AddPersonalRecord } from './add-personal-record.usecase';
import { FakeDateProvider } from '../../../adapters/providers/fake-date.provider';
import { FakeIdProvider } from '../../../adapters/providers/fake-id.provider';
import { NotFoundException } from '../../../domain/exceptions/not-found.exception';
import { InMemoryExerciseRepository } from '../../../adapters/secondaries/exercise/in-memory-exercise.repository';

describe('Add Perosnal Record', () => {
  let addPersonalRecord: AddPersonalRecord;
  let date: Date;

  beforeAll(() => {
    addPersonalRecord = new AddPersonalRecord(
      new InMemoryPersonalRecordRepository(),
      new InMemoryExerciseRepository(),
      new FakeDateProvider(),
      new FakeIdProvider(),
    );
    date = new FakeDateProvider().getCurrent();
  });

  it('should add a new personal record', async () => {
    const training: Training = {
      id: '1',
      name: 'Monday session',
      userId: '2',
      exercises: [
        {
          id: '1',
          name: ExerciseName.SQUAT,
          repetitions: 2,
          weight: 140,
          rpe: 9,
        },
        {
          id: '1',
          name: ExerciseName.SQUAT,
          repetitions: 1,
          weight: 150,
          rpe: 10,
        },
        {
          id: '1',
          name: ExerciseName.SQUAT,
          repetitions: 5,
          weight: 120,
          rpe: 7,
        },
        {
          id: '2',
          name: ExerciseName.BENCH,
          repetitions: 1,
          weight: 97,
          rpe: 10,
        },
      ],
      date,
      totalWeight: 350,
    };
    const personalRecordToAdd = await addPersonalRecord.handle(training);
    expect(personalRecordToAdd).toEqual([
      {
        id: '100',
        exercise: {
          id: '1',
          name: 'SQUAT',
          repetitions: 1,
          weight: 150,
          rpe: 10,
        },
        date,
      },
      {
        id: '100',
        exercise: {
          id: '2',
          name: 'BENCH',
          repetitions: 1,
          weight: 97,
          rpe: 10,
        },
        date,
      },
    ]);
  });

  it('should not add a new personal record because exercise training max weight is too low', async () => {
    const training: Training = {
      id: '1',
      name: 'Sunday session',
      userId: '1',
      exercises: [
        {
          id: '1',
          name: ExerciseName.SQUAT,
          repetitions: 2,
          weight: 130,
          rpe: 9,
        },
        {
          id: '2',
          name: ExerciseName.BENCH,
          repetitions: 1,
          weight: 70,
          rpe: 10,
        },
      ],
      date,
      totalWeight: 350,
    };

    const personalRecordToAdd = await addPersonalRecord.handle(training);
    expect(personalRecordToAdd).toEqual([undefined, undefined]);
  });

  it('should not add a perosnal record because exercise not found', async () => {
    const training: Training = {
      id: '1',
      name: 'Sunday session',
      userId: '2',
      exercises: [
        {
          id: '1',
          name: 'unknow_exercise',
          repetitions: 2,
          weight: 130,
          rpe: 9,
        },
      ],
      date,
      totalWeight: 350,
    };

    await expect(addPersonalRecord.handle(training)).rejects.toThrow(
      'Error: exercise, unknow_exercise does not exist',
    );
    await expect(addPersonalRecord.handle(training)).rejects.toThrowError(
      NotFoundException,
    );
  });
});
