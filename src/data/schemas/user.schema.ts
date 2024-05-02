// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type UserDocument = User & mongoose.Document;
@Schema()
export class User {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  email: string;
  @Prop()
  role: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  changePasswordAt: Date;
  @Prop()
  passwordResetToken: string;
  @Prop()
  passwordResetExpires: Date;
  @Prop()
  active: boolean;

}
export const UserSchema = SchemaFactory.createForClass(User);
