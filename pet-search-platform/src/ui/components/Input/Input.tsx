import React from "react";
import clsx from "clsx";
import styles from "./styles/Input.module.scss";
// import { Icon } from "../Icon/Icon";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    success?: boolean;
    icon?: { type: string; color?: string };
    className?: string;
}

export const Input = ({ error, success, icon, className, ...rest }: InputProps) => {
    const classList = clsx(
        styles.input,
        {
            [styles["input--error"]]: error,
            [styles["input--success"]]: success,
        },
        className
    );

    return (
        <div className={styles.wrapper}>
            <input className={classList} {...rest} />
            {icon && (
                <span className={styles.icon}>
          {/*<Icon type={icon.type} color={icon.color} />*/}
        </span>
            )}
        </div>
    );
};

export default Input;
