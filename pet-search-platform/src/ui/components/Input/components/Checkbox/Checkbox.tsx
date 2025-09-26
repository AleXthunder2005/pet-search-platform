import React, { useId } from "react";
import clsx from "clsx";
import styles from "./styles/Checkbox.module.scss";

interface CheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    id?: string;
    required?: boolean;
    className?: string;
}

export const Checkbox = ({
                             label,
                             id,
                             required,
                             className,
                             ...rest
                         }: CheckboxProps) => {
    const generatedID = useId();
    const inputId = id ?? (label ? generatedID : undefined);

    const inputClassList = clsx(
        styles["checkbox-container__input"],
        className
    );

    const labelClassList = clsx(styles["checkbox-container__label"], {
        [styles["checkbox-container__label--required"]]: required,
    });

    return (
        <div className={styles["checkbox-container"]}>
            <input
                type="checkbox"
                id={inputId}
                className={inputClassList}
                required={required}
                {...rest}
            />
            {label && (
                <label htmlFor={inputId} className={labelClassList}>
                    {label}
                </label>
            )}
        </div>
    );
};

export default Checkbox;
