import { Notification } from '../models/notification';

export class NotificationManager {

    notifications: Notification[] = [
        { id: '1', sender_id: "123", message: 'Hello', has_read: false },
        { id: '2', sender_id: "456", message: 'Hi', has_read: false },
        { id: '3', sender_id: "123", message: 'Welcome 456', has_read: false },
    ];

    getUnreadNotifications() {
        return this.notifications.filter((n) => !n.has_read);
    }

    getNotificationById(id: string) {
        return this.notifications.find((n) => n.id === id);
    }

    createNotification(message: string) {

        const notification = new Notification(
            Math.random().toString(36).substring(7),
            Math.random() > 0.5 ? '123' : '456',
            message,
            false,
        );

        this.notifications.push(notification);
        return notification;

    }

    markNotificationAsRead(id: string) {

        const notification = this.getNotificationById(id);

        if (notification) {
            notification.has_read = true;
        }

        return notification;

    }

    deleteNotification(id: string) {

        const index = this.notifications.findIndex((n) => n.id === id);

        if (index > -1) {
            this.notifications.splice(index, 1);
        }

    }

}
