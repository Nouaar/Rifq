export declare class MailService {
    private readonly transporter;
    constructor();
    sendVerificationCode(email: string, code: string): Promise<void>;
}
