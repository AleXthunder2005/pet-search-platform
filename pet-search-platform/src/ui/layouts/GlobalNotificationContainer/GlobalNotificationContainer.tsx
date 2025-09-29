import { useState} from "react";
import { createPortal } from "react-dom";
import { Notification } from "@components/Notification";
import styles from './styles/GlobalNotificationContainer.module.scss'

export interface NotificationItem {
    id: string;
    message: string;
    status: "success" | "error" | "info";
}

let addNotificationFn: ((notification: NotificationItem) => void);

export const GlobalNotificationContainer = () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }

    const addNotification =(notification: NotificationItem) => {
        setNotifications((prev) => [...prev, notification]);
        setTimeout(() => removeNotification(notification.id), 3000);
    }

    addNotificationFn = addNotification;

    return createPortal(
        <div className={styles["notifications-container"]}>
            {notifications.map((n) => (
                <Notification
                    key={n.id}
                    message={n.message}
                    status={n.status}
                    onClose={() => removeNotification(n.id)}
                />
            ))}
        </div>,
        document.getElementById('notifications-root')!
    );
};

export const notify = (message: string, status: "success" | "error" | "info") => {
    if (addNotificationFn) {
        addNotificationFn({ id: Math.random().toString(36).slice(2), message, status });
    }
};
