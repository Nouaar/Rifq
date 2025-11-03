import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty({ description: 'User phone number', example: '+21692504166' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'OTP code sent to user', example: '123456' })
  @IsString()
  @Length(4, 6)
  @IsNotEmpty()
  code: string;
}
