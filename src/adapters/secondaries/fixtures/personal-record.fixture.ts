import { FakeDateProvider } from '../../../adapters/providers/fake-date.provider';
import { PersonalRecord } from '../../../domain/models/personal-record.model';

const date = new FakeDateProvider().getCurrent();

export const personalRecords: PersonalRecord[] = [
  {
    id: '1',
    date,
    exercise: { id: '1', name: 'SQUAT', repetitions: 1, weight: 140, rpe: 10 },
  },
  {
    id: '2',
    date,
    exercise: { id: '2', name: 'BENCH', repetitions: 1, weight: 90, rpe: 10 },
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
];
