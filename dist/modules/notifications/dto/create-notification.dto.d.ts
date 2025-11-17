export declare class CreateNotificationDto {
    recipientId: string;
    senderId?: string;
    type: string;
    title: string;
    message: string;
    bookingId?: string;
    messageRefId?: string;
    metadata?: Record<string, any>;
}
