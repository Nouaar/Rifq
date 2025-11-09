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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_1 = __importDefault(require("nodemailer"));
let MailService = class MailService {
    constructor() {
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;
        if (!user || !pass) {
            throw new Error('MAIL_USER and MAIL_PASS must be defined in environment variables');
        }
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: { user, pass },
        });
    }
    async sendVerificationCode(email, code) {
        const from = process.env.MAIL_FROM;
        if (!from) {
            throw new Error('MAIL_FROM must be defined in environment variables');
        }
        const mailOptions = {
            from,
            to: email,
            subject: 'Verify your email address',
            html: `
        <h2>Your verification code</h2>
        <p>Use this code to verify your email:</p>
        <h1 style="font-size: 32px; letter-spacing: 4px;">${code}</h1>
        <p>This code will expire in 10 minutes.</p>
      `,
        };
        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Verification email sent:', info.messageId);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Failed to send verification email:', error.message);
            }
            else {
                console.error('Unknown error when sending email');
            }
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map