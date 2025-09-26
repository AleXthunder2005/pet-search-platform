import React, {useId} from "react";
import clsx from "clsx";
import styles from "./styles/Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id?: string;
    error?: boolean;
    success?: boolean;
    required?: boolean;
    icon?: React.ReactNode;
    className?: string;
}

export const Input = ({label, id, error, success, required, icon, className, ...rest }: InputProps) => {
    const inputClassList = clsx(
        styles['input-box__input'],
        {
            [styles["input-box__input--error"]]: error,
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
                    id={inputId}
                    className={inputClassList}
                    required={required}
                    {...rest}
                />
                {icon && <span className={styles['input-box__icon']}>{icon}</span>}
            </div>
        </div>
    );
};

export default Input;
