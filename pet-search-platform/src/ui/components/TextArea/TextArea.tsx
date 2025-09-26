import React, { useId } from "react";
import clsx from "clsx";
import styles from "./styles/TextArea.module.scss";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    id?: string;
    required?: boolean;
    className?: string;
}

export const TextArea = ({ label, id, required, className, ...rest }: TextAreaProps) => {
    const generatedId = useId();
    const textareaId = id ?? (label ? generatedId : undefined);

    const textareaClassList = clsx(styles["textarea"], className);
    const labelClassList = clsx(styles["textarea-container__label"], {
        [styles["textarea-container__label--required"]]: required,
    });

    return (
        <div className={styles["textarea-container"]}>
            {label && (
                <label htmlFor={textareaId} className={labelClassList}>
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                required={required}
                className={textareaClassList}
                {...rest}
            />
        </div>
    );
};

export default TextArea;
