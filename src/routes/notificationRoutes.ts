import { Application } from "express";
import { NotificationManager } from "../services/notificationManager";

export function setupNotificationRoutes(app: Application, notificationManager: NotificationManager) {

    // Get all notifications
    app.get('/notifications', (req, res) => {
        res.json(notificationManager.notifications);
    });

    // Get all notifications that are unread
    app.get('/notifications/unread', (req, res) => {

        const unreadNotifications = notificationManager.getUnreadNotifications();
        res.json(unreadNotifications);

    });

    // Get a notification by id
    app.get('/notifications/:id', (req, res) => {

        const { id } = req.params;
        const notification = notificationManager.getNotificationById(id);

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        res.json(notification);

    });

    // Creates a new notification
    app.post('/notifications', (req, res) => {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const notification = notificationManager.createNotification(message);
        res.json(notification);

    });

    // Marks a notification as read
    app.put('/notifications/:id', (req, res) => {

        const { id } = req.params;
        const notification = notificationManager.markNotificationAsRead(id);

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        res.json(notification);

    });

}
