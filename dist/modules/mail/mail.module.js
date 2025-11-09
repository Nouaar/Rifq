"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const mail_service_1 = require("./mail.service");
const config_1 = require("@nestjs/config");
let MailModule = class MailModule {
};
exports.MailModule = MailModule;
exports.MailModule = MailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const mailHost = configService.get('MAIL_HOST');
                    const mailPort = configService.get('MAIL_PORT');
                    const mailUser = configService.get('MAIL_USER');
                    const mailPass = configService.get('MAIL_PASS');
                    const mailFrom = configService.get('MAIL_FROM');
                    if (!mailHost || !mailUser || !mailPass || !mailFrom) {
                        throw new Error('Mail configuration is incomplete. Please check MAIL_HOST, MAIL_USER, MAIL_PASS, and MAIL_FROM environment variables.');
                    }
                    return {
                        transport: {
                            host: mailHost,
                            port: mailPort || 587,
                            secure: false,
                            auth: {
                                user: mailUser,
                                pass: mailPass,
                            },
                        },
                        defaults: {
                            from: mailFrom,
                        },
                    };
                },
            }),
        ],
        providers: [mail_service_1.MailService],
        exports: [mail_service_1.MailService],
    })
], MailModule);
//# sourceMappingURL=mail.module.js.map