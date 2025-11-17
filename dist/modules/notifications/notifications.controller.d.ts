import { NotificationsService } from './notifications.service';
import { User } from '../users/schemas/user.schema';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(user: User, unreadOnly?: string): Promise<import("./schemas/notification.schema").NotificationDocument[]>;
    getUnreadCount(user: User): Promise<{
        count: number;
    }>;
    markAsRead(id: string, user: User): Promise<import("./schemas/notification.schema").NotificationDocument>;
    markAllAsRead(user: User): Promise<{
        message: string;
    }>;
    remove(id: string, user: User): Promise<void>;
}
