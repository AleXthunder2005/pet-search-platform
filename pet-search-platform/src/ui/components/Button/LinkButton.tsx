import { Link, type LinkProps } from "react-router-dom";
import clsx from "clsx";
import styles from "./styles/Button.module.scss";
import React from "react";

interface ButtonLinkProps extends LinkProps {
    isPrimary?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export const LinkButton = ({
                               isPrimary = false,
                               children,
                               className,
                               ...rest
                           }: ButtonLinkProps) => {
    const classList = clsx(
        styles.btn,
        {
            [styles["btn--primary"]]: isPrimary,
            [styles["btn--outline"]]: !isPrimary,
        },
        className
    );

    return (
        <Link className={classList} {...rest}>
            {children}
        </Link>
    );
};

