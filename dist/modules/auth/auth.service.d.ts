import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
export declare class AuthService {
    private jwtService;
    private configService;
    private userModel;
    private twilioClient;
    private otpStore;
    constructor(jwtService: JwtService, configService: ConfigService, userModel: Model<UserDocument>);
    requestOtp(phoneNumber: string): Promise<{
        message: string;
    }>;
    verifyOtp(phoneNumber: string, code: string): Promise<{
        access_token: string;
        user: import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
