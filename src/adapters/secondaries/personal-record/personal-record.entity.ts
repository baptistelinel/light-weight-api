import {
  getModelForClass,
  ModelOptions,
  mongoose,
  prop,
  Severity,
} from '@typegoose/typegoose';
import { ExerciseDone } from '../../../domain/models';

@ModelOptions({ options: { allowMixed: Severity.ALLOW } })
export class PersonalRecordEntity {
  @prop({ required: true, type: () => String })
  id: string;

  @prop({ required: true, type: () => Date })
  date: Date;

  @prop({
    required: true,
    type: mongoose.Schema.Types.Mixed,
  })
  exercise: ExerciseDone;
}

export const PersonalRecordModel = getModelForClass(PersonalRecordEntity, {
  schemaOptions: { collection: 'personalRecords' },
});
