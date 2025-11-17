import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationDocument } from './schemas/notification.schema';
export declare class NotificationsService {
    private readonly notificationModel;
    constructor(notificationModel: Model<NotificationDocument>);
    create(createNotificationDto: CreateNotificationDto): Promise<NotificationDocument>;
    findAll(userId: string, unreadOnly?: boolean): Promise<NotificationDocument[]>;
    getUnreadCount(userId: string): Promise<number>;
    markAsRead(id: string, userId: string): Promise<NotificationDocument>;
    markAllAsRead(userId: string): Promise<void>;
    remove(id: string, userId: string): Promise<void>;
}
