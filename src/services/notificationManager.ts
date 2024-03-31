import { Notification } from '../models/notification';

// TODO:
// 1. Use UUIDs for the notification IDs.

export class NotificationManager {

    notifications: Notification[] = [
        { id: '1', sender_id: "123", message: 'Hello', has_read: false, deleted: false },
        { id: '2', sender_id: "456", message: 'Hi', has_read: false, deleted: false },
        { id: '3', sender_id: "123", message: 'Welcome 456', has_read: false, deleted: false },
    ];

    getUnreadNotifications(): Notification[] {
        return this.notifications.filter((n) => !n.has_read && !n.deleted);
    }

    getNotificationById(id: string): Notification | undefined {
        return this.notifications.find((n) => n.id === id && !n.deleted);
    }

    createNotification(message: string): Notification {

        const notification = new Notification(
            Math.random().toString(36).substring(7),
            Math.random() > 0.5 ? '123' : '456',
            message,
            false,
        );

        this.notifications.push(notification);
        return notification;

    }

    markNotificationAsRead(id: string): Notification | undefined {

        const notification = this.getNotificationById(id);

        if (notification) {
            notification.has_read = true;
            notification.updated_at = new Date();
        }

        return notification;

    }

    deleteNotification(id: string): string {

        const notification = this.getNotificationById(id);

        if (notification) {
            notification.deleted = true;
            return "success";
        }

        return "failed";

    }

}
