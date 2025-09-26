import React, {type HTMLAttributes, useId} from "react";
import clsx from "clsx";
import styles from "./styles/Select.module.scss";

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
    id?: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    options: string[];
}

export const Select = ({
                         label,
                         id,
                         required,
                         icon,
                         className,
                         options,
                         disabled,
                         ...rest }: SelectProps) => {
    const selectClassList = clsx(
        styles['select-box__select'],
        className
    );

    const labelClassList = clsx(
        styles['select-container__label'],
        {
            [styles["select-container__label--required"]]: required,
        }
    )

    const generatedID = useId();
    const selectId = id ? id : (label ? generatedID : undefined);

    return (
        <div className={styles['select-container']}>
            {label && (
                <label htmlFor={selectId}
                       className={labelClassList}>
                    {label}
                </label>)}
            <div className={styles["select-box"]}>
                <select
                    id={selectId}
                    className={selectClassList}
                    required={required}
                    disabled={disabled}
                    {...rest}
                >
                    {options.map((option) => (<option key={option}>{option}</option>))}
                </select>
                {icon && <span className={styles['select-box__icon']}>{icon}</span>}
            </div>
        </div>
    );
};

