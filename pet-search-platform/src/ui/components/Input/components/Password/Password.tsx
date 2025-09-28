import React, {useId, useState} from "react";
import clsx from "clsx";
import styles from "./styles/Password.module.scss";
import type {InputBaseProps} from "@components/Input/input.types.ts";
import {Icon} from "@components/Icon";

interface PasswordProps extends InputBaseProps {
    icon?: React.ReactNode;
}

export const Password = ({label, id, error, errorMessage, success, required, icon, className, ...rest }: PasswordProps) => {

    const [showPassword, setShowPassword] = useState(false);

    const inputClassList = clsx(
        styles['input-box__input'],
        {
            [styles["input-box__input--error"]]: error || errorMessage,
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

    const eyeClick = () => {
        setShowPassword((showPassword) => !showPassword);
    }

    return (
        <div className={styles['input-container']}>
            {label && (
                <label htmlFor={inputId}
                       className={labelClassList}>
                    {label}
                </label>)}
            <div className={styles["input-box"]}>
                <input
                    type={showPassword ? "text" : "password"}
                    id={inputId}
                    className={inputClassList}
                    required={required}
                    {...rest}
                />
                {icon && <span className={styles['input-box__icon']}>{icon}</span>}
                {showPassword
                    ? <span className={styles['input-box__icon']} onClick={eyeClick}>
                        {<Icon name={"eye"}
                               hoverable
                               color={"black"}
                               hoverColor={"black"}
                        />}
                </span>
                    : <span className={styles['input-box__icon']} onClick={eyeClick}>
                        {<Icon name={"eyeSlash"}
                            hoverable
                            color={"black"}
                            hoverColor={"black"}
                         />}
                       </span>}

            </div>
            <span className={styles["input-container__error-message"]}>{errorMessage}</span>
        </div>
    );
};

