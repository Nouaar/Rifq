// src/mail/mail.module.ts
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mailHost = configService.get<string>('MAIL_HOST');
        const mailPort = configService.get<number>('MAIL_PORT');
        const mailUser = configService.get<string>('MAIL_USER');
        const mailPass = configService.get<string>('MAIL_PASS');
        const mailFrom = configService.get<string>('MAIL_FROM');

        if (!mailHost || !mailUser || !mailPass || !mailFrom) {
          throw new Error(
            'Mail configuration is incomplete. Please check MAIL_HOST, MAIL_USER, MAIL_PASS, and MAIL_FROM environment variables.',
          );
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
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
