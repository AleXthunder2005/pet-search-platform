import React, {useId} from "react";
import clsx from "clsx";
import styles from "./styles/Text.module.scss";
import type {InputBaseProps} from "@components/Input/input.types.ts";

interface TextProps extends InputBaseProps{
    icon?: React.ReactNode;
    type?: "text" | "tel" | "email";
}

export const Text = ({
                         label,
                         id,
                         type = "text",
                         errorMessage,
                         success,
                         required,
                         icon,
                         className,
                         ...rest }: TextProps) => {
    const inputClassList = clsx(
        styles['input-box__input'],
        {
            [styles["input-box__input--error"]]: errorMessage,
            [styles["input-box__input--success"]]: success,
        },
        className
    );

    const labelClassList = clsx(
        styles['input-container__label'],
        {
            [styles["input-container__label--required"]]: required,
        }
    )

    const generatedID = useId();
    const inputId = id ? id : (label ? generatedID : undefined);

    return (
        <div className={styles['input-container']}>
            {label && (
                <label htmlFor={inputId}
                       className={labelClassList}>
                    {label}
                </label>)}
            <div className={styles["input-box"]}>
                <input
                    type={type}
                    id={inputId}
                    className={inputClassList}
                    required={required}
                    {...rest}
                />
                {icon && <span className={styles['input-box__icon']}>{icon}</span>}
            </div>
            <span className={styles["input-container__error-message"]}>{errorMessage}</span>
        </div>
    );
};

