"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
async function test() {
    const transporter = (0, nodemailer_1.createTransport)({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        tls: { rejectUnauthorized: false },
    });
    const info = await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_USER,
        subject: 'Test Email',
        text: 'Hello from Render SMTP!',
    });
    console.log('Message sent:', info.messageId);
}
test().catch(console.error);
//# sourceMappingURL=test-smtp.js.map