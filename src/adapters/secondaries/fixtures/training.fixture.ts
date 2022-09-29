import { TrainingCreateDTO } from 'src/adapters/primaries/nestjs/training/training-create.dto';
import { TrainingUpdateDTO } from 'src/adapters/primaries/nestjs/training/training-update.dto';
import { FakeDateProvider } from '../../../adapters/providers/fake-date.provider';
import { ExerciseDone, ExerciseName, Training } from '../../../domain/models';

const date = new FakeDateProvider().getCurrent();

export const exercisesDone: ExerciseDone[] = [
  {
    id: '1',
    name: ExerciseName.BENCH,
    weight: 95,
    repetitions: 1,
    rpe: 10,
  },
  {
    id: '2',
    name: ExerciseName.SQUAT,
    weight: 140,
    repetitions: 1,
    rpe: 9,
  },
];

export const trainings: Training[] = [
  {
    id: '1',
    name: 'Monday session',
    userId: '1',
    exercises: exercisesDone,
    date,
    commentary: 'Hard training',
    totalWeight: 235,
  },
  {
    id: '2',
    name: 'Sunday session',
    userId: '1',
    exercises: exercisesDone,
    date,
    commentary: 'Easy training',
    totalWeight: 235,
  },
  {
    id: '2',
    name: 'Thursday session',
    userId: '2',
    exercises: exercisesDone,
    date,
    commentary: 'I did some new PR',
    totalWeight: 235,
  },
];

export const trainingCreate: TrainingCreateDTO = {
  name: 'Friday session',
  exercises: exercisesDone,
  commentary: 'New training session to try',
};

export const trainingUpdates: TrainingUpdateDTO = {
  name: 'Monday session',
  exercises: [
    {
      id: '2',
      name: ExerciseName.SQUAT,
      weight: 140,
      repetitions: 1,
      rpe: 8,
    },
  ],
  commentary: 'Hard training',
};
