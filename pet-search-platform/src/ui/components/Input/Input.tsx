import React from "react";
import clsx from "clsx";
import styles from "./styles/Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    success?: boolean;
    icon?: React.ReactNode;
    className?: string;
}

export const Input = ({ error, success, icon, className, ...rest }: InputProps) => {
    const classList = clsx(
        styles['input-container__input'],
        {
            [styles["input-container__input--error"]]: error,
            [styles["input-container__input--success"]]: success,
        },
        className
    );

    return (
        <div className={styles["input-container"]}>
            <input className={classList} {...rest} />
            {icon && <span className={styles['input-container__icon']}>{icon}</span>}
        </div>
    );
};

export default Input;
