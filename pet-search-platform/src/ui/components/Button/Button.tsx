import styles from './styles/Button.module.scss'
import React from "react";
import clsx from 'clsx'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isPrimary?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export const Button = ({isPrimary = true, children, className, ...rest} : ButtonProps) => {
    const classList = clsx(
        styles.btn,
        {
            [styles["btn--primary"]]: isPrimary,
            [styles["btn--outline"]]: !isPrimary,
        },
        className
    );

    return (
        <button className={classList} {...rest}>{children}</button>
    );
};

export default Button;