import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestOtpDto {
  @ApiProperty({ description: 'User phone number', example: '+21692504166' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
}
