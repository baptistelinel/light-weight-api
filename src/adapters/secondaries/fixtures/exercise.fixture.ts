import { ExerciseCreateDTO } from '../../../adapters/primaries/nestjs/exercise/exercise-create.dto';
import { ExerciseUpdateDTO } from '../../../adapters/primaries/nestjs/exercise/exercise-update.dto';
import { Exercise, ExerciseName } from '../../../domain/models';

export const exercises: Exercise[] = [
  {
    id: '1',
    name: ExerciseName.SQUAT,
    userId: '1',
  },
  {
    id: '2',
    name: ExerciseName.BENCH,
    userId: '1',
  },
  {
    id: '2',
    name: 'Squat tempo',
    userId: '2',
  },
];

export const exerciseCreateDTO: ExerciseCreateDTO = {
  name: 'Pause Squat',
};

export const exerciseUpdateDTO: ExerciseUpdateDTO = {
  name: 'Halt Squat',
};
