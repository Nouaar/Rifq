"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const twilio_1 = __importDefault(require("twilio"));
let AuthService = class AuthService {
    jwtService;
    configService;
    userModel;
    twilioClient;
    otpStore = new Map();
    constructor(jwtService, configService, userModel) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.userModel = userModel;
        this.twilioClient = (0, twilio_1.default)(this.configService.get('TWILIO_ACCOUNT_SID'), this.configService.get('TWILIO_AUTH_TOKEN'));
    }
    async requestOtp(phoneNumber) {
        if (!phoneNumber)
            throw new common_1.BadRequestException('Phone number is required');
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        this.otpStore.set(phoneNumber, otp);
        const body = `🐾 Rifq: Your verification code is ${otp}`;
        const from = this.configService.get('TWILIO_PHONE_NUMBER');
        const to = phoneNumber;
        await this.twilioClient.messages.create({ body, from, to });
        return { message: 'OTP sent successfully' };
    }
    async verifyOtp(phoneNumber, code) {
        const storedOtp = this.otpStore.get(phoneNumber);
        console.log('Verifying OTP:', { phoneNumber, code, storedOtp });
        if (!storedOtp || storedOtp !== code) {
            throw new common_1.UnauthorizedException('Invalid or expired OTP');
        }
        let user = await this.userModel.findOne({ phoneNumber });
        if (!user) {
            user = await this.userModel.create({ phoneNumber, role: 'owner' });
        }
        const token = this.jwtService.sign({
            sub: user._id,
            phone: user.phoneNumber,
        });
        this.otpStore.delete(phoneNumber);
        return { access_token: token, user };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map