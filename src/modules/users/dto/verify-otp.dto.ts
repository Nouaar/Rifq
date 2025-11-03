//users/dto/verify-otp.dto.ts
import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

export class VerifyOtpDto {
  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}
