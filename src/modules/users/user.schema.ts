import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ name: 'mobile_number' })
  mobileNumber: string;

  @Prop({ name: 'cpf_cnpj' })
  cpfCnpj: string;

  @Prop()
  timestamps: true;
}

export const UserSchema = SchemaFactory.createForClass(User);
