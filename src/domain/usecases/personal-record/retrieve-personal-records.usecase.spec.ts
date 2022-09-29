import { FakeDateProvider } from '../../../adapters/providers/fake-date.provider';
import { InMemoryPersonalRecordRepository } from '../../../adapters/secondaries/personal-record/in-memory-personal-record.repository';
import { RetrievePersonalRecords } from './retrieve-personal-records.usecase';

describe('Retrieve Personal Records', () => {
  it('should retrieve the personal records', async () => {
    const date = new FakeDateProvider().getCurrent();
    const retrievePersonalRecords: RetrievePersonalRecords =
      new RetrievePersonalRecords(new InMemoryPersonalRecordRepository());

    const personalRecords = await retrievePersonalRecords.handle();
    expect(personalRecords).toEqual([
      {
        id: '1',
        date,
        exercise: {
          id: '1',
          name: 'SQUAT',
          repetitions: 1,
          weight: 140,
          rpe: 10,
        },
      },
      {
        id: '2',
        date,
        exercise: {
          id: '2',
          name: 'BENCH',
          repetitions: 1,
          weight: 90,
          rpe: 10,
        },
      },
      {
        id: '3',
        date,
        exercise: {
          id: '3',
          name: 'DEADLIFT',
          repetitions: 1,
          weight: 180,
          rpe: 10,
        },
      },
    ]);
  });
});
