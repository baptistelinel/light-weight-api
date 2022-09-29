import { ExerciseDone } from '../../../../domain/models';

export class TrainingCreateDTO {
  name: string;
  exercises: ExerciseDone[];
  commentary?: string;
}
