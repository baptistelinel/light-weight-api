import { getModelForClass, prop } from '@typegoose/typegoose';

export class ExerciseEntity {
  @prop({ required: true, type: () => String })
  id: string;

  @prop({ required: true, type: () => String })
  name: string;

  @prop({ required: true, type: () => String })
  userId: string;
}

export const ExerciseModel = getModelForClass(ExerciseEntity, {
  schemaOptions: { collection: 'exercises' },
});
