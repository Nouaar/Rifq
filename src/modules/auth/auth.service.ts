import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import twilio from 'twilio';

@Injectable()
export class AuthService {
  private twilioClient: twilio.Twilio;
  private otpStore = new Map<string, string>(); // Temporary in-memory OTP store

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    this.twilioClient = twilio(
      this.configService.get<string>('TWILIO_ACCOUNT_SID'),
      this.configService.get<string>('TWILIO_AUTH_TOKEN'),
    );
  }

  async requestOtp(phoneNumber: string) {
    if (!phoneNumber) throw new BadRequestException('Phone number is required');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otpStore.set(phoneNumber, otp);

    const body = `🐾 Rifq: Your verification code is ${otp}`;
    const from = this.configService.get<string>('TWILIO_PHONE_NUMBER');
    const to = phoneNumber;

    await this.twilioClient.messages.create({ body, from, to });

    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(phoneNumber: string, code: string) {
    const storedOtp = this.otpStore.get(phoneNumber);
    console.log('Verifying OTP:', { phoneNumber, code, storedOtp });

    if (!storedOtp || storedOtp !== code) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // Find or create user
    let user = await this.userModel.findOne({ phoneNumber });
    if (!user) {
      user = await this.userModel.create({ phoneNumber, role: 'owner' });
    }

    const token = this.jwtService.sign({
      sub: user._id,
      phone: user.phoneNumber,
    });

    // Remove OTP from store
    this.otpStore.delete(phoneNumber);

    return { access_token: token, user };
  }
}
