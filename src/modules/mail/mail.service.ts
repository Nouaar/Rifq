// src/modules/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private readonly transporter: Transporter;

  constructor() {
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      throw new Error(
        'MAIL_USER and MAIL_PASS must be defined in environment variables',
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }

  async sendVerificationCode(email: string, code: string): Promise<void> {
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const info = await this.transporter.sendMail(mailOptions);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log('Verification email sent:', info.messageId);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to send verification email:', error.message);
      } else {
        console.error('Unknown error when sending email');
      }
    }
  }
}
