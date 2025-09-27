import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import styles from "./styles/Modal.module.scss";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    if (!isMounted) return null;

    const modalOverlayClassList = clsx(styles["modal-overlay"], {
        [styles["modal-overlay--visible"]]: isOpen,
    });

    const modalClassList = clsx(styles["modal__container"], {
        [styles["modal__container--visible"]]: isOpen,
    });

    const handleTransitionEnd = () => {
        if (!isOpen) {
            setIsMounted(false);
        }
    };

    return createPortal(
        <div
            className={modalOverlayClassList}
            onClick={onClose}
            onTransitionEnd={handleTransitionEnd}
        >
            <div
                className={modalClassList}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles["modal__content"]}>
                    <button className={styles["modal__close"]} onClick={onClose}>
                        &times;
                    </button>
                    {children}
                </div>
                <div className={styles["modal__footer"]} />
            </div>
        </div>,
        document.getElementById("modal-root")!
    );
};
