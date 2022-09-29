import {
  getModelForClass,
  ModelOptions,
  mongoose,
  prop,
  Severity,
} from '@typegoose/typegoose';
import { ExerciseDone } from 'src/domain/models';

@ModelOptions({ options: { allowMixed: Severity.ALLOW } })
export class TrainingEntity {
  @prop({ required: true, type: () => String })
  id: string;

  @prop({ required: true, type: () => String })
  name: string;

  @prop({ required: true, type: () => String })
  userId: string;

  @prop({
    required: true,
    type: mongoose.Schema.Types.Mixed,
  })
  exercises: ExerciseDone[];

  @prop({ required: true, type: () => Date })
  date: Date;

  @prop({ required: false, type: () => String })
  commentary?: string;

  @prop({ required: true, type: () => Number })
  totalWeight: number;
}

export const TrainingModel = getModelForClass(TrainingEntity, {
  schemaOptions: { collection: 'trainings' },
});
