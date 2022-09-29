import { getModelForClass, prop } from '@typegoose/typegoose';

export class UserEntity {
  @prop({ required: true, type: () => String })
  id: string;

  @prop({ required: true, type: () => String })
  email: string;

  @prop({ required: true, type: () => String })
  password: string;
}

export const UserModel = getModelForClass(UserEntity, {
  schemaOptions: { collection: 'users' },
});
