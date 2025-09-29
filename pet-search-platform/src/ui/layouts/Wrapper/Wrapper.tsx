import React from "react";
import styles from './styles/Wrapper.module.scss'

interface WrapperProps {
    children: React.ReactNode;
    className?: string;
}

export const Wrapper = ({ children} : WrapperProps) => {
    return (
        <div className={styles["wrapper"]}>
            {children}
        </div>
    );
};

