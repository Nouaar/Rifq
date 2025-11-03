//users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop()
  name: string;

  @Prop({ enum: ['owner', 'vet', 'sitter'], default: 'owner' })
  role: string;

  @Prop()
  avatarUrl: string;

  @Prop()
  otpCode?: string;

  @Prop()
  otpExpiresAt?: Date;

  @Prop({ default: false })
  isVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
