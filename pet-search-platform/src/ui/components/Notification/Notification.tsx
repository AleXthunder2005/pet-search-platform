import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./styles/Notification.module.scss";

interface NotificationProps {
    message: string;
    status: "success" | "error" | "info";
    duration?: number;
    onClose?: () => void;
}

export const Notification = ({
                                 message,
                                 status,
                                 duration = 3000,
                                 onClose,
                             }: NotificationProps) => {
    const [closing, setClosing] = useState(false);
    const timerRef = useRef<number>(null);

    const clearTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const startTimer = () => {
        clearTimer();
        timerRef.current = setTimeout(() => handleClose(), duration);
    };

    useEffect(() => {
        startTimer();
        return clearTimer;
    }, [duration]);

    const handleClose = () => {
        setClosing(true);
        if (onClose) onClose();
    };

    return (
        <div
            className={clsx(
                styles["notification"],
                styles[`notification--${status}`],
                { [styles.closing]: closing }
            )}
            onMouseEnter={clearTimer}
            onMouseLeave={startTimer}
        >
            <span className={styles["notification__message"]}>{message}</span>
            <button className={styles["notification__close"]} onClick={handleClose}>
                &times;
            </button>
        </div>
    );
};
